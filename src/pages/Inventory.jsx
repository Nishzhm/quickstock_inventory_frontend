import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api/itemsApi.js';
import InventoryTable from '../components/InventoryTable.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import EmptyState from '../components/EmptyState.jsx';

const defaultFilters = {
  search: '',
  category: 'all',
  status: 'all',
  sortBy: 'createdAt',
  order: 'desc',
  page: 1,
  limit: 8
};

function Inventory() {
  const [filters, setFilters] = useState(defaultFilters);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  async function loadItems(currentFilters = filters) {
    try {
      setIsLoading(true);
      setError('');
      const response = await getItems(currentFilters);
      setItems(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err.message || 'Unable to load inventory items.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadItems(filters);
  }, [filters]);

  function updateFilter(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value,
      page: 1
    }));
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(`Delete ${item.name}? This action cannot be undone.`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteItem(item.id);
      setDeleteMessage(`${item.name} was deleted successfully.`);
      await loadItems(filters);
    } catch (err) {
      setError(err.message || 'Unable to delete item.');
    }
  }

  function changePage(nextPage) {
    setFilters((current) => ({
      ...current,
      page: nextPage
    }));
  }

  return (
    <div className="page-grid">
      <section className="panel filters-panel">
        <div className="filter-field search-field">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, category, or supplier"
            value={filters.search}
            onChange={(event) => updateFilter('search', event.target.value)}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(event) => updateFilter('category', event.target.value)}
          >
            <option value="all">All categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Pantry">Pantry</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Safety">Safety</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(event) => updateFilter('status', event.target.value)}
          >
            <option value="all">All status</option>
            <option value="healthy">Healthy</option>
            <option value="low">Low stock</option>
            <option value="out">Out of stock</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="sortBy">Sort</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(event) => updateFilter('sortBy', event.target.value)}
          >
            <option value="createdAt">Created date</option>
            <option value="updatedAt">Updated date</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="quantity">Quantity</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="order">Order</label>
          <select
            id="order"
            value={filters.order}
            onChange={(event) => updateFilter('order', event.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </section>

      {deleteMessage && <div className="success-banner">{deleteMessage}</div>}
      {error && <ErrorBanner message={error} onRetry={() => loadItems(filters)} />}
      {isLoading && <LoadingSpinner text="Loading inventory..." />}

      {!isLoading && !error && items.length === 0 && <EmptyState />}

      {!isLoading && !error && items.length > 0 && (
        <>
          <InventoryTable items={items} onDelete={handleDelete} />

          <div className="pagination-bar">
            <button
              type="button"
              disabled={!pagination?.hasPreviousPage}
              onClick={() => changePage(filters.page - 1)}
            >
              Previous
            </button>
            <span>
              Page {pagination?.page} of {pagination?.totalPages} · {pagination?.total} records
            </span>
            <button
              type="button"
              disabled={!pagination?.hasNextPage}
              onClick={() => changePage(filters.page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Inventory;
