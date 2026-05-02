import { Link } from 'react-router-dom';

function getStockStatus(item) {
  if (item.quantity === 0) {
    return { label: 'Out of stock', className: 'status out' };
  }

  if (item.quantity <= item.reorderLevel) {
    return { label: 'Low stock', className: 'status low' };
  }

  return { label: 'Healthy', className: 'status healthy' };
}

function formatMoney(value) {
  return `RM ${Number(value).toFixed(2)}`;
}

function InventoryTable({ items, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const status = getStockStatus(item);

            return (
              <tr key={item.id}>
                <td>
                  <strong>{item.name}</strong>
                  <span className="table-note">#{item.id}</span>
                </td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{formatMoney(item.price)}</td>
                <td><span className={status.className}>{status.label}</span></td>
                <td>{item.supplier || 'No supplier'}</td>
                <td>
                  <div className="action-group">
                    <Link to={`/items/${item.id}/edit`}>Edit</Link>
                    <button type="button" onClick={() => onDelete(item)}>Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
