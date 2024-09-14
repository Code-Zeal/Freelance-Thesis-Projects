import React from 'react'

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <span className="absolute text-xs bg-gray-900 text-white p-2 rounded-md bottom-5 -left-8 group-hover:block hidden text-center">
        {text}
      </span>
    </div>
  );
};

export default Tooltip