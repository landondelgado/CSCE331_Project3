import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVisibility } from './App';
import VisibilityControls from './VisibilityControls';
import WeatherWidget from './WeatherWidget';    

const API_BASE =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_BASE
    : '/api/inventory';

// Header Component (as used in Analytics styling)
// Header Component
function InventoryHeader() {
  const navigate = useNavigate();
  const [time, setTime] = useState(getCurrentTime());
  const { showControls, setShowControls } = useVisibility();

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Home', icon: '/images/home.png', route: '/menupos' },
    { label: 'Analytics', icon: '/images/analytics.png', route: '/analytics' },
    { label: 'Inventory', icon: '/images/inventory.png', route: '/inventory' },
  ];

  return (
    <div className="relative flex flex-row justify-center items-center bg-cover bg-center h-20 py-6 px-8">
      {/* Nav Buttons */}
      <div className="absolute top-4 left-12 flex space-x-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.route)}
            className="flex flex-col items-center text-white hover:scale-105 transition-transform"
          >
            <img src={item.icon} alt={item.label} className="w-10 h-10 mb-1" />
            <span className="text-xs sm:text-sm font-medium">{item.label}</span>
          </button>
        ))}
        {/* Visibility Button */}
        <div className="relative inline-block">
          <button
            onClick={() => setShowControls(prev => !prev)}
            className="flex flex-col items-center text-white hover:scale-105 transition-transform"
          >
            <img src="/images/brightness-contrast.png" className="w-10 h-10 mb-1" />
            <span className="text-xs sm:text-sm font-medium block w-full text-center truncate">
              Visibility
            </span>
          </button>
          {showControls && <VisibilityControls />}
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <img src="/images/ShareteaLogo.png" alt="Sharetea" className="h-16" />
      </div>

      {/* Time + Logout */}
      <div className="absolute right-6 top-5 flex items-center space-x-4">
        <button
          className="bg-red-500 text-lg sm:text-xl font-semibold text-white rounded-full px-4 py-1 shadow"
          onClick={() => {
            if (window.google?.accounts?.id) {
              window.google.accounts.id.disableAutoSelect();
            }
            localStorage.removeItem('user');
            navigate('/');
          }}
        >
          Logout
        </button>
        <WeatherWidget />
        <div className="bg-slate-600 py-2 px-4 rounded-full text-white text-2xl font-bold notranslate">
          {time}
        </div>
      </div>
    </div>
  );
}

