import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">QS</div>
        <div>
          <h1>QuickStock</h1>
          <p>Inventory Tracker</p>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/items">Inventory</NavLink>
        <NavLink to="/items/new">Add Item</NavLink>
      </nav>

      <div className="sidebar-card">
        <p className="eyebrow">Project Status</p>
        <strong>Fullstack Ready</strong>
        <span>Frontend + Backend + Database</span>
      </div>
    </aside>
  );
}

export default Sidebar;
