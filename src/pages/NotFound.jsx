import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="empty-state">
      <h3>Page not found</h3>
      <p>The requested page does not exist.</p>
      <Link className="primary-button" to="/">Back to Dashboard</Link>
    </div>
  );
}

export default NotFound;
