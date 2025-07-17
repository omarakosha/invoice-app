import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateInvoice } from '../../redux/invoiceSlice';

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoice = useSelector(state =>
    state.invoices.invoices.find(inv => inv.id.toString() === id)
  );

  const [formData, setFormData] = useState({
    customer: '',
    amount: '',
    status: 'غير مدفوعة',
    date: '',
  });

  useEffect(() => {
    if (invoice) {
      setFormData({
        customer: invoice.customer,
        amount: invoice.amount,
        status: invoice.status,
        date: invoice.date,
      });
    }
  }, [invoice]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      updateInvoice({
        id: parseInt(id),
        ...formData,
      })
    );
    navigate('/');
  };

  if (!invoice) return <div className="p-4">الفاتورة غير موجودة.</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">تعديل الفاتورة</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          placeholder="اسم العميل"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="المبلغ"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="مدفوعة">مدفوعة</option>
          <option value="غير مدفوعة">غير مدفوعة</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default EditInvoice;
