import React, { useState, useEffect } from 'react';
import API from '../api/axiosInstance';
import { LogOut, Search, PlusCircle, MapPin, Calendar, Phone, Edit, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    itemName: '', description: '', type: 'Lost', location: '', date: '', contactInfo: ''
  });
  const [editingId, setEditingId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await API.get('/items');
      setItems(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.get(`/items/search?name=${searchQuery}`);
      setItems(data);
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/items/${editingId}`, formData);
        setEditingId(null);
      } else {
        await API.post('/items', formData);
      }
      setFormData({ itemName: '', description: '', type: 'Lost', location: '', date: '', contactInfo: '' });
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving item");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      itemName: item.itemName,
      description: item.description,
      type: item.type,
      location: item.location,
      date: item.date.split('T')[0],
      contactInfo: item.contactInfo
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await API.delete(`/items/${id}`);
        fetchItems();
      } catch (err) {
        alert(err.response?.data?.message || "Unauthorized access");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="container-fluid pb-5 px-4">
      {/* --- High Visibility Navbar --- */}
      <div className="d-flex justify-content-between align-items-center mb-4 glass-card py-3 px-4 shadow-lg" 
           style={{ background: 'rgba(30, 30, 35, 0.95)', border: '1px solid #333' }}>
        <h2 className="text-white fw-bold m-0">Campus Lost & Found</h2>
        <div className="d-flex align-items-center gap-3">
          <span className="text-light">Welcome, <strong className="text-primary">{user?.name}</strong></span>
          <button onClick={handleLogout} className="btn btn-danger btn-sm d-flex align-items-center gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* --- Left Column: Report Form --- */}
        <div className="col-md-4">
          <div className="glass-card shadow-sm" style={{ background: 'rgba(35, 35, 40, 0.9)', border: '1px solid #444' }}>
            <h4 className="text-white mb-4 d-flex align-items-center gap-2 border-bottom pb-2">
              <PlusCircle size={22} className="text-primary" /> 
              {editingId ? 'Edit Entry' : 'Report Item'}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="text-light small mb-1">Item Name</label>
                <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} className="form-control" placeholder="What did you lose/find?" required />
              </div>
              <div className="mb-3">
                <label className="text-light small mb-1">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="form-select bg-dark text-white border-secondary">
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="text-light small mb-1">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="form-control" placeholder="e.g. Library, Room 402" required />
              </div>
              <div className="mb-3">
                <label className="text-light small mb-1">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="text-light small mb-1">Contact Details</label>
                <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="form-control" placeholder="Phone or Email" required />
              </div>
              <div className="mb-3">
                <label className="text-light small mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Provide some details..." rows="3" required></textarea>
              </div>
              <button type="submit" className={`btn w-100 fw-bold ${editingId ? 'btn-warning' : 'btn-primary'}`}>
                {editingId ? 'Update Item' : 'Submit Report'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => { setEditingId(null); setFormData({ itemName: '', description: '', type: 'Lost', location: '', date: '', contactInfo: '' }); }}>
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>

        {/* --- Right Column: Search & Feed --- */}
        <div className="col-md-8">
          <div className="glass-card mb-4 shadow-sm" style={{ background: 'rgba(35, 35, 40, 0.9)', border: '1px solid #444' }}>
            <form onSubmit={handleSearch} className="d-flex gap-2">
              <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-secondary"><Search size={18}/></span>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="form-control border-secondary" placeholder="Search by item name..." />
              </div>
              <button type="submit" className="btn btn-info px-4 fw-bold">Search</button>
              <button type="button" onClick={() => { setSearchQuery(''); fetchItems(); }} className="btn btn-secondary">Reset</button>
            </form>
          </div>

          <div className="row g-3">
            {items.length === 0 ? (
              <div className="col-12 text-center mt-5 text-secondary">
                <h5>No items reported yet. Be the first!</h5>
              </div>
            ) : (
              items.map((item) => (
                <div key={item._id} className="col-md-6">
                  <div className="glass-card h-100 p-3 shadow-lg" 
                       style={{ 
                         background: 'rgba(40, 40, 45, 0.95)', 
                         border: '1px solid #444',
                         borderLeft: `5px solid ${item.type === 'Lost' ? '#ff4d4d' : '#00e676'}` 
                       }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="text-white fw-bold mb-0">{item.itemName}</h5>
                      <span className={`badge ${item.type === 'Lost' ? 'bg-danger' : 'bg-success'}`}>{item.type}</span>
                    </div>
                    <p className="text-light-50 small mb-3 border-bottom border-secondary pb-2" style={{ color: '#bbb' }}>{item.description}</p>
                    
                    <div className="small mb-1 text-info d-flex align-items-center gap-2">
                      <MapPin size={14} /> <span className="text-white-50">{item.location}</span>
                    </div>
                    <div className="small mb-1 text-warning d-flex align-items-center gap-2">
                      <Calendar size={14} /> <span className="text-white-50">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="small mb-3 text-success d-flex align-items-center gap-2">
                      <Phone size={14} /> <span className="text-white-50">{item.contactInfo}</span>
                    </div>

                    {/* Show buttons only if user is owner  */}
                    {(item.user === user?.id || item.user?._id === user?.id) && (
                      <div className="d-flex gap-2 mt-auto pt-3 border-top border-secondary">
                        <button onClick={() => handleEdit(item)} className="btn btn-sm btn-outline-warning w-50 fw-bold d-flex align-items-center justify-content-center gap-2">
                          <Edit size={14} /> Edit
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-outline-danger w-50 fw-bold d-flex align-items-center justify-content-center gap-2">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;