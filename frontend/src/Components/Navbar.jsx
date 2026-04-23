import React from 'react';
import { LogOut } from 'lucide-react';

const Navbar = ({ user, handleLogout }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 glass-card py-3 px-4">
      <h3 className="m-0">Campus Lost & Found</h3>
      <div className="d-flex align-items-center gap-3">
        <span>Welcome, <strong>{user?.name}</strong></span>
        <button onClick={handleLogout} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;