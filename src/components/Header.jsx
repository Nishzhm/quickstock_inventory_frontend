import { Link, useLocation } from 'react-router-dom';

const pageTitles = {
  '/': {
    title: 'Dashboard',
    description: 'Track inventory health at a glance.'
  },
  '/items': {
    title: 'Inventory',
    description: 'Search, filter, sort, update, and delete item records.'
  },
  '/items/new': {
    title: 'Add Item',
    description: 'Create a new inventory record with validation.'
  }
};

function Header() {
  const location = useLocation();
  const details = pageTitles[location.pathname] || {
    title: location.pathname.includes('/edit') ? 'Edit Item' : 'QuickStock',
    description: location.pathname.includes('/edit')
      ? 'Update an existing item record.'
      : 'Manage inventory records clearly.'
  };

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Fullstack Inventory System</p>
        <h2>{details.title}</h2>
        <p>{details.description}</p>
      </div>
      <Link className="primary-button" to="/items/new">+ Add Item</Link>
    </header>
  );
}

export default Header;
