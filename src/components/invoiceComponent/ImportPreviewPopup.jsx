import React from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ImportPreviewPopup = ({
  importedInvoices,
  setImportedInvoices,
  onClose,
  onSave,
}) => {
  const handleInputChange = (idx, field, value) => {
    const updated = [...importedInvoices];
    updated[idx][field] = value;

    // إعادة التحقق من الحقول
    updated[idx].errors = {
      customer: !updated[idx].customer.trim(),
      amount: isNaN(updated[idx].amount) || Number(updated[idx].amount) <= 0,
      status: updated[idx].status !== 'مدفوعة' && updated[idx].status !== 'غير مدفوعة',
      date: !updated[idx].date || isNaN(Date.parse(updated[idx].date)),
    };

    setImportedInvoices(updated);
  };

  const handleDelete = (idx) => {
    const updated = importedInvoices.filter((_, i) => i !== idx);
    setImportedInvoices(updated);
    toast.info('تم حذف الفاتورة من القائمة المؤقتة');
  };

  const handleSave = () => {
    const hasErrors = importedInvoices.some((inv) =>
      Object.values(inv.errors || {}).some((err) => err)
    );

    if (hasErrors) {
      toast.error('⚠️ يوجد حقول غير صالحة. يرجى تصحيحها قبل الحفظ.');
      return;
    }

    toast.success('✅ تم حفظ الفواتير المستوردة بنجاح');
    onSave();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-xl relative max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          معاينة الفواتير المستوردة
        </h2>

        <table className="w-full text-sm text-center mb-4 border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>العميل</th>
              <th>المبلغ</th>
              <th>الحالة</th>
              <th>التاريخ</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {importedInvoices.map((inv, idx) => (
              <tr key={inv.id} className="border-b">
                <td>
                  <input
                    type="text"
                    value={inv.customer}
                    onChange={(e) => handleInputChange(idx, 'customer', e.target.value)}
                    className={`border px-2 py-1 rounded ${
                      inv.errors?.customer ? 'border-red-500' : ''
                    }`}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={inv.amount}
                    onChange={(e) => handleInputChange(idx, 'amount', e.target.value)}
                    className={`border px-2 py-1 rounded ${
                      inv.errors?.amount ? 'border-red-500' : ''
                    }`}
                  />
                </td>
                <td>
                  <select
                    value={inv.status}
                    onChange={(e) => handleInputChange(idx, 'status', e.target.value)}
                    className={`border px-2 py-1 rounded ${
                      inv.errors?.status ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="مدفوعة">مدفوعة</option>
                    <option value="غير مدفوعة">غير مدفوعة</option>
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    value={inv.date}
                    onChange={(e) => handleInputChange(idx, 'date', e.target.value)}
                    className={`border px-2 py-1 rounded ${
                      inv.errors?.date ? 'border-red-500' : ''
                    }`}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    title="حذف"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            حفظ الفواتير
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportPreviewPopup;
