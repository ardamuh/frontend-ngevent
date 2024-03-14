import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
} from "./constants";

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";

// Buat funciton debounce untuk mendebounc-kan fungsi getData
let debouncedFetchCategories = debounce(getData, 1000);

// START
// Action creator untuk memulai pengambilan kategori
export const startFetchingCategories = () => {
  return {
    type: START_FETCHING_CATEGORIES,
  };
};

// SUCCESS
// Action creator untuk menangani berhasilnya pengambilan kategori
export const successFetchingCategories = ({ categories }) => {
  return {
    type: SUCCESS_FETCHING_CATEGORIES,
    categories,
  };
};

// Action creator untuk menangani kesalahan saat pengambilan kategori
export const errorFetchingCategories = () => {
  return {
    type: ERROR_FETCHING_CATEGORIES,
  };
};

// Function untuk mengambil kategori dari server
export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(startFetchingCategories()); // Mengirimkan action untuk memulai pengambilan kategori

    try {
      setTimeout(() => {
        dispatch(clearNotif()); // Setelah 3 detik, mengirimkan action untuk membersihkan notifikasi
      }, 3000);

      let res = await debouncedFetchCategories("/cms/categories"); // Mengambil kategori dari server dengan menggunakan fungsi debounce

      dispatch(
        successFetchingCategories({
          categories: res.data.data, // Mengirimkan action untuk menangani berhasilnya pengambilan kategori bersama dengan data kategori yang diperoleh
        })
      );
    } catch (error) {
      dispatch(errorFetchingCategories()); // Mengirimkan action untuk menangani kesalahan saat pengambilan kategori
    }
  };
};