/* Modal Component for "Add Stock" */
function AddStockModal({ onClose, onSubmit }) {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleSubmit = () => {
    onSubmit({ item, amount });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Add Stock</h3>
        <label className="block text-gray-700 mb-1">Item:</label>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter item name"
        />
        <label className="block text-gray-700 mb-1">Amount to Add:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter amount"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

/* Modal Component for "Create Item" */
function CreateItemModal({ onClose, onSubmit }) {
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  
  const handleSubmit = () => {
    onSubmit({ itemId, itemName, category, price });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Create Item</h3>
        <label className="block text-gray-700 mb-1">Item ID:</label>
        <input
          type="number"
          value={itemId}
          min="0"
          onChange={(e) => setItemId(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter category"
        />
        <label className="block text-gray-700 mb-1">Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter stock amount"
        />
        <label className="block text-gray-700 mb-1">Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter previous usage"
        />
        <label className="block text-gray-700 mb-1">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          min="0"
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter low stock items"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

/* Modal Component for "Edit Item" */
function EditItemModal({ onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [lookupId, setLookupId] = useState('');
  const [lookupName, setLookupName] = useState('');

  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleLookup = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/check-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: parseInt(lookupId), itemName: lookupName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Item not found');
      }

      // Pre-fill values for editing
      setItemId(data.id);
      setItemName(data.name);
      setCategory(data.category);
      setPrice(data.price);

      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = () => {
    onSubmit({
      oldItemId: parseInt(lookupId),
      newItemId: parseInt(itemId),
      newName: itemName,
      newCategory: category,
      newPrice: parseFloat(price),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        {step === 1 ? (
          <>
            <h3 className="text-xl font-bold mb-4">Find Item to Edit</h3>
            <label className="block text-gray-700 mb-1">Item ID:</label>
            <input
              type="number"
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
              placeholder="Enter Item ID"
            />
            <label className="block text-gray-700 mb-1">Item Name:</label>
            <input
              type="text"
              value={lookupName}
              onChange={(e) => setLookupName(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
              placeholder="Enter Item Name"
            />
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <div className="flex justify-end">
              <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button
                onClick={handleLookup}
                disabled={loading}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                {loading ? 'Checking...' : 'Next'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">Edit Item</h3>
            <label className="block text-gray-700 mb-1">New Item ID:</label>
            <input
              type="number"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
            />
            <label className="block text-gray-700 mb-1">New Name:</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
            />
            <label className="block text-gray-700 mb-1">New Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
            />
            <label className="block text-gray-700 mb-1">New Price:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded px-2 py-1 mb-4"
            />
            <div className="flex justify-end">
              <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleEditSubmit} className="px-4 py-2 bg-green-500 text-white rounded">
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* Modal Component for "Delete Item" */
function DeleteItemModal({ onClose, onSubmit }) {
  const [itemName, setItemName] = useState('');
  
  const handleSubmit = () => {
    onSubmit({ itemName });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Delete Item</h3>
        <label className="block text-gray-700 mb-1">Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter item name"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* Modal Component for "Add User" */
function AddUserModal({ onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [isManager, setIsManager] = useState(false);

  const handleSubmit = () => {
    onSubmit({ email, isManager });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Add User</h3>
        <label className="block mb-1">Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-2 py-1 mb-4 rounded" />
        <label className="block mb-1">
          <input type="checkbox" checked={isManager} onChange={e => setIsManager(e.target.checked)} />
          <span className="ml-2">Is Manager?</span>
        </label>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
        </div>
      </div>
    </div>
  );
}

/* Modal Component for "Edit User" */
function EditUserModal({ onClose, onSubmit }) {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isManager, setIsManager] = useState(false);

  const handleSubmit = () => {
    onSubmit({ oldEmail, newEmail, isManager });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Edit User</h3>
        <label className="block mb-1">Current Email:</label>
        <input type="email" value={oldEmail} onChange={e => setOldEmail(e.target.value)} className="w-full border px-2 py-1 mb-2 rounded" />
        <label className="block mb-1">New Email:</label>
        <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full border px-2 py-1 mb-2 rounded" />
        <label className="block mb-1">
          <input type="checkbox" checked={isManager} onChange={e => setIsManager(e.target.checked)} />
          <span className="ml-2">Is Manager?</span>
        </label>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}

/* Modal Component for "Remove User" */
function RemoveUserModal({ onClose, onSubmit }) {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    onSubmit({ email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Remove User</h3>
        <label className="block mb-1">Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-2 py-1 mb-4 rounded" />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
        </div>
      </div>
    </div>
  );
}

// Main Inventory Page Component
export default function InventoryPage() {
  const navigate = useNavigate();
  useEffect(() => {
  const userData = JSON.parse(localStorage.getItem('user'));
  
  if (!userData || !userData.isManager) {
      // Redirect to login page if not logged in
      localStorage.removeItem('user');
      navigate('/');
  }
  }, []);

  const actionButtons = [
    { label: 'Add Stock', color: 'bg-green-500 hover:bg-green-600' },
    { label: 'Create Item', color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'Edit Item', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { label: 'Delete Item', color: 'bg-red-500 hover:bg-red-600' },
    { label: 'Add User', color: 'bg-green-500 hover:bg-green-600' },
    { label: 'Edit User', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { label: 'Remove User', color: 'bg-red-500 hover:bg-red-600' }
  ];

  const [showAddStock, setShowAddStock] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showRemoveUser, setShowRemoveUser] = useState(false);

  // Send add stock request to backend
  const handleAddStock = async ({ item, amount }) => {
    try {
      const response = await fetch(`${API_BASE}/add-stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, amount: parseFloat(amount) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      loadInventory();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Send create item request to backend
  const handleCreateItem = async ({ itemId, itemName, category, price }) => {
    try {
      const response = await fetch(`${API_BASE}/create-item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: parseInt(itemId), itemName, category, price: parseFloat(price) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      loadInventory();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Send edit item request to backend
  const handleEditItem = async ({ oldItemId, newItemId, newName, newCategory, newPrice }) => {
    try {
      const response = await fetch(`${API_BASE}/edit-item`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldItemId,
          newItemId,
          newName,
          newCategory,
          newPrice
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.error || 'Failed to update item');
  
      loadInventory();
    } catch (err) {
      console.error('Edit error:', err);
      alert('Error editing item: ' + err.message);
    }
  };

  // Send delete item request to backend
  const handleDeleteItem = async ({ itemName }) => {
    try {
      const response = await fetch(`${API_BASE}/delete-item`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Delete failed');
  
      loadInventory();
    } catch (err) {
      alert('Error deleting item: ' + err.message);
    }
  };

  // Send add user request to backend
  const handleAddUser = async ({ email, isManager }) => {
    try {
      const res = await fetch(`${API_BASE}/add-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, isManager }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert('User added!');
    } catch (err) {
      alert('Add user failed: ' + err.message);
    }
  };
  
  // Send edit user request to backend
  const handleEditUser = async ({ oldEmail, newEmail, isManager }) => {
    try {
      const res = await fetch(`${API_BASE}/edit-user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldEmail, newEmail, isManager }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert('User updated!');
    } catch (err) {
      alert('Edit user failed: ' + err.message);
    }
  };
  
  // Send remove user request to backend
  const handleRemoveUser = async ({ email }) => {
    try {
      const res = await fetch(`${API_BASE}/remove-user`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert('User removed!');
    } catch (err) {
      alert('Remove user failed: ' + err.message);
    }
  };
  
  /* Load inventory from backend */
  const [inventoryData, setInventoryData] = useState([]);
  const loadInventory = async () => {
    try {
      const response = await fetch(`${API_BASE}`);
      const data = await response.json();
      setInventoryData(data);
    } catch (err) {
      console.error('Error loading inventory:', err);
    }
  };
  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center"
      style={{ backgroundImage: "url('/images/bobabackground.svg')" }}
    >
      <div className='w-full max-w-[2560px]'>
        {/* Unified Header */}
        <InventoryHeader />

        {/* Main Content Area */}
        <div className="p-6">
          <h1 className="text-4xl text-center text-white font-bold mb-6">
            Inventory
          </h1>

          {/* Action Buttons Row */}
          <div className="flex justify-center mb-6 space-x-4">
            {actionButtons.map((btn, idx) => {
              let onClick;
              if (btn.label === 'Add Stock') onClick = () => setShowAddStock(true);
              else if (btn.label === 'Create Item') onClick = () => setShowCreateItem(true);
              else if (btn.label === 'Edit Item') onClick = () => setShowEditItem(true);
              else if (btn.label === 'Delete Item') onClick = () => setShowDeleteItem(true);
              else if (btn.label === 'Add User') onClick = () => setShowAddUser(true);
              else if (btn.label === 'Edit User') onClick = () => setShowEditUser(true);
              else if (btn.label === 'Remove User') onClick = () => setShowRemoveUser(true);

              return (
                <button
                  key={idx}
                  onClick={onClick}
                  className={`${btn.color} text-white font-semibold rounded px-4 py-2 transition-transform hover:scale-105`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto bg-white bg-opacity-80 rounded-lg p-4">
            <table className="w-full table-auto text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border border-black">Category</th>
                  <th className="px-4 py-2 border border-black">Stock</th>
                  <th className="px-4 py-2 border border-black">Previous Usage</th>
                  <th className="px-4 py-2 border border-black">Low Stock Items</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((row, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-4 py-2 border border-black">{row.category}</td>
                    <td className="px-4 py-2 border border-black">{row.stock}</td>
                    <td className="px-4 py-2 border border-black">{row.previousUsage ?? 0}</td>
                    <td className="px-4 py-2 border border-black">{row.lowStockItems}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Conditional Modals */}
        {showAddStock && (
          <AddStockModal onClose={() => setShowAddStock(false)} onSubmit={handleAddStock} />
        )}
        {showCreateItem && (
          <CreateItemModal onClose={() => setShowCreateItem(false)} onSubmit={handleCreateItem} />
        )}
        {showEditItem && (
          <EditItemModal onClose={() => setShowEditItem(false)} onSubmit={handleEditItem} />
        )}
        {showDeleteItem && (
          <DeleteItemModal onClose={() => setShowDeleteItem(false)} onSubmit={handleDeleteItem} />
        )}
        {showAddUser && (
          <AddUserModal onClose={() => setShowAddUser(false)} onSubmit={handleAddUser} />
        )}
        {showEditUser && (
          <EditUserModal onClose={() => setShowEditUser(false)} onSubmit={handleEditUser} />
        )}
        {showRemoveUser && (
          <RemoveUserModal onClose={() => setShowRemoveUser(false)} onSubmit={handleRemoveUser} />
        )}
      </div>
    </div>
  );
}
