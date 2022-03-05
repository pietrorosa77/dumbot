import { Box, Notification } from "grommet";
import { Component } from "react";

export class ErrorBoundary extends Component<
  {
    children: any;
    message?: any;
    renderError?: (error: any) => JSX.Element;
    onDismiss: () => void;
  },
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
      if (this.props.renderError) {
        return this.props.renderError(this.state.error);
      }
      return (
        <Box margin="large" pad="medium" background="brand" round>
          <Notification
            status="critical"
            title="Dumbot Error"
            message="Error rendering bot message"
            onClose={this.props.onDismiss}
          />
        </Box>
      );
    }
    return this.props.children;
  }
}
