
import React from 'react';

const CustomModal = ({ isOpen, onClose, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 modal-backdrop"
      onClick={handleOutsideClick} 
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl mx-auto relative modal-content flex-col flex sm:w-[25vw] w-[55vw] text-black pixel-corners">  
          {children}
      </div>
    </div>
  );
};




export default CustomModal;
