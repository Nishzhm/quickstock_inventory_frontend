import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Inventory from './pages/Inventory.jsx';
import ItemForm from './pages/ItemForm.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-shell">
        <Header />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<Inventory />} />
            <Route path="/items/new" element={<ItemForm />} />
            <Route path="/items/:id/edit" element={<ItemForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
