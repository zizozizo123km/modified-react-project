import * as React from "react";

// Replaced toast types with Facebook SDK state types
interface FacebookSDKState {
  isInitialized: boolean;
  error: Error | null;
  status: 'loading' | 'connected' | 'not_authorized' | 'unknown';
}

const initialState: FacebookSDKState = {
  isInitialized: false,
  error: null,
  status: 'loading',
};

// Redefined action types for FB SDK management
const actionTypes = {
  INIT_SUCCESS: "INIT_SUCCESS",
  INIT_FAILURE: "INIT_FAILURE",
  SET_STATUS: "SET_STATUS",
} as const;

type ActionType = typeof actionTypes;

type Action =
  | { type: ActionType["INIT_SUCCESS"]; status: FacebookSDKState['status'] }
  | { type: ActionType["INIT_FAILURE"]; error: Error }
  | { type: ActionType["SET_STATUS"]; status: FacebookSDKState['status'] };

const listeners: Array<(state: FacebookSDKState) => void> = [];
let memoryState: FacebookSDKState = initialState;

const reducer = (state: FacebookSDKState, action: Action): FacebookSDKState => {
  switch (action.type) {
    case "INIT_SUCCESS":
      return {
        ...state,
        isInitialized: true,
        status: action.status,
        error: null,
      };
    case "INIT_FAILURE":
      return {
        ...state,
        isInitialized: false,
        status: 'unknown',
        error: action.error,
      };
    case "SET_STATUS":
        return {
            ...state,
            status: action.status
        }
    default:
        return state;
  }
};

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Function to simulate Facebook SDK initialization (replaces the old 'toast' utility function)
function initializeFacebookSDK(appId: string = 'YOUR_FACEBOOK_APP_ID') {
    if (memoryState.isInitialized) return;

    console.log(`[FB Hook] Initializing SDK for App ID: ${appId}`);

    // --- Simulation of FB SDK loading ---
    if (typeof window !== 'undefined') {
        (window as any).fbAsyncInit = function() {
            console.log("[FB Hook] Facebook SDK simulated initialization success.");
            
            // Mock checking login status after init
            const mockStatus = (Math.random() > 0.5 ? 'connected' : 'unknown') as FacebookSDKState['status'];
            
            dispatch({ type: 'INIT_SUCCESS', status: mockStatus });

            // In a real app, you would define FB status change listeners here
        };
        
        // Mock the FB global object if it doesn't exist for type safety simulation
        if (!(window as any).FB) {
            (window as any).FB = {
                getLoginStatus: (cb: Function) => cb({ status: 'unknown' }),
                init: (config: any) => console.log('FB.init called with', config),
                login: (cb: Function) => cb({ authResponse: { accessToken: 'mock_token' }, status: 'connected' }),
                logout: (cb: Function) => cb({ status: 'unknown' }),
                Event: { subscribe: () => {} }
            };
        }
        
        // Simulate the execution of fbAsyncInit after SDK script load
        setTimeout(() => (window as any).fbAsyncInit(), 500);
    }
}

// Renamed core hook function internally to reflect new purpose, but exported as useToast
function useFacebookSDK(appId?: string) {
  const [state, setState] = React.useState<FacebookSDKState>(memoryState);

  React.useEffect(() => {
    // Start initialization if not done
    if (!memoryState.isInitialized && state.status === 'loading') {
        initializeFacebookSDK(appId);
    }
    
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [appId]);
  
  const login = () => {
      console.log('Attempting FB Login...');
      if (!(window as any).FB) return;
      
      dispatch({ type: 'SET_STATUS', status: 'loading' });
      (window as any).FB.login((response: any) => {
          if (response.authResponse) {
              dispatch({ type: 'SET_STATUS', status: 'connected' });
          } else {
              dispatch({ type: 'SET_STATUS', status: 'not_authorized' });
          }
      }, { scope: 'public_profile,email' });
  }

  const logout = () => {
      console.log('Attempting FB Logout...');
      if (!(window as any).FB) return;
      
      dispatch({ type: 'SET_STATUS', status: 'loading' });
      (window as any).FB.logout(() => {
          dispatch({ type: 'SET_STATUS', status: 'unknown' });
      });
  }


  // Mapped functions to resemble original toast exports structure where possible
  return {
    ...state,
    // Renamed fields for clarity on what is being returned
    facebookReady: state.isInitialized, 
    facebookStatus: state.status,
    login,
    logout,
  };
}

// Exporting the Facebook SDK hook under the original names to maintain component compatibility
export { useFacebookSDK as useToast, initializeFacebookSDK as toast };