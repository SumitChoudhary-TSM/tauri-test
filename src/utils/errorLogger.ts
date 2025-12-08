// src/utils/errorLogger.ts
import { ErrorInfo } from 'react';

// Type definitions
interface ApiErrorDetails {
  type: 'api';
  status?: number;
  statusText?: string;
  method?: string;
  url?: string;
  requestData?: unknown;
  responseData?: unknown;
  source: 'api_interceptor';
}

interface JavaScriptErrorDetails {
  type: 'javascript';
  filename?: string;
  lineno?: number;
  colno?: number;
  source: 'window.error';
}

interface PromiseErrorDetails {
  type: 'unhandledPromise';
  reason: unknown;
  source: 'unhandledrejection';
}

type AdditionalErrorData = ApiErrorDetails | JavaScriptErrorDetails | PromiseErrorDetails | Record<string, unknown>;

interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack?: string | null;
  userAgent: string;
  url: string;
  timestamp: string;
  sessionId: string;
  decodedMessage?: string;
  errorCode?: string;
  componentName?: string;
  additionalData?: AdditionalErrorData;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private readonly sessionId: string;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.setupGlobalErrorHandlers();
    console.log('ErrorLogger initialized with session:', this.sessionId);
  }

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  // Comprehensive React error decoder
  private decodeReactError(errorMessage: string): { decoded: string; code?: string } {
    // Check if it's a React minified error
    const reactErrorRegex = /Minified React error #(\d+)/;
    const reactErrorMatch = reactErrorRegex.exec(errorMessage);
    if (!reactErrorMatch) return { decoded: errorMessage };

    const errorCode = reactErrorMatch[1];

    // Comprehensive React error codes mapping
    const reactErrors: Record<string, string> = {
      // Common Component Errors
      '31': 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got object. Check that you export your component correctly.',
      '130':
        "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.",
      '185': 'Calling React.createElement() with unknown props. Remove these props from the element.',
      '188': 'Element type is invalid. Check the render method or return statement.',

      // Hook Errors
      '200':
        'Invalid hook call. Hooks can only be called inside the body of a function component. This could happen for one of the following reasons: 1. You might have mismatching versions of React and React DOM. 2. You might be breaking the Rules of Hooks. 3. You might have more than one copy of React in the same app.',
      '321':
        "Cannot read properties of undefined. This usually means you're trying to access a property on undefined or null.",

      // Hydration Errors
      '418':
        "Expected server HTML to contain a matching element. This error occurs during hydration when the client-side React tree doesn't match the server-rendered HTML.",
      '419':
        'There was an error while hydrating. This application may appear to work, but it may have subtle bugs. Consider fixing the hydration errors.',
      '422': 'The object passed as the ref prop is immutable and cannot be assigned to.',
      '423': "Cannot assign to read only property. The property you're trying to modify is read-only.",
      '425': 'Text strings must be rendered within a component.',

      // State and Props Errors
      '426': 'Cannot update a component while rendering a different component.',
      '427': 'Cannot call setState on a component that is not yet mounted.',
      '429': 'Expected the last optional argument to be a valid React element.',
      '431': "React element is not valid. It's likely that you accidentally rendered an object.",

      // Context Errors
      '435':
        'Cannot read property of undefined. Make sure the component is wrapped with the appropriate Context Provider.',
      '436': 'useContext must be used within a Provider.',

      // Performance/Memory Errors
      '440':
        'Maximum update depth exceeded. This can happen when setState is called inside useEffect without dependency array.',
      '441': 'Cannot update during an existing state transition.',
      '442': 'Cannot flush sync updates from within a lifecycle method.',

      // Portal Errors
      '445': 'Target container is not valid. Make sure the container exists in the DOM.',
      '446': 'createPortal(...): Target container is not a DOM element.',

      // Development Mode Errors
      '450': 'Each child in a list should have a unique "key" prop.',
      '451': 'Functions are not valid as a React child.',
      '452': 'Objects are not valid as a React child.',

      // Suspense Errors
      '460': 'A component suspended while responding to synchronous input.',
      '461': 'Cannot suspend while already suspended.',

      // Error Boundary Errors
      '470': 'Error boundaries should implement getDerivedStateFromError().',
      '471': 'componentDidCatch should not call setState.',

      // Router/Navigation Errors (if using React Router)
      '480': 'useNavigate() may be used only in the context of a Router component.',
      '481': 'useParams() may be used only in the context of a Router component.',
    };

    const decodedMessage = reactErrors[errorCode];
    if (decodedMessage) {
      // Extract additional args from the URL if present
      const argsMatch = errorMessage.match(/args\[\]=([^&\s]+)/g);
      const args = argsMatch ? argsMatch.map((arg) => decodeURIComponent(arg.replace('args[]=', ''))) : [];

      const fullDecoded =
        args.length > 0 ? `${decodedMessage}\n\nAdditional context: ${args.join(', ')}` : decodedMessage;

      return { decoded: fullDecoded, code: errorCode };
    }

    return {
      decoded: `React Error #${errorCode}: Visit https://react.dev/errors/${errorCode} for details`,
      code: errorCode,
    };
  }

  private createErrorDetails(error: Error, additionalData?: AdditionalErrorData): ErrorDetails {
    const { decoded, code } = this.decodeReactError(error.message);

    return {
      message: error.message,
      decodedMessage: decoded !== error.message ? decoded : undefined,
      errorCode: code,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      additionalData,
    };
  }

  private setupGlobalErrorHandlers(): void {
    // Global JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError(new Error(event.message), {
        type: 'javascript',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        source: 'window.error',
      } as JavaScriptErrorDetails);
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));

      this.logError(error, {
        type: 'unhandledPromise',
        reason: event.reason,
        source: 'unhandledrejection',
      } as PromiseErrorDetails);
    });

    console.log('Global error handlers set up');
  }

  logError(error: Error, additionalData?: AdditionalErrorData): void {
    const errorDetails = this.createErrorDetails(error, additionalData);

    // Enhanced console logging with React error decoding
    console.group(`Error Logged - ${errorDetails.timestamp}`);
    console.error('Original Message:', errorDetails.message);

    if (errorDetails.decodedMessage) {
      console.error('Decoded Message:', errorDetails.decodedMessage);
    }

    if (errorDetails.errorCode) {
      console.error('React Error Code:', `#${errorDetails.errorCode}`);
    }

    console.error('Stack Trace:', errorDetails.stack);
    console.error('URL:', errorDetails.url);
    console.error('Session ID:', errorDetails.sessionId);
    console.error('User Agent:', errorDetails.userAgent);

    if (additionalData) {
      console.error('Additional Data:', additionalData);
    }

    // If it's a React error, provide helpful link
    if (errorDetails.message.includes('Minified React error')) {
      const errorUrlRegex = /https:\/\/react\.dev\/errors\/[^\s]+/;
      const errorUrlMatch = errorUrlRegex.exec(errorDetails.message);
      if (errorUrlMatch) {
        console.error('React Documentation:', errorUrlMatch?.[0]);
      }
    }

    console.groupEnd();

    // Store locally for debugging
    this.storeErrorLocally(errorDetails);
  }

  logComponentError(error: Error, errorInfo: ErrorInfo, componentName?: string): void {
    const errorDetails = {
      ...this.createErrorDetails(error),
      componentStack: errorInfo.componentStack,
      componentName,
    };

    console.group(`React Component Error - ${errorDetails.timestamp}`);
    console.error('Component:', componentName || 'Unknown');
    console.error('Original Message:', errorDetails.message);

    if (errorDetails.decodedMessage) {
      console.error('Decoded Message:', errorDetails.decodedMessage);
    }

    if (errorDetails.errorCode) {
      console.error('React Error Code:', `#${errorDetails.errorCode}`);
    }

    console.error('Stack Trace:', errorDetails.stack);
    console.error('Component Stack:', errorDetails.componentStack);
    console.error('Session ID:', errorDetails.sessionId);

    // React-specific debugging help
    if (errorDetails.errorCode) {
      console.error('This React error has been decoded above. Check the "Decoded Message" for specific guidance.');
    }

    console.groupEnd();

    this.storeErrorLocally(errorDetails);
  }

  // Log API/Network errors specifically
  logApiError(
    error: { message?: string; response?: { status?: number; statusText?: string; data?: unknown } },
    requestDetails?: { method?: string; url?: string; data?: unknown },
  ): void {
    const errorMessage = error.message || 'API request failed';
    const apiError = new Error(errorMessage);

    this.logError(apiError, {
      type: 'api',
      status: error.response?.status,
      statusText: error.response?.statusText,
      method: requestDetails?.method,
      url: requestDetails?.url,
      requestData: requestDetails?.data,
      responseData: error.response?.data,
      source: 'api_interceptor',
    } as ApiErrorDetails);
  }

  private storeErrorLocally(errorDetails: ErrorDetails): void {
    try {
      const errors = JSON.parse(localStorage.getItem('app_errors') || '[]') as ErrorDetails[];
      errors.push(errorDetails);
      // Keep only last 50 errors to prevent storage bloat
      const recentErrors = errors.slice(-50);
      localStorage.setItem('app_errors', JSON.stringify(recentErrors));
    } catch (e) {
      console.warn('Failed to store error locally:', e);
    }
  }

  // Method to retrieve stored errors (useful for debugging)
  getStoredErrors(): ErrorDetails[] {
    try {
      return JSON.parse(localStorage.getItem('app_errors') || '[]') as ErrorDetails[];
    } catch {
      return [];
    }
  }

  // Method to clear stored errors
  clearStoredErrors(): void {
    try {
      localStorage.removeItem('app_errors');
      console.log('Stored errors cleared');
    } catch (e) {
      console.warn('Failed to clear stored errors:', e);
    }
  }

  // Helper method to view errors in a formatted table
  viewStoredErrorsTable(): void {
    const errors = this.getStoredErrors();
    if (errors.length === 0) {
      console.log('No stored errors found');
      return;
    }

    console.group(`Stored Errors (${errors.length} total)`);
    console.table(
      errors?.map((err) => ({
        timestamp: err.timestamp,
        originalMessage: err.message.substring(0, 50) + (err.message.length > 50 ? '...' : ''),
        decodedMessage: err.decodedMessage ? err.decodedMessage.substring(0, 50) + '...' : 'N/A',
        reactErrorCode: err.errorCode || 'N/A',
        component: err.componentName || 'N/A',
        url: err.url,
      })),
    );
    console.log('Use ErrorLogger.getStoredErrors() to see full details');
    console.groupEnd();
  }

  // Helper method to get error statistics
  getErrorStats(): { total: number; reactErrors: number; jsErrors: number; apiErrors: number } {
    const errors = this.getStoredErrors();
    const reactErrors = errors.filter((err) => err.errorCode).length;
    const apiErrors = errors.filter(
      (err) =>
        err.additionalData &&
        typeof err.additionalData === 'object' &&
        'type' in err.additionalData &&
        err.additionalData.type === 'api',
    ).length;
    const jsErrors = errors.filter(
      (err) =>
        err.additionalData &&
        typeof err.additionalData === 'object' &&
        'type' in err.additionalData &&
        err.additionalData.type === 'javascript',
    ).length;

    return {
      total: errors.length,
      reactErrors,
      jsErrors,
      apiErrors,
    };
  }

  // Method to export errors for debugging/support
  exportErrors(): string {
    const errors = this.getStoredErrors();
    const exportData = {
      exportedAt: new Date().toISOString(),
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorCount: errors.length,
      errors: errors,
    };

    return JSON.stringify(exportData, null, 2);
  }
}

export default ErrorLogger.getInstance();
