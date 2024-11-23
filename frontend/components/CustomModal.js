
import React from 'react';

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800"
        >
          ×
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
