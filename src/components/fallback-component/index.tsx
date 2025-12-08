import { useEffect, useState } from 'react';
import { FallbackProps } from 'react-error-boundary';
import ErrorLogger from '@/utils/errorLogger';

interface ExtendedFallbackProps extends FallbackProps {
  componentStack?: string;
}

const Fallback = ({ error, resetErrorBoundary, componentStack }: ExtendedFallbackProps) => {
  const [errorId] = useState(() => `${Date.now().toString().slice(-6)}`); // Simple 6-digit error ID

  useEffect(() => {
    // Log the error for developers (in console only)
    ErrorLogger.logComponentError(error, { componentStack }, 'ErrorBoundary');
  }, [error, componentStack]);

  const handleTryAgain = () => {
    resetErrorBoundary();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>

        {/* Simple Error Message */}
        <p className="text-gray-600 mb-6">We're sorry, but something unexpected happened. Please try again.</p>

        {/* Error Reference ID */}
        <div className="bg-gray-100 rounded-lg p-3 mb-6">
          <p className="text-sm text-gray-600">
            Error Reference: <span className="font-mono font-medium text-gray-800">#{errorId}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 hover:bg-blue-700"
          >
            Try Again
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleReload}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-300 hover:bg-gray-700"
            >
              Refresh Page
            </button>

            <button
              onClick={handleGoHome}
              className="bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-300 hover:bg-emerald-800"
            >
              Go Home
            </button>
          </div>
        </div>

        {/* Support Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            If this problem continues, please contact support and provide the error reference number above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
