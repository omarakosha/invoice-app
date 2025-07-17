import React from 'react';

const BottomBar = () => {
  return (
    <div className="bg-gray-100 text-center py-4 text-sm text-gray-600 border-t">
      &copy; {new Date().getFullYear()} جميع الحقوق محفوظة | Devolped by Omar Khalid
    </div>
  );
};

export default BottomBar;
