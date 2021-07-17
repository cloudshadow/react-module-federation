import * as React from 'react';

interface IErrorBoundaryProps {
  componentName: string;
}
interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error | null) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error | null, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log('componentDidCatch', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>{this.props.componentName} went wrong.</div>;
    }

    return this.props.children;
  }
}
