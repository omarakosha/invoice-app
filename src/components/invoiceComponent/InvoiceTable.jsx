import React, { useState } from 'react';
import { Eye, Edit, Printer, Trash2, MoreVertical } from 'lucide-react';
import { toast } from 'react-toastify';

const InvoiceTable = ({
  invoices = [],
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
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

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
    <div className="bg-white shadow rounded-xl p-4">
      {/* الفلترة والبحث */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
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
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
        />

        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
          />
          <span className="text-gray-500 text-sm">إلى</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
          />
        </div>

        <button
          onClick={onExport}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm w-full"
        >
          تصدير CSV
        </button>
      </div>

      {/* جدول الفواتير */}
      <div className="overflow-x-auto border rounded-lg max-h-[500px] overflow-y-auto">
        <table className="min-w-full table-auto border-collapse text-sm text-center">
          <thead className="bg-indigo-100 text-indigo-700 sticky top-0 z-10 text-sm">
            <tr>
              <th className="py-3 px-2 border-b font-semibold w-[5%]">#</th>
              <th className="py-3 px-2 border-b font-semibold w-[25%]">العميل</th>
              <th className="py-3 px-2 border-b font-semibold w-[15%]">المبلغ</th>
              <th className="py-3 px-2 border-b font-semibold w-[15%]">الحالة</th>
              <th className="py-3 px-2 border-b font-semibold w-[20%]">التاريخ</th>
              <th className="py-3 px-2 border-b font-semibold w-[20%]">خيارات</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-gray-500 bg-gray-50">
                  لا توجد فواتير مطابقة.
                </td>
              </tr>
            ) : (
              currentInvoices.map((inv, index) => (
                <tr
                  key={inv.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b hover:bg-gray-100 transition duration-150`}
                >
                  <td className="py-3 px-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-3 px-2 break-words">{inv.customer}</td>
                  <td className="py-3 px-2">{inv.amount}</td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs sm:text-sm font-medium ${
                        inv.status === 'مدفوعة'
                          ? 'bg-green-500'
                          : inv.status === 'قيد الانتظار'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">{inv.date}</td>
                  <td className="py-3 px-2 relative">
                    {/* سطح المكتب */}
                    <div className="hidden sm:flex gap-1 justify-center flex-wrap">
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
                    </div>

                    {/* الهواتف */}
                    <div className="sm:hidden flex justify-center">
                      <button
                        onClick={() =>
                          setDropdownOpenId(dropdownOpenId === inv.id ? null : inv.id)
                        }
                        className="p-2 rounded hover:bg-gray-200"
                      >
                        <MoreVertical size={18} />
                      </button>
                      {dropdownOpenId === inv.id && (
                        <div className="absolute z-10 mt-10 bg-white shadow rounded w-32 text-sm right-2">
                          <button
                            onClick={() => {
                              onView(inv);
                              setDropdownOpenId(null);
                            }}
                            className="w-full px-4 py-2 hover:bg-gray-100 text-right"
                          >
                            عرض
                          </button>
                          <button
                            onClick={() => {
                              onEdit(inv);
                              setDropdownOpenId(null);
                            }}
                            className="w-full px-4 py-2 hover:bg-gray-100 text-right"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => {
                              onPrint(inv);
                              setDropdownOpenId(null);
                            }}
                            className="w-full px-4 py-2 hover:bg-gray-100 text-right"
                          >
                            طباعة
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(inv.id);
                              setDropdownOpenId(null);
                            }}
                            className="w-full px-4 py-2 hover:bg-red-100 text-right text-red-600"
                          >
                            حذف
                          </button>
                        </div>
                      )}
                    </div>
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
              className={`px-3 py-1 rounded border text-sm font-medium ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
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
