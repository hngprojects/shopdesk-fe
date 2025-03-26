// features/sidebar/sidebar.slice.ts
// import type { Stock } from '@/types/sale';
import type { StockItem } from '@/types/stocks';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isOpen: boolean;
  selectedItem: StockItem | null;
  isEditModalOpen: boolean;
  isEditNameOpen: boolean;
  isEditQuantityOpen: boolean;
  isEditPriceOpen: boolean;
  isSuccessModalOpen: boolean;
  isImageUploaderOpen: boolean;
  isEditImageModalOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
  selectedItem: null,
  isEditModalOpen: false,
  isEditNameOpen: false,
  isEditQuantityOpen: false,
  isEditPriceOpen: false,
  isSuccessModalOpen: false,
  isImageUploaderOpen: false,
  isEditImageModalOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openSidebar: (state, action: PayloadAction<StockItem>) => {
      state.isOpen = true;
      state.selectedItem = action.payload;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
      state.selectedItem = null;
    },
    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
    },
    openEditName: (state) => {
      state.isEditNameOpen = true;
    },
    closeEditName: (state) => {
      state.isEditNameOpen = false;
    },
    openEditQuantity: (state) => {
      state.isEditQuantityOpen = true;
    },
    closeEditQuantity: (state) => {
      state.isEditQuantityOpen = false;
    },
    openEditPrice: (state) => {
      state.isEditPriceOpen = true;
    },
    closeEditPrice: (state) => {
      state.isEditPriceOpen = false;
    },
    openSuccessModal: (state) => {
      state.isSuccessModalOpen = true;
    },
    closeSuccessModal: (state) => {
      state.isSuccessModalOpen = false;
    },
    openImageUploader: (state) => {
      state.isImageUploaderOpen = true;
    },
    closeImageUploader: (state) => {
      state.isImageUploaderOpen = false;
    },
    openEditImageModal: (state) => {
      state.isEditImageModalOpen = true;
    },
    closeEditImageModal: (state) => {
      state.isEditImageModalOpen = false;
    },
    saveItem: (state, action: PayloadAction<StockItem>) => {
      if (state.selectedItem) {
        state.selectedItem = action.payload;
      }
    },
  },
});

export const {
  openSidebar,
  closeSidebar,
  openEditModal,
  closeEditModal,
  openEditName,
  closeEditName,
  openEditQuantity,
  closeEditQuantity,
  openEditPrice,
  closeEditPrice,
  openSuccessModal,
  closeSuccessModal,
  openImageUploader,
  closeImageUploader,
  openEditImageModal,
  closeEditImageModal,
  saveItem,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
