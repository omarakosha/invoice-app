import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { generatePDF } from '../../utils/pdfGenerator';
import { deleteInvoice } from '../../redux/invoiceSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoice = useSelector(state => state.invoices.invoices.find(inv => inv.id === id));

  if (!invoice) {
    return <div className="p-4">لم يتم العثور على الفاتورة المطلوبة.</div>;
  }

  const handleDelete = () => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الفاتورة؟')) {
      dispatch(deleteInvoice(id));
      toast.success('تم حذف الفاتورة بنجاح');
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <p>
  <strong>الحالة:</strong>{' '}
  <span
    className={`font-bold ${
      invoice.status === 'مدفوعة' ? 'text-green-600' : 'text-red-600'
    }`}
  >
    {invoice.status}
  </span>
</p>

      <h2 className="text-2xl font-bold mb-4">تفاصيل الفاتورة</h2>
      <p><strong>الرقم:</strong> {invoice.id}</p>
      <p><strong>العميل:</strong> {invoice.customer}</p>
      <p><strong>المبلغ:</strong> {invoice.amount}</p>
      <p ><strong>الحالة:</strong> {invoice.status}</p>
      <p><strong>التاريخ:</strong> {invoice.date}</p>
      

      <div className="mt-4 space-x-2">
        <button
          onClick={() => generatePDF(invoice)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          طباعة PDF
        </button>
        <button
          onClick={() => navigate(`/edit/${invoice.id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          تعديل
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          حذف
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          رجوع
        </button>
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default InvoiceDetail;
