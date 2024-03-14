import {
  START_FETCHING_EVENTS,
  SUCCESS_FETCHING_EVENTS,
  ERROR_FETCHING_EVENTS,
  SET_KEYWORD,
  SET_CATEGORY,
  SET_TALENT,
} from "./constants"; // Mengimpor jenis action dari file constants

import { getData } from "../../utils/fetch"; // Mengimpor fungsi getData untuk mengambil data dari API
import debounce from "debounce-promise"; // Mengimpor fungsi debounce untuk menunda panggilan fungsi
import { clearNotif } from "../notif/actions"; // Mengimpor action clearNotif dari modul notifikasi

// Membuat fungsi debouncedFetchEvents yang akan menunda panggilan fungsi getData selama 1000ms
let debouncedFetchEvents = debounce(getData, 1000);

// Action creator untuk memulai proses pengambilan data event
export const startFetchingEvents = () => {
  return {
    type: START_FETCHING_EVENTS,
  };
};

// Action creator untuk menangani ketika pengambilan data event berhasil
export const successFetchingEvents = ({ events }) => {
  return {
    type: SUCCESS_FETCHING_EVENTS,
    events,
  };
};

// Action creator untuk menangani ketika terjadi kesalahan saat pengambilan data event
export const errorFetchingEvents = () => {
  return {
    type: ERROR_FETCHING_EVENTS,
  };
};

// Action creator untuk melakukan pengambilan data event dari server
export const fetchEvents = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingEvents()); // Menjalankan action startFetchingEvents untuk menandai bahwa pengambilan data dimulai

    try {
      setTimeout(() => {
        dispatch(clearNotif()); // Memberi jeda 5 detik untuk membersihkan notifikasi
      }, 5000);

      // Menyiapkan parameter untuk permintaan data event
      let params = {
        keyword: getState().events.keyword,
        category: getState().events?.category?.value || "", // Mendapatkan nilai kategori dari state
        talent: getState().events?.talent?.value || "", // Mendapatkan nilai talent dari state
      };

      // Melakukan permintaan data event dengan menggunakan fungsi debouncedFetchEvents
      let res = await debouncedFetchEvents("/cms/events", params);

      // Mengubah struktur data response dengan menambahkan fieldName
      res.data.data.forEach((res) => {
        res.categoryName = res?.category?.name ?? ""; // Menambahkan fieldName categoryName ke setiap event
        res.talentName = res?.talent?.name ?? "-"; // Menambahkan fieldName talentName ke setiap event
      });

      // Menjalankan action successFetchingEvents dengan menyertakan data event yang berhasil diambil
      dispatch(
        successFetchingEvents({
          events: res.data.data,
        })
      );
    } catch (error) {
      // Menjalankan action errorFetchingEvents jika terjadi kesalahan saat pengambilan data event
      dispatch(errorFetchingEvents());
    }
  };
};

// Action creator untuk mengatur kata kunci pencarian event
export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

// Action creator untuk mengatur kategori event yang dipilih
export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  };
};

// Action creator untuk mengatur talent event yang dipilih
export const setTalent = (talent) => {
  return {
    type: SET_TALENT,
    talent,
  };
};
