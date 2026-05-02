function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error-banner">
      <div>
        <strong>Something went wrong</strong>
        <p>{message}</p>
      </div>
      {onRetry && (
        <button type="button" onClick={onRetry}>Try Again</button>
      )}
    </div>
  );
}

export default ErrorBanner;
