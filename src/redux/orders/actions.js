import {
  START_FETCHING_ORDERS,
  SUCCESS_FETCHING_ORDERS,
  ERROR_FETCHING_ORDERS,
  SET_DATE,
  SET_PAGE,
  SET_KEYWORD,
} from "./constants"; // Import tipe-tipe action dari file constants

import { getData } from "../../utils/fetch"; // Import fungsi getData untuk mengambil data dari API
import debounce from "debounce-promise"; // Import fungsi debounce untuk menunda panggilan fungsi
import { clearNotif } from "../notif/actions"; // Import action clearNotif dari modul notifikasi
import moment from "moment"; // Import moment.js untuk manipulasi tanggal

let debouncedFetchOrders = debounce(getData, 1000); // Membuat fungsi debouncedFetchOrders untuk menunda panggilan fungsi getData selama 1000ms

// Action creator untuk memulai proses pengambilan daftar pesanan
export const startFetchingOrders = () => {
  return {
    type: START_FETCHING_ORDERS,
  };
};

// Action creator untuk menangani ketika pengambilan daftar pesanan berhasil
export const successFetchingOrders = ({ orders, pages }) => {
  return {
    type: SUCCESS_FETCHING_ORDERS,
    orders,
    pages,
  };
};

// Action creator untuk menangani ketika terjadi kesalahan saat pengambilan daftar pesanan
export const errorFetchingOrders = () => {
  return {
    type: ERROR_FETCHING_ORDERS,
  };
};

// Action creator untuk melakukan pengambilan daftar pesanan dari server
export const fetchOrders = ({ keyword, ...restParams }) => {
  return async (dispatch, getState) => {
    dispatch(startFetchingOrders()); // Menjalankan action startFetchingOrders untuk menandai bahwa pengambilan data dimulai

    try {
      setTimeout(() => {
        dispatch(clearNotif()); // Memberi jeda 5 detik untuk membersihkan notifikasi
      }, 5000);

      // Menyiapkan parameter untuk permintaan daftar pesanan
      let params = {
        page: getState().orders?.page || 1, // Mendapatkan nomor halaman dari state
        limit: getState().orders?.limit || 10, // Mendapatkan batas item per halaman dari state
        startDate: moment(getState().orders?.date?.startDate).format(
          "YYYY-MM-DD"
        ), // Mendapatkan tanggal mulai dari rentang tanggal yang dipilih
        endDate: moment(getState().orders?.date?.endDate).format("YYYY-MM-DD"), // Mendapatkan tanggal akhir dari rentang tanggal yang dipilih
        ...restParams, // Menambahkan parameter tambahan yang diberikan secara langsung
      };

      // Jika ada kata kunci pencarian, tambahkan parameter 'title' dengan nilai kata kunci
      if (keyword && keyword.trim() !== "") {
        params = { ...params, title: keyword }; // Ganti 'title' dengan nama parameter yang sesuai di API Anda
      }

      // Melakukan permintaan daftar pesanan dengan menggunakan fungsi debouncedFetchOrders
      let res = await debouncedFetchOrders("/cms/orders", params);

      // Mengubah struktur data response untuk disesuaikan dengan kebutuhan aplikasi
      const _temp = [];
      res.data.data.order.forEach((res) => {
        _temp.push({
          name: `${res.personalDetail.firstName} ${res.personalDetail.lastName}`, // Menggabungkan nama depan dan nama belakang
          email: res.personalDetail.email,
          title: res.historyEvent.title,
          date: res.historyEvent.date,
          orderDate: moment(res.date).format("DD-MM-YYYY, h:mm:ss a"), // Mengubah format tanggal pesanan
          venueName: res.historyEvent.venueName,
        });
      });

      // Menjalankan action successFetchingOrders dengan menyertakan data pesanan yang berhasil diambil
      dispatch(
        successFetchingOrders({
          orders: _temp, // Data pesanan yang telah diubah strukturnya
          pages: res.data.data.pages, // Jumlah halaman total
        })
      );
    } catch (error) {
      // Menjalankan action errorFetchingOrders jika terjadi kesalahan saat pengambilan data pesanan
      dispatch(errorFetchingOrders());
    }
  };
};

// Action creator untuk mengatur halaman saat ini dari daftar pesanan
export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

// Action creator untuk mengatur rentang tanggal untuk pencarian daftar pesanan
export const setDate = (ranges) => {
  return {
    type: SET_DATE,
    ranges,
  };
};

// Action creator untuk mengatur kata kunci pencarian daftar pesanan
export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};
