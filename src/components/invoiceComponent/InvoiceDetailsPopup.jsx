//InvoiceDetailsPopup.js


const InvoiceDetailsPopup = ({ invoice, onClose }) => {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">تفاصيل الفاتورة #{invoice.id}</h2>
        <div className="space-y-2 text-right">
          <p><strong>العميل:</strong> {invoice.customer}</p>
          <p><strong>الوصف:</strong> {invoice.description || '-'}</p>
          <p><strong>الكمية:</strong> {invoice.quantity || '-'}</p>
          <p><strong>السعر للوحدة:</strong> {invoice.unitPrice || '-'}</p>
          <p><strong>المبلغ:</strong> {invoice.amount}</p>
          <p><strong>الحالة:</strong> {invoice.status}</p>
          <p><strong>التاريخ:</strong> {invoice.date}</p>
          <p><strong>ملاحظات:</strong> {invoice.notes || '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsPopup;
