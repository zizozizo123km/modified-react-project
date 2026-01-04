import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Renamed types for Social Media context
type MediaSliderApi = UseEmblaCarouselType[1];
type UseMediaSliderParameters = Parameters<typeof useEmblaCarousel>;
type MediaSliderOptions = UseMediaSliderParameters[0];
type MediaSliderPlugin = UseMediaSliderParameters[1];

type MediaSliderProps = {
  opts?: MediaSliderOptions;
  plugins?: MediaSliderPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: MediaSliderApi) => void;
};

type MediaSliderContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & MediaSliderProps;

// Renamed Context
const FacebookMediaSliderContext = React.createContext<MediaSliderContextProps | null>(null);

// Renamed Hook
function useFacebookMediaSlider() {
  const context = React.useContext(FacebookMediaSliderContext);

  if (!context) {
    throw new Error("useFacebookMediaSlider must be used within a <FacebookMediaSlider />");
  }

  return context;
}

// Renamed Main Component
const FacebookMediaSlider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & MediaSliderProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: MediaSliderApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <FacebookMediaSliderContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="facebook media slider"
          {...props}
        >
          {children}
        </div>
      </FacebookMediaSliderContext.Provider>
    );
  },
);
FacebookMediaSlider.displayName = "FacebookMediaSlider";

// Renamed Content Component
const FacebookMediaSliderContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useFacebookMediaSlider();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
FacebookMediaSliderContent.displayName = "FacebookMediaSliderContent";

// Renamed Item Component
const FacebookMediaItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useFacebookMediaSlider();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="media slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
FacebookMediaItem.displayName = "FacebookMediaItem";

// Renamed Previous Button
const FacebookMediaSliderPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "ghost", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useFacebookMediaSlider();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute z-10 h-10 w-10 rounded-full opacity-70 hover:opacity-100 transition-opacity bg-black/50 text-white hover:bg-black/70",
          orientation === "horizontal"
            ? "left-2 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-6 w-6" />
        <span className="sr-only">Previous media item</span>
      </Button>
    );
  },
);
FacebookMediaSliderPrevious.displayName = "FacebookMediaSliderPrevious";

// Renamed Next Button
const FacebookMediaSliderNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "ghost", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useFacebookMediaSlider();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute z-10 h-10 w-10 rounded-full opacity-70 hover:opacity-100 transition-opacity bg-black/50 text-white hover:bg-black/70",
          orientation === "horizontal"
            ? "right-2 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-6 w-6" />
        <span className="sr-only">Next media item</span>
      </Button>
    );
  },
);
FacebookMediaSliderNext.displayName = "FacebookMediaSliderNext";

// Updated Export
export { 
    type MediaSliderApi, 
    FacebookMediaSlider, 
    FacebookMediaSliderContent, 
    FacebookMediaItem, 
    FacebookMediaSliderPrevious, 
    FacebookMediaSliderNext 
};