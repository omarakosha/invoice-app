import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

const NavBar = ({ onAddInvoice, onDownloadTemplate, onImportExcel }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center relative mb-4">
      <h1 className="text-lg md:text-xl font-bold text-indigo-700">العمليات</h1>

      {/* أزرار على الشاشات المتوسطة والكبيرة */}
      <div className="hidden sm:flex gap-2">
        <button
          onClick={onAddInvoice}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + إضافة فاتورة
        </button>

        <button
          onClick={onDownloadTemplate}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          تحميل قالب Excel
        </button>

        <label className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
          استيراد من Excel
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={onImportExcel}
            hidden
          />
        </label>
      </div>

      {/* القائمة المنسدلة للهواتف */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded hover:bg-gray-100 border"
          aria-label="قائمة الخيارات"
        >
          <MoreVertical size={22} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded-lg shadow z-50 text-sm">
            <button
              onClick={() => {
                onAddInvoice();
                setMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-2 hover:bg-gray-100"
            >
              + إضافة فاتورة
            </button>

            <button
              onClick={() => {
                onDownloadTemplate();
                setMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-2 hover:bg-gray-100"
            >
              تحميل قالب Excel
            </button>

            <label className="block w-full text-right px-4 py-2 cursor-pointer hover:bg-gray-100">
              استيراد من Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => {
                  onImportExcel(e);
                  setMenuOpen(false);
                }}
                hidden
              />
            </label>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
