import store from "./store";

let currentAuth; // Variabel untuk menyimpan informasi otentikasi saat ini

// Fungsi listener untuk memantau perubahan pada state otentikasi
function listener() {
  let previousAuth = currentAuth; // Simpan informasi otentikasi sebelumnya

  currentAuth = store.getState().auth; // Dapatkan informasi otentikasi saat ini dari state aplikasi

  // Periksa apakah informasi otentikasi saat ini berbeda dengan sebelumnya
  if (currentAuth !== previousAuth) {
    // Jika ada perubahan, simpan informasi otentikasi saat ini ke localStorage
    localStorage.setItem("auth", JSON.stringify(currentAuth)); // Simpan informasi otentikasi dalam bentuk string JSON di localStorage
  }
}

// Fungsi listen untuk menambahkan listener pada store untuk memantau perubahan state
function listen() {
  store.subscribe(listener); // Tambahkan listener yang akan dipanggil setiap kali terjadi perubahan pada state otentikasi
}

export { listen }; // Ekspor fungsi listen agar dapat digunakan di tempat lain dalam aplikasi
