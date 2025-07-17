import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const SingleInvoicePopup = ({ onClose, onSave, invoice }) => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    customer: '',
    amount: '',
    status: 'غير مدفوعة',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (invoice) {
      setFormData(invoice); // تعبئة البيانات للتعديل
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من صحة الإدخال البسيط
    if (!formData.customer.trim()) {
      toast.error('يرجى إدخال اسم العميل');
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('يرجى إدخال مبلغ صالح');
      return;
    }

    if (typeof onSave === 'function') {
      onSave(formData);
      toast.success(invoice ? 'تم تعديل الفاتورة بنجاح' : 'تم إضافة الفاتورة بنجاح');
    } else {
      console.error('onSave is not a function');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md shadow"
      >
        <h2 className="text-xl font-bold mb-4">
          {invoice ? 'تعديل فاتورة' : 'إضافة فاتورة جديدة'}
        </h2>

        <input
          type="text"
          name="customer"
          placeholder="اسم العميل"
          value={formData.customer}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="المبلغ"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded"
        >
          <option value="مدفوعة">مدفوعة</option>
          <option value="غير مدفوعة">غير مدفوعة</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-4 rounded"
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            حفظ
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingleInvoicePopup;
