import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorInfo, useEffect } from 'react';
import Fallback from './components/fallback-component';
import Router from '@/routes';
import RootLayout from './styles/layout';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from './redux/store';
import setUpInterceptor from './api/interceptor';
import { refreshToken } from './redux/reducers/authSlice';
import ErrorLogger from '@/utils/errorLogger';

const App = () => {
  const { isUserLoggedIn } = useSelector((store: RootState) => store.auth);
  setUpInterceptor();
  const intervalTime = Number(import.meta.env.VITE_REFRESH_TOKEN_TIME) * 1000 * 60;

  useEffect(() => {
    // Simple app initialization log (for developers only)
    console.log('App initialized at', new Date().toISOString());
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isUserLoggedIn) {
      const refreshInterval = isNaN(intervalTime) ? 10 * 1000 * 60 : intervalTime;

      interval = setInterval(() => {
        try {
          dispatch(refreshToken());
        } catch (error) {
          // Log token refresh errors (for developers)
          ErrorLogger.logError(error instanceof Error ? error : new Error('Token refresh failed'), {
            context: 'token_refresh',
          });
        }
      }, refreshInterval);
    }

    if (!isUserLoggedIn && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isUserLoggedIn, intervalTime]);

  // Simple error handler - logs for developers, shows friendly UI to users
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    ErrorLogger.logComponentError(error, errorInfo, 'App');
  };

  // Simple reset handler
  const handleReset = () => {
    console.log('Error boundary reset');

    // Clear any problematic session data
    try {
      sessionStorage.removeItem('errorState');
    } catch (e) {
      console.warn('Failed to clear session data:', e);
    }
  };

  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={handleError}
      onReset={handleReset}
      resetKeys={[isUserLoggedIn]}
    >
      <BrowserRouter>
        <RootLayout>
          <Router />
        </RootLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
