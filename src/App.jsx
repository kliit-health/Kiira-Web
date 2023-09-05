import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@material-tailwind/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './utils/constants';
import { useLocalStore } from './store';
import './App.css';
import 'react-phone-number-input/style.css'

function App() {
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
