import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

// Component modified to resemble a stream of Facebook Posts (Notifications/Feed entries)
export function Toaster() {
  const { toasts: posts } = useToast(); // Treat toasts as feed posts

  return (
    <ToastProvider>
      {posts.map(function ({ id, title, description, action, ...props }) {
        return (
          // Toast component styled as a Facebook Post card
          <Toast
            key={id}
            {...props}
            // Applying Facebook-like card styling (white background, shadow, generous padding)
            className="bg-white shadow-xl rounded-lg p-4 mb-4 border border-gray-200 transition-all duration-300 transform hover:shadow-2xl"
          >
            {/* 1. Post Header (User Avatar and Name) */}
            <div className="flex items-start mb-3">
                {/* Simulated Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-blue-600 mr-3 flex items-center justify-center text-white font-semibold text-sm shadow-inner">
                    FB
                </div>
                <div className="flex flex-col flex-grow">
                    {/* User Name / Source */}
                    {title && <ToastTitle className="text-base font-bold text-gray-900 leading-tight">{title}</ToastTitle>}
                    {/* Simulated Metadata (Time/Privacy) */}
                    <span className="text-xs text-gray-500">
                        Just now · 
                        <svg className="inline h-3 w-3 ml-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                    </span>
                </div>
                {/* Dismiss button repositioned as 'More Options' or X */}
                <ToastClose className="text-gray-400 hover:bg-gray-100 rounded-full p-1" />
            </div>

            {/* 2. Post Content (Description) */}
            <div className="mb-4">
                {description && <ToastDescription className="text-gray-800 text-base leading-relaxed">{description}</ToastDescription>}
            </div>

            {/* 3. Post Actions/Engagement Bar (Like, Comment, Share) */}
            <div className="flex justify-around border-t border-gray-100 pt-2 text-sm text-gray-600 font-semibold">
                {action || (
                    <>
                        {/* Like Button */}
                        <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition duration-150">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-7.734a2 2 0 01-.774-3.793L10 14h4zm0 0V5a2 2 0 10-4 0v5m4-5h4"></path></svg>
                            <span>Like</span>
                        </button>
                        {/* Comment Button */}
                        <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition duration-150">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"></path></svg>
                            <span>Comment</span>
                        </button>
                        {/* Share Button */}
                        <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition duration-150">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684l-3.173 1.27m3.173-2.684l-3.173-1.27m3.173 2.684L15 9.75m-6.316 2.684L15 14.25M5.636 18.364a9 9 0 010-12.728M18.364 5.636a9 9 0 010 12.728" ></path></svg>
                            <span>Share</span>
                        </button>
                    </>
                )}
            </div>
          </Toast>
        );
      })}
      {/* ToastViewport styled to occupy a typical notification/feed position (e.g., fixed right column or centered block) */}
      <ToastViewport className="[--viewport-offset:20px] fixed top-0 right-0 flex h-full w-full max-w-[420px] flex-col p-4 z-[100] pointer-events-none sm:p-6" />
    </ToastProvider>
  );
}