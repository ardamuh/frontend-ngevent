import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
} from "./constants";

// Objek statuslist digunakan untuk menggambarkan status proses fetching kategori
const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

// Initial state untuk reducer ini
const initialState = {
  data: [],
  status: statuslist.idle,
};

// Reducer untuk mengatur state terkait kategori
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_CATEGORIES:
      // Ketika memulai pengambilan kategori, status diubah menjadi proses
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_CATEGORIES:
      // Jika terjadi kesalahan saat pengambilan kategori, status diubah menjadi error
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_CATEGORIES:
      // Jika pengambilan kategori berhasil, data kategori diupdate dan status diubah menjadi success
      return {
        ...state,
        status: statuslist.success,
        data: action.categories, // Data kategori diset dengan data yang diterima dari action
      };

    default:
      // Jika tidak ada action yang cocok, kembalikan state yang sama
      return state;
  }
}
