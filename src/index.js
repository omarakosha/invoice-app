import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './redux/invoiceSlice';
import InvoicesPage from './pages/InvoicesPage';
import InvoiceDetail from './components/invoiceComponent/InvoiceDetail';
import EditInvoice from './components/invoiceComponent/EditInvoice'; // إذا عندك صفحة تعديل
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<InvoicesPage />} />
      
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
        <Route path="/edit/:id" element={<EditInvoice />} /> {/* تأكد من توفر هذا المكون */}
      </Routes>
    </BrowserRouter>
  </Provider>
);
