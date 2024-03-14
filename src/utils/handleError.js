import axios from "axios";
import { config } from "../configs";

// Function menangani respons error dari request API
const handleError = (error) => {
  // Simpan request asli untuk mencoba kembali setelah memperbarui token JWT
  const originalRequest = error.config;
  // Jika respons error menunjukkan bahwa token JWT telah kedaluwarsa
  if (error.response.data.msg === "jwt expired") {
    // Tandai request asli untuk dicoba kembali
    originalRequest._retry = true;
    // Ambil informasi sesi dari localStorage
    const session = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    // Kirim request ke server untuk memperbarui token JWT
    return axios
      .get(`${config.api_host_dev}/cms/refresh-token/${session.refreshToken}`)
      .then((res) => {
        console.log("res");
        console.log(res);
        // Update sesi dengan token baru yang diterima dari server
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...session,
            token: res.data.data.token,
          })
        );
        // Update header Authorization permintaan asli dengan token baru
        originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`;

        console.log("originalRequest");
        console.log(originalRequest);

        // Coba kembali permintaan asli dengan token yang diperbarui
        return axios(originalRequest);
      })
      .catch((err) => {
        // Jika pembaruan token gagal, arahkan user ke halaman login dan hapus sesi
        window.location.href = "/login";
        localStorage.removeItem("auth");
      });
  }

  // Jika error tidak terkait dengan kedaluwarsa JWT, cukup kembalikan error
  return error;
};

export default handleError;
