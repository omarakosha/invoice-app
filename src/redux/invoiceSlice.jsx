import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    addInvoices: (state, action) => {
      // إضافة دفعة من الفواتير المستوردة
      state.invoices.push(...action.payload);
    },
    updateInvoiceStatus: (state, action) => {
      const { id, status } = action.payload;
      const invoice = state.invoices.find(inv => inv.id === id);
      if (invoice) invoice.status = status;
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(inv => inv.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.invoices.findIndex(inv => inv.id === action.payload.id);
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
  },
});

export const {
  addInvoice,
  addInvoices, // ✅ نضيف هذا التصدير
  updateInvoiceStatus,
  deleteInvoice,
  updateInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
