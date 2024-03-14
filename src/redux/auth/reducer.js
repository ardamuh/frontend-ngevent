import { USER_LOGIN, USER_LOGOUT } from "./constants";

// Menginisialisasi state dari localStorage, jika ada
let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { token: null, role: null, email: null, refreshToken: null };

// Reducer untuk mengelola state autentikasi
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      // Jika action type adalah USER_LOGIN, perbarui state dengan data dari action
      return {
        token: action.token,
        role: action.role,
        email: action.email,
        refreshToken: action.refreshToken,
      };

    case USER_LOGOUT:
      // Jika action type adalah USER_LOGOUT, reset state autentikasi ke nilai awal
      return { token: null, role: null, email: null, refreshToken: null };

    default:
      // Jika tidak ada action type yang cocok, kembalikan state yang ada
      return state;
  }
}
