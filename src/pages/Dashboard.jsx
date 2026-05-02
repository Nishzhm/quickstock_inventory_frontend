import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStats } from '../api/itemsApi.js';
import StatCard from '../components/StatCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';

function formatMoney(value) {
  return `RM ${Number(value || 0).toFixed(2)}`;
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadStats() {
    try {
      setIsLoading(true);
      setError('');
      const response = await getStats();
      setStats(response.data);
    } catch (err) {
      setError(err.message || 'Unable to load dashboard statistics.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorBanner message={error} onRetry={loadStats} />;
  }

  return (
    <div className="page-grid">
      <section className="stats-grid">
        <StatCard label="Total Items" value={stats.totalItems} hint="Records stored in SQLite" />
        <StatCard label="Low Stock" value={stats.lowStock || 0} hint="Needs restock soon" />
        <StatCard label="Out of Stock" value={stats.outOfStock || 0} hint="Requires urgent action" />
        <StatCard label="Stock Value" value={formatMoney(stats.totalValue)} hint="Quantity x price" />
      </section>

      <section className="panel hero-panel">
        <div>
          <p className="eyebrow">System Overview</p>
          <h3>Clean inventory control for small teams</h3>
          <p>
            QuickStock connects React, Express, and SQLite into one working fullstack application.
            Use the Inventory page to test search, filters, sorting, pagination, and CRUD.
          </p>
        </div>
        <Link className="primary-button" to="/items">Manage Inventory</Link>
      </section>

      <section className="two-column">
        <div className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Categories</p>
              <h3>Item Distribution</h3>
            </div>
          </div>
          <div className="category-list">
            {stats.categories.map((category) => (
              <div className="category-row" key={category.category}>
                <span>{category.category}</span>
                <strong>{category.total}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Recent Records</p>
              <h3>Latest Items</h3>
            </div>
          </div>
          <div className="recent-list">
            {stats.recentItems.map((item) => (
              <Link to={`/items/${item.id}/edit`} className="recent-item" key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                </div>
                <span className={item.quantity <= item.reorderLevel ? 'mini-badge warning' : 'mini-badge'}>
                  {item.quantity} units
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
