import React, { useState, useEffect } from 'react'; // 🔥 Added useEffect
import API from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 🔥 Added loading state to manage button text

  // 🔥 NEW: Instant Background Pre-Warm Hook to wake up the Render free-tier container on load
  useEffect(() => {
    API.get('/')
      .then(() => console.log("Lost & Found backend pre-warmed successfully."))
      .catch((err) => console.log("Pre-warm wake-up signal sent to server container. Ready shortly..."));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // 🔥 Trigger button loading state
    
    try {
      const response = await API.post('/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/dashboard'; 
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      setLoading(false); // 🔥 Re-enable button on credential error
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4"><LogIn className="me-2" /> Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          
          {/* 🔥 UPDATED: Dynamic text lets the user know the backend container is spinning up */}
          <button type="submit" disabled={loading} className="btn btn-success w-100 mt-3">
            {loading ? 'Waking up cloud server & verifying...' : 'Login'}
          </button>
        </form>
        
        <div className="text-center mt-3">
          <small>Don't have an account? <Link to="/register" className="text-info">Register here</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Login;