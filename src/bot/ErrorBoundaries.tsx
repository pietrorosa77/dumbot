import React from "react";

export class ErrorBoundary extends React.Component<
  { children: any; message: any; renderError?: (error: any) => JSX.Element },
  any
> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.renderError
        ? this.props.renderError(this.state.error)
        : this.props.message;
    }
    return this.props.children;
  }
}

export class ErrorBoundaryFunc extends React.Component<any> {
  componentDidCatch(error: any) {
    this.props.errorCallback(error);
  }

  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    return this.props.children;
  }
}
