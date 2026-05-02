import { Link } from 'react-router-dom';

function EmptyState() {
  return (
    <div className="empty-state">
      <h3>No items found</h3>
      <p>Try changing the search or filter, or add a new item.</p>
      <Link className="primary-button" to="/items/new">Add Item</Link>
    </div>
  );
}

export default EmptyState;
