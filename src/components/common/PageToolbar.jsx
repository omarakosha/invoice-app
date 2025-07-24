import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

const PageToolbar = ({
  title = 'العمليات',
  onAdd,
  onDownloadTemplate,
  onImportExcel,
  addLabel = 'إضافة',
  showAdd = true,
  showTemplate = true,
  showImport = true,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-4">
      <div className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center relative">
        <h1 className="text-lg md:text-xl font-bold text-indigo-700">{title}</h1>

        {/* شاشات كبيرة */}
        <div className="hidden sm:flex gap-2">
          {showAdd && (
            <button
              onClick={onAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              + {addLabel}
            </button>
          )}

          {showTemplate && (
            <button
              onClick={onDownloadTemplate}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              تحميل قالب Excel
            </button>
          )}

          {showImport && (
            <label className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
              استيراد من Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={onImportExcel}
                hidden
              />
            </label>
          )}
        </div>

        {/* شاشات صغيرة */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded hover:bg-gray-100 border"
            aria-label="قائمة الخيارات"
          >
            <MoreVertical size={22} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded-lg shadow z-50 text-sm text-right">
              {showAdd && (
                <button
                  onClick={() => {
                    onAdd();
                    setMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                >
                  + {addLabel}
                </button>
              )}
              {showTemplate && (
                <button
                  onClick={() => {
                    onDownloadTemplate();
                    setMenuOpen(false);
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                >
                  تحميل قالب Excel
                </button>
              )}
              {showImport && (
                <label className="block w-full px-4 py-2 cursor-pointer hover:bg-gray-100">
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageToolbar;
