import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Header Component (as used in Analytics styling)
function InventoryHeader() {
  const navigate = useNavigate();
  const [time, setTime] = useState(getCurrentTime());

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Home', icon: '/images/home.png', route: '/menu' },
    { label: 'Analytics', icon: '/images/analytics.png', route: '/analytics' },
    { label: 'Inventory', icon: '/images/inventory.png', route: '/inventory' },
  ];

  return (
    <div className="relative flex flex-row justify-center items-center bg-cover bg-center h-20 py-6 px-8">
      {/* Left Nav Buttons */}
      <div className="absolute top-4 left-12 flex space-x-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.route)}
            className="flex flex-col items-center text-white hover:scale-105 transition-transform"
          >
            <img src={item.icon} alt={item.label} className="w-10 h-10 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Center Logo */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <img src="/images/ShareteaLogo.png" alt="Sharetea" className="h-16" />
      </div>

      {/* Time + Logout on Right */}
      <div className="absolute right-6 top-5 flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 text-lg font-semibold text-white rounded-full px-4 py-1 shadow hover:scale-105 transition-transform"
        >
          Logout
        </button>
        <div className="bg-slate-600 py-2 px-4 rounded-full text-white text-2xl font-bold">
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
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [prevUsage, setPrevUsage] = useState('');
  const [lowStockItems, setLowStockItems] = useState('');
  
  const handleSubmit = () => {
    onSubmit({ category, stock, prevUsage, lowStockItems });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Create Item</h3>
        <label className="block text-gray-700 mb-1">Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter category"
        />
        <label className="block text-gray-700 mb-1">Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter stock amount"
        />
        <label className="block text-gray-700 mb-1">Previous Usage:</label>
        <input
          type="number"
          value={prevUsage}
          onChange={(e) => setPrevUsage(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter previous usage"
        />
        <label className="block text-gray-700 mb-1">Low Stock Items:</label>
        <input
          type="text"
          value={lowStockItems}
          onChange={(e) => setLowStockItems(e.target.value)}
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
  const [itemToEdit, setItemToEdit] = useState('');
  const [newStock, setNewStock] = useState('');
  
  const handleSubmit = () => {
    onSubmit({ itemToEdit, newStock });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Edit Item</h3>
        <label className="block text-gray-700 mb-1">Which item to edit:</label>
        <input
          type="text"
          value={itemToEdit}
          onChange={(e) => setItemToEdit(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter item name"
        />
        <label className="block text-gray-700 mb-1">New Stock Amount:</label>
        <input
          type="number"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          placeholder="Enter new stock amount"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-yellow-500 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* Modal Component for "Delete Item" */
function DeleteItemModal({ onClose, onSubmit }) {
  const [itemToDelete, setItemToDelete] = useState('');
  
  const handleSubmit = () => {
    onSubmit({ itemToDelete });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-bold mb-4">Delete Item</h3>
        <label className="block text-gray-700 mb-1">Which item to delete:</label>
        <input
          type="text"
          value={itemToDelete}
          onChange={(e) => setItemToDelete(e.target.value)}
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

// Main Inventory Page Component
export default function InventoryPage() {
  const actionButtons = [
    { label: 'Add Stock', color: 'bg-green-500 hover:bg-green-600' },
    { label: 'Create Item', color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'Edit Item', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { label: 'Delete Item', color: 'bg-red-500 hover:bg-red-600' },
  ];

  const [showAddStock, setShowAddStock] = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showEditItem, setShowEditItem] = useState(false);
  const [showDeleteItem, setShowDeleteItem] = useState(false);

  const handleAddStock = (data) => {
    console.log("Add Stock Data:", data);
    // Process Add Stock data here (e.g., update UI or call API)
  };

  const handleCreateItem = (data) => {
    console.log("Create Item Data:", data);
    // Process Create Item data here
  };

  const handleEditItem = (data) => {
    console.log("Edit Item Data:", data);
    // Process Edit Item data here
  };

  const handleDeleteItem = (data) => {
    console.log("Delete Item Data:", data);
    // Process Delete Item data here
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bobabackground.svg')" }}
    >
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
              <tr className="border-b">
                <td className="px-4 py-2 border border-black">Brewed Tea</td>
                <td className="px-4 py-2 border border-black">16.0000</td>
                <td className="px-4 py-2 border border-black">16</td>
                <td className="px-4 py-2 border border-black">Ginger Tea</td>
              </tr>
              {/* Additional placeholder rows as needed */}
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
    </div>
  );
}
