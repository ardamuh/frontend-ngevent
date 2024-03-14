import { USER_LOGIN, USER_LOGOUT } from "./constants";

// Action creator untuk melakukan login pengguna
export function userLogin(token, role, email, refreshToken) {
  return {
    type: USER_LOGIN,
    token,
    role,
    email,
    refreshToken,
  };
}

// Action creator untuk melakukan logout pengguna
export function userLogout() {
  // Menghapus data autentikasi dari localStorage saat logout
  localStorage.removeItem("auth");
  return {
    type: USER_LOGOUT,
  };
}
