import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { printInvoicePDF } from '../utils/printInvoicePDF'; // تأكد من مسار utils صحيح
import * as XLSX from 'xlsx';

import TopBar from '../components/bar/TopBar';
import NavBar from '../components/bar/NavBar'; // لو تستخدم NavBar سابقًا يمكنك إزالته لاحقًا
import BottomBar from '../components/bar/BottomBar';

import SingleInvoicePopup from '../components/invoiceComponent/SingleInvoicePopup';
import InvoiceDetailsPopup from '../components/invoiceComponent/InvoiceDetailsPopup';
import InvoiceTable from '../components/invoiceComponent/InvoiceTable';
import ImportPreviewPopup from '../components/invoiceComponent/ImportPreviewPopup';

import PageToolbar from '../components/common/PageToolbar'; // استيراد الـ Toolbar الجديد

import {
  addInvoice,
  addInvoices,
  deleteInvoice,
  updateInvoice,
} from '../redux/invoiceSlice';

const InvoicesPage = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices);

  const [filter, setFilter] = useState('الكل');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [importedInvoices, setImportedInvoices] = useState([]);
  const [showImportPopup, setShowImportPopup] = useState(false);

  const handlePrintSingle = (inv) => {
    printInvoicePDF(inv);
  };

  // فلترة الفواتير بناءً على الحالة، البحث والتواريخ
  const filteredInvoices = invoices.filter((inv) => {
    const statusMatch = filter === 'الكل' || inv.status === filter;
    const searchMatch =
      (inv.customer?.toLowerCase() || '').includes(search.toLowerCase()) ||
      inv.id.toString().includes(search);
    const dateMatch =
      (!startDate || new Date(inv.date) >= new Date(startDate)) &&
      (!endDate || new Date(inv.date) <= new Date(endDate));
    return statusMatch && searchMatch && dateMatch;
  });

  const handleExportCSV = () => {
    const headers = ['رقم', 'العميل', 'المبلغ', 'الحالة', 'التاريخ'];
    const rows = filteredInvoices.map((inv) => [
      inv.id,
      inv.customer,
      inv.amount,
      inv.status,
      inv.date,
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'الفواتير.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTemplate = () => {
    const template = [{ customer: '', amount: '', status: '', date: '' }];
    const worksheet = XLSX.utils.json_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    XLSX.writeFile(workbook, 'قالب_الفواتير.xlsx');
  };

  const validateInvoice = (item) => {
    return {
      customer: !item.customer,
      amount: isNaN(item.amount) || Number(item.amount) <= 0,
      status: item.status !== 'مدفوعة' && item.status !== 'غير مدفوعة',
      date: !item.date || isNaN(Date.parse(item.date)),
    };
  };

  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const imported = XLSX.utils.sheet_to_json(sheet);

      const enriched = imported.map((item) => {
        const invoice = {
          id: item.id || Date.now() + Math.random(),
          customer: item.customer || '',
          amount: item.amount || 0,
          status: item.status || 'غير مدفوعة',
          date: item.date || new Date().toISOString().split('T')[0],
        };
        return {
          ...invoice,
          errors: validateInvoice(invoice),
        };
      });

      setImportedInvoices(enriched);
      setShowImportPopup(true);
      e.target.value = null; // لإعادة تحميل نفس الملف مرة أخرى
    };

    reader.readAsArrayBuffer(file);
  };

  const totalAmount = filteredInvoices.reduce(
    (sum, inv) => sum + parseFloat(inv.amount),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      <TopBar />
      {/* استخدم PageToolbar الجديد */}
      <PageToolbar
        title="العمليات على الفواتير"
        onAdd={() => {
          setEditingInvoice(null);
          setShowPopup(true);
        }}
        onDownloadTemplate={handleDownloadTemplate}
        onImportExcel={handleImportExcel}
        addLabel="إضافة فاتورة"
        showAdd={true}
        showTemplate={true}
        showImport={true}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <InvoiceTable
          invoices={filteredInvoices}
          onEdit={(inv) => {
            setEditingInvoice(inv);
            setShowPopup(true);
          }}
          onDelete={(id) => dispatch(deleteInvoice(id))}
          onPrint={handlePrintSingle}
          onView={(inv) => setSelectedInvoice(inv)}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onExport={handleExportCSV}
        />

        <div className="mt-6 text-right font-bold text-lg">
          الإجمالي: {totalAmount.toFixed(2)}
        </div>
      </main>

      {showPopup && (
        <SingleInvoicePopup
          invoice={editingInvoice}
          onClose={() => {
            setShowPopup(false);
            setEditingInvoice(null);
          }}
          onSave={(invoice) => {
            if (invoice.id) {
              dispatch(updateInvoice(invoice));
            } else {
              dispatch(addInvoice({ ...invoice, id: Date.now() }));
            }
            setShowPopup(false);
            setEditingInvoice(null);
          }}
        />
      )}

      {showImportPopup && (
        <ImportPreviewPopup
          importedInvoices={importedInvoices}
          setImportedInvoices={setImportedInvoices}
          onClose={() => {
            setShowImportPopup(false);
            setImportedInvoices([]);
          }}
          onSave={() => {
            dispatch(addInvoices(importedInvoices));
            setShowImportPopup(false);
            setImportedInvoices([]);
          }}
        />
      )}

      {selectedInvoice && (
        <InvoiceDetailsPopup
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}

      <BottomBar />
    </div>
  );
};

export default InvoicesPage;
