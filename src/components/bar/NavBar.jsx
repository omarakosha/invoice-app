// src/components/NavBar.js
import React from 'react';


const NavBar = ({ onAddInvoice, onDownloadTemplate, onImportExcel }) => {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold ">لوحة التحكم</h1>

      <div className="flex gap-2">
        
        <button
          onClick={onAddInvoice}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + إضافة فاتورة
        </button>

        <button
          onClick={onDownloadTemplate}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          تحميل قالب Excel
        </button>

        <label className="bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700">
          استيراد من Excel
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={onImportExcel}
            hidden
          />
        </label>
      </div>
    </nav>
  );
};

export default NavBar;
