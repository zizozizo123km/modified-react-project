import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // Added FB common UI styles: subtle shadow, white background, rounded corners
      className={cn("p-3 bg-white rounded-xl shadow-lg border border-gray-100", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-base font-semibold text-gray-800",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          // Use standard ghost but apply FB blue interaction colors
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 bg-transparent p-0 text-blue-600 hover:bg-blue-100/70 hover:text-blue-700 opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        // Adjusted header cell text color
        head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        // Retaining complex cell selectors for DayPicker functionality
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        // Day styling: hover uses light gray/blue, ensures selected days are fully rounded
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal hover:bg-blue-50/50 rounded-full aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        // Facebook blue selection style, mandatory rounded-full for the day button look
        day_selected:
          "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-full",
        day_today: "bg-blue-100 text-blue-700 font-semibold rounded-full",
        day_outside:
          "day-outside text-gray-400 opacity-70 aria-selected:bg-blue-50/50 aria-selected:text-blue-600 aria-selected:opacity-100",
        day_disabled: "text-gray-300 opacity-50",
        day_range_middle: "aria-selected:bg-blue-100 aria-selected:text-blue-700",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        // Ensure icons are blue for FB theme
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4 text-blue-600" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4 text-blue-600" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };