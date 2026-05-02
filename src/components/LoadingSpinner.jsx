function LoadingSpinner({ text = 'Loading data...' }) {
  return (
    <div className="loading-box">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

export default LoadingSpinner;
