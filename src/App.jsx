import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@material-tailwind/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import { GOOGLE_CLIENT_ID, MIXED_PANEL_TOKEN } from './utils/constants';
import { useLocalStore } from './store';
import mixpanel from 'mixpanel-browser';

function App() {
  mixpanel.init(MIXED_PANEL_TOKEN, { debug: true, persistence: 'localStorage', ignore_dnt: true });

  const setGoogleAuthScriptLoaded = useLocalStore((state) => state.setGoogleAuthScriptLoaded);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 30000
      }
    }
  });
  return (
    <GoogleOAuthProvider
      clientId={GOOGLE_CLIENT_ID}
      onScriptLoadSuccess={() => {
        setGoogleAuthScriptLoaded(true);
      }}
      onScriptLoadError={() => {
        setGoogleAuthScriptLoaded(false);
      }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
