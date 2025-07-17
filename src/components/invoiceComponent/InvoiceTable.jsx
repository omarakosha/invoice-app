import React, { useState } from 'react';
import { Eye, Edit, Printer, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const InvoiceTable = ({
  invoices,
  onEdit,
  onDelete,
  onPrint,
  onView,
  filter,
  setFilter,
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onExport,
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  const currentInvoices = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    onDelete(id);
    toast.info('🗑️ تم حذف الفاتورة بنجاح');
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* الفلترة والبحث */}
      <div className="flex flex-wrap gap-4 justify-center items-center mb-4">
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="الكل">كل الحالات</option>
          <option value="مدفوعة">مدفوعة</option>
          <option value="غير مدفوعة">غير مدفوعة</option>
        </select>

        <input
          type="text"
          placeholder="بحث بالعميل أو الرقم"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <span className="text-gray-500">إلى</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2"
        />

        <button
          onClick={onExport}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          تصدير CSV
        </button>
      </div>

      {/* جدول الفواتير */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">العميل</th>
              <th className="py-3 px-4">المبلغ</th>
              <th className="py-3 px-4">الحالة</th>
              <th className="py-3 px-4">التاريخ</th>
              <th className="py-3 px-4">خيارات</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-gray-500">
                  لا توجد فواتير مطابقة.
                </td>
              </tr>
            ) : (
              currentInvoices.map((inv, index) => (
                <tr key={inv.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-2 px-4">{inv.customer}</td>
                  <td className="py-2 px-4">{inv.amount}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${inv.status === 'مدفوعة' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    >
                      {inv.status}
                    </span>
                  </td>

                  <td className="py-2 px-4">{inv.date}</td>
                  <td className="py-2 px-4 flex gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => onView(inv)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                      title="عرض"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(inv)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                      title="تعديل"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onPrint(inv)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                      title="طباعة"
                    >
                      <Printer size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(inv.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* الصفحات */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;
