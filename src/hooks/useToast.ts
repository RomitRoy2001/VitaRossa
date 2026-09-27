// src/hooks/useToast.ts
import { useAppDispatch } from './useAppDispatch';
import { addToast, removeToast } from '../store/slices/uiSlice';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export const useToast = () => {
  const dispatch = useAppDispatch();

  const show = (type: ToastType, title: string, message?: string, duration = 4000) => {
    dispatch(addToast({ type, title, message, duration }));
  };

  const success = (title: string, message?: string) => show('success', title, message);
  const error = (title: string, message?: string) => show('error', title, message, 6000);
  const warning = (title: string, message?: string) => show('warning', title, message);
  const info = (title: string, message?: string) => show('info', title, message);
  const dismiss = (id: string) => dispatch(removeToast(id));

  return { show, success, error, warning, info, dismiss };
};
