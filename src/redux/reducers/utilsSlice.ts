import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomButtonProps } from '@/styles/button/types';
import { ReactNode } from 'react';

export interface DialogBoxData {
  isOpen: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  alignTitle?: 'center' | 'left' | 'right';
  buttons: CustomButtonProps[];
  onClose?: () => void;
  closeIcon?: boolean;
}

interface UtilsState {
  dialogBox: DialogBoxData;
}

const initialState: UtilsState = {
  dialogBox: {
    isOpen: false,
    title: '',
    description: '',
    icon: null,
    alignTitle: 'left',
    buttons: [],
    onClose: () => {},
    closeIcon: true,
  },
};

const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    showDialog: (state, action: PayloadAction<Omit<DialogBoxData, 'isOpen'>>) => {
      state.dialogBox = {
        ...action.payload,
        isOpen: true,
      };
    },
    hideDialog: (state) => {
      state.dialogBox = {
        ...initialState.dialogBox,
        isOpen: false,
      };
    },
    setDialogButtonLoading: (state, action: PayloadAction<number>) => {
      if (state.dialogBox.buttons[action.payload]) {
        state.dialogBox.buttons[action.payload] = {
          ...state.dialogBox.buttons[action.payload],
          loading: true,
        };
      }
    },
    clearDialogButtonLoading: (state, action: PayloadAction<number>) => {
      if (state.dialogBox.buttons[action.payload]) {
        state.dialogBox.buttons[action.payload] = {
          ...state.dialogBox.buttons[action.payload],
          loading: false,
        };
      }
    },
  },
});

export const { showDialog, hideDialog, setDialogButtonLoading, clearDialogButtonLoading } = utilsSlice.actions;
export default utilsSlice.reducer;
