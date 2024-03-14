import axios from "axios";
import handleError from "./handleError";
import { config } from "../configs";

// function mengambil data dari server
export async function getData(url, params) {
  try {
    // Mendapatkan token dari local storage jika tersedia
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    // Menggunakan axios untuk melakukan HTTP GET request ke URL yang ditentukan
    return await axios.get(`${config.api_host_dev}${url}`, {
      params, // Parameter opsional yang bisa digunakan untuk query string
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header untuk otentikasi
      },
    });
  } catch (err) {
    // handling error
    return handleError(err);
  }
}

// Fungsi untuk mengirim data ke server dengan method POST
export async function postData(url, payload, formData) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    // Menggunakan axios untuk melakukan HTTP POST request ke URL yang ditentukan
    return await axios.post(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // Menambahkan token ke header untuk otentikasi
        "Content-Type": formData ? "multipart/form-data" : "application/json", //Menentukan tipe konten berdasarkan apakah payload berupa form data atau JSON
      },
    });
  } catch (err) {
    return handleError(err);
  }
}

// Function mengirim data ke server dengan method PUT
export async function putData(url, payload) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.put(`${config.api_host_dev}${url}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    return handleError(err);
  }
}

// Function menghapus data dari server
export async function deleteData(url) {
  try {
    const { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    return await axios.delete(`${config.api_host_dev}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    return handleError(err);
  }
}
