import { create } from "zustand";
import { IUser } from "../lib/types";

type Store = {
  authUser: IUser | null;
  uploadingImage: boolean;
  pageLoading: boolean;
  setAuthUser: (user: IUser) => void;
  setUploadingImage: (isUploading: boolean) => void;
  setPageLoading: (isLoading: boolean) => void;
};

const useStore = create<Store>((set:any) => ({
  authUser: null,
  uploadingImage: false,
  pageLoading: false,
  setAuthUser: (user:any) => set((state:any) => ({ ...state, authUser: user })),
  setUploadingImage: (isUploading:any) =>
    set((state:any) => ({ ...state, uploadingImage: isUploading })),
  setPageLoading: (isLoading:any) =>
    set((state:any) => ({ ...state, pageLoading: isLoading })),
}));

export default useStore;
