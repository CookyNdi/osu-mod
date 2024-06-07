import { create } from 'zustand';

type preview = {
  previewUrl: string;
  setPreviewUrl: (previewUrl: string) => void;
};

const usePreview = create<preview>((set) => ({
  previewUrl: '',
  setPreviewUrl: (previewUrl: string) => set({ previewUrl: previewUrl }),
}));

export default usePreview;
