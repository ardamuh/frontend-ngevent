import {
  START_FETCHING_TALENTS,
  SUCCESS_FETCHING_TALENTS,
  ERROR_FETCHING_TALENTS,
  SET_KEYWORD,
} from "./constants"; // Import tipe-tipe action dari file constants

import { getData } from "../../utils/fetch"; // Import fungsi getData untuk mengambil data dari API
import debounce from "debounce-promise"; // Import fungsi debounce untuk menunda panggilan fungsi
import { clearNotif } from "../notif/actions"; // Import action clearNotif dari modul notifikasi

let debouncedFetchTalents = debounce(getData, 1000); // Membuat fungsi debouncedFetchTalents untuk menunda panggilan fungsi getData selama 1000ms

// Action creator untuk memulai proses pengambilan data bakat
export const startFetchingTalents = () => {
  return {
    type: START_FETCHING_TALENTS,
  };
};

// Action creator untuk menangani ketika pengambilan data bakat berhasil
export const successFetchingTalents = ({ talents }) => {
  return {
    type: SUCCESS_FETCHING_TALENTS,
    talents,
  };
};

// Action creator untuk menangani ketika terjadi kesalahan saat pengambilan data bakat
export const errorFetchingTalents = () => {
  return {
    type: ERROR_FETCHING_TALENTS,
  };
};

// Action creator untuk melakukan pengambilan data bakat dari server
export const fetchTalents = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingTalents()); // Menjalankan action startFetchingTalents untuk menandai bahwa pengambilan data dimulai

    try {
      setTimeout(() => {
        dispatch(clearNotif()); // Memberi jeda 5 detik untuk membersihkan notifikasi
      }, 5000);

      // Menyiapkan parameter untuk permintaan data bakat
      let params = {
        keyword: getState().talents.keyword, // Mendapatkan kata kunci pencarian dari state
      };

      // Melakukan permintaan data bakat dengan menggunakan fungsi debouncedFetchTalents
      let res = await debouncedFetchTalents("/cms/talents", params);

      // Mengubah struktur data response untuk disesuaikan dengan kebutuhan aplikasi
      res.data.data.forEach((res) => {
        res.avatar = res.image.name; // Menambahkan properti avatar dengan nilai nama gambar dari properti image
      });

      // Menjalankan action successFetchingTalents dengan menyertakan data bakat yang berhasil diambil
      dispatch(
        successFetchingTalents({
          talents: res.data.data, // Data bakat yang telah diubah strukturnya
        })
      );
    } catch (error) {
      // Menjalankan action errorFetchingTalents jika terjadi kesalahan saat pengambilan data bakat
      dispatch(errorFetchingTalents());
    }
  };
};

// Action creator untuk mengatur kata kunci pencarian bakat
export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};
