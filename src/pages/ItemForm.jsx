import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createItem, getItem, updateItem } from '../api/itemsApi.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';

const initialForm = {
  name: '',
  category: 'Electronics',
  quantity: 0,
  price: 0,
  reorderLevel: 5,
  supplier: '',
  notes: ''
};

function ItemForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = useMemo(() => Boolean(id), [id]);
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [pageError, setPageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadItem() {
      if (!isEditMode) {
        return;
      }

      try {
        setIsLoading(true);
        setPageError('');
        const response = await getItem(id);
        setForm({
          name: response.data.name,
          category: response.data.category,
          quantity: response.data.quantity,
          price: response.data.price,
          reorderLevel: response.data.reorderLevel,
          supplier: response.data.supplier || '',
          notes: response.data.notes || ''
        });
      } catch (err) {
        setPageError(err.message || 'Unable to load item.');
      } finally {
        setIsLoading(false);
      }
    }

    loadItem();
  }, [id, isEditMode]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
    setFieldErrors((current) => ({
      ...current,
      [name]: ''
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
      reorderLevel: Number(form.reorderLevel)
    };

    try {
      setIsSaving(true);
      setPageError('');
      setFieldErrors({});

      if (isEditMode) {
        await updateItem(id, payload);
      } else {
        await createItem(payload);
      }

      navigate('/items');
    } catch (err) {
      setPageError(err.message || 'Unable to save item.');
      setFieldErrors(err.errors || {});
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingSpinner text="Loading item..." />;
  }

  return (
    <div className="form-layout">
      {pageError && <ErrorBanner message={pageError} />}

      <form className="panel item-form" onSubmit={handleSubmit} noValidate>
        <div className="section-title">
          <div>
            <p className="eyebrow">{isEditMode ? 'Update Record' : 'Create Record'}</p>
            <h3>{isEditMode ? 'Edit Inventory Item' : 'Add New Inventory Item'}</h3>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field full-field">
            <label htmlFor="name">Item Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Example: Wireless Mouse"
            />
            {fieldErrors.name && <small>{fieldErrors.name}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              <option value="Electronics">Electronics</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Pantry">Pantry</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Safety">Safety</option>
              <option value="Other">Other</option>
            </select>
            {fieldErrors.category && <small>{fieldErrors.category}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="supplier">Supplier</label>
            <input
              id="supplier"
              name="supplier"
              type="text"
              value={form.supplier}
              onChange={handleChange}
              placeholder="Example: TechZone Supplies"
            />
            {fieldErrors.supplier && <small>{fieldErrors.supplier}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              value={form.quantity}
              onChange={handleChange}
            />
            {fieldErrors.quantity && <small>{fieldErrors.quantity}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="price">Price, RM</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
            />
            {fieldErrors.price && <small>{fieldErrors.price}</small>}
          </div>

          <div className="form-field">
            <label htmlFor="reorderLevel">Reorder Level</label>
            <input
              id="reorderLevel"
              name="reorderLevel"
              type="number"
              min="0"
              value={form.reorderLevel}
              onChange={handleChange}
            />
            {fieldErrors.reorderLevel && <small>{fieldErrors.reorderLevel}</small>}
          </div>

          <div className="form-field full-field">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Add item notes here"
            />
            {fieldErrors.notes && <small>{fieldErrors.notes}</small>}
          </div>
        </div>

        <div className="form-actions">
          <Link className="secondary-button" to="/items">Cancel</Link>
          <button className="primary-button" type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : isEditMode ? 'Update Item' : 'Create Item'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
