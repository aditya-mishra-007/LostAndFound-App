import React from 'react';
import { MapPin, Calendar, Phone, Edit, Trash2 } from 'lucide-react';

const ItemCard = ({ item, userId, handleEdit, handleDelete }) => {
  // Check if the current user is the one who created the item
  // We use item.user._id or item.user depending on how Mongoose returns it
  const isOwner = item.user === userId || item.user?._id === userId;

  return (
    <div className="glass-card item-card p-3 h-100 d-flex flex-column" style={{ borderLeft: `4px solid ${item.type === 'Lost' ? '#ff4d4d' : '#00e676'}` }}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5 className="m-0 text-truncate">{item.itemName}</h5>
        <span className={`badge ${item.type === 'Lost' ? 'bg-danger' : 'bg-success'}`}>
          {item.type}
        </span>
      </div>
      <p className="mb-3 text-secondary">{item.description}</p>
      
      <div className="mt-auto">
        <div className="small mb-1 d-flex align-items-center gap-2">
          <MapPin size={14} className="text-info" /> <span>{item.location}</span>
        </div>
        <div className="small mb-1 d-flex align-items-center gap-2">
          <Calendar size={14} className="text-warning" /> <span>{new Date(item.date).toLocaleDateString()}</span>
        </div>
        <div className="small mb-3 d-flex align-items-center gap-2">
          <Phone size={14} className="text-success" /> <span>{item.contactInfo}</span>
        </div>

        {/* Action Buttons: Visible only to the owner */}
        {isOwner && (
          <div className="d-flex gap-2 pt-3 border-top border-secondary">
            <button onClick={() => handleEdit(item)} className="btn btn-sm btn-outline-warning w-50 d-flex align-items-center justify-content-center gap-1">
              <Edit size={14} /> Edit
            </button>
            <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-outline-danger w-50 d-flex align-items-center justify-content-center gap-1">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;