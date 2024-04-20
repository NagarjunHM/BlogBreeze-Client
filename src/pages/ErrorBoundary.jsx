import React from "react";

function ErrorFallback({ error }) {
  return (
    <div className="flex flex-wrap justify-center gap-5 mt-20 text-3xl text-red-600 underline">
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
