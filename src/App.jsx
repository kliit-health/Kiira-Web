import './App.css';
import { AuthProvider } from './contexts/AuthProvider';
import { Router } from './routes';
// import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
