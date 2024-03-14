import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import Form from "./form";
import { postData } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";

function CategoryCreate() {
  const navigate = useNavigate(); // Gunakan hook useNavigate untuk mendapatkan fungsi navigasi
  const dispatch = useDispatch(); // Gunakan hook useDispatch untuk mendapatkan fungsi dispatch Redux
  const [form, setForm] = useState({
    // State lokal untuk menyimpan nilai form
    name: "", // Inisialisasi nilai name dengan string kosong
  });

  const [alert, setAlert] = useState({
    // State lokal untuk menampilkan pesan alert
    status: false, // Status alert (true jika ada pesan, false jika tidak)
    type: "", // Jenis alert (contoh: 'success', 'info', 'warning', 'danger')
    message: "", // Isi pesan alert
  });

  const [isLoading, setIsLoading] = useState(false); // State lokal untuk menunjukkan status loading

  // Fungsi untuk menangani perubahan nilai pada input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // Ubah nilai form sesuai input pengguna
  };

  // Fungsi untuk menangani pengiriman data form ke backend saat tombol submit ditekan
  const handleSubmit = async () => {
    setIsLoading(true); // Set isLoading menjadi true saat proses pengiriman data dimulai
    const res = await postData("/cms/categories", form); // Kirim data form ke backend melalui postData

    if (res?.data?.data) {
      // Jika data berhasil disimpan di backend
      dispatch(
        // Dispatch aksi Redux untuk menampilkan notifikasi
        setNotif(
          true, // Set status notifikasi menjadi true
          "success", // Set jenis notifikasi menjadi 'success'
          `berhasil tambah kategori ${res.data.data.name}` // Isi pesan notifikasi
        )
      );
      navigate("/categories"); // Arahkan pengguna kembali ke halaman kategori
      setIsLoading(false); // Set isLoading menjadi false setelah proses selesai
    } else {
      // Jika terjadi kesalahan saat menyimpan data di backend
      setIsLoading(false); // Set isLoading menjadi false
      setAlert({
        // Tampilkan pesan alert dengan informasi kesalahan
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg, // Ambil pesan kesalahan dari respons server
      });
    }
  };

  // Render tampilan komponen CategoryCreate
  return (
    <Container>
      {" "}
      {/* Container untuk mengatur layout komponen */}
      <SBreadCrumb // Komponen SBreadCrumb untuk menampilkan breadcrumb
        textSecound={"Categories"} // Teks untuk breadcrumb kedua
        urlSecound={"/categories"} // URL untuk breadcrumb kedua
        textThird="Create" // Teks untuk breadcrumb ketiga
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}{" "}
      {/* Tampilkan SAlert jika alert.status true */}
      {/* Render komponen Form dengan props yang diperlukan */}
      <Form
        form={form} // Props form untuk menyimpan nilai form
        isLoading={isLoading} // Props isLoading untuk menunjukkan status loading
        handleChange={handleChange} // Props handleChange untuk menangani perubahan nilai pada input form
        handleSubmit={handleSubmit} // Props handleSubmit untuk menangani pengiriman data form ke backend
      />
    </Container>
  );
}

export default CategoryCreate; // Ekspor komponen CategoryCreate
