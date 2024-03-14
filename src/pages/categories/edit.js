import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";

function CategoryEdit() {
  const navigate = useNavigate(); // Mendapatkan fungsi navigate dari useNavigate untuk navigasi
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari useDispatch untuk mengirim aksi Redux
  const { categoryId } = useParams(); // Mendapatkan parameter route categoryId menggunakan useParams
  const [form, setForm] = useState({
    // Menginisialisasi state form menggunakan useState
    name: "", // Inisialisasi nilai default name
  });

  const [alert, setAlert] = useState({
    // Menginisialisasi state alert menggunakan useState
    status: false, // Inisialisasi status alert ke false
    type: "", // Inisialisasi jenis alert
    message: "", // Inisialisasi pesan alert
  });

  const [isLoading, setIsLoading] = useState(false); // Menginisialisasi state isLoading menggunakan useState dengan nilai awal false

  const handleChange = (e) => {
    // Fungsi untuk menangani perubahan nilai pada input form
    setForm({ ...form, [e.target.name]: e.target.value }); // Mengubah nilai state form sesuai dengan input pengguna
  };

  const fetchOneCategories = async () => {
    // Fungsi untuk mengambil data kategori tertentu
    const res = await getData(`/cms/categories/${categoryId}`); // Mengambil data kategori dengan ID tertentu menggunakan getData

    setForm({ ...form, name: res.data.data.name }); // Mengatur nilai state form berdasarkan data kategori yang diperoleh
  };

  useEffect(() => {
    // Menggunakan useEffect untuk memanggil fetchOneCategories sekali setelah komponen di-mount
    fetchOneCategories(); // Memanggil fungsi fetchOneCategories
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Menggunakan array kosong sebagai dependensi agar useEffect hanya dijalankan sekali setelah komponen di-mount

  const handleSubmit = async () => {
    // Fungsi untuk menangani pengiriman data kategori yang telah diubah ke backend
    setIsLoading(true); // Mengatur isLoading menjadi true untuk menunjukkan proses pengiriman data sedang berlangsung
    const res = await putData(`/cms/categories/${categoryId}`, form); // Mengirim data kategori yang telah diubah ke backend menggunakan putData

    if (res?.data?.data) {
      // Memeriksa apakah pengiriman data berhasil
      dispatch(
        // Mengirim aksi Redux untuk menampilkan notifikasi ke pengguna
        setNotif(
          true,
          "success",
          `berhasil ubah kategori ${res.data.data.name}`
        )
      );
      navigate("/categories"); // Mengarahkan pengguna kembali ke halaman daftar kategori setelah berhasil mengubah kategori
      setIsLoading(false); // Mengatur isLoading menjadi false setelah proses selesai
    } else {
      // Jika terjadi kesalahan dalam pengiriman data
      setIsLoading(false); // Mengatur isLoading menjadi false
      setAlert({
        // Mengatur nilai state alert untuk menampilkan pesan kesalahan
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container className="mt-3">
      {" "}
      <SBreadCrumb // Menggunakan komponen SBreadCrumb untuk navigasi
        textSecound={"Categories"} // Teks untuk breadcrumb level kedua
        urlSecound={"/categories"} // URL untuk breadcrumb level kedua
        textThird="Edit" // Teks untuk breadcrumb level ketiga
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form // Menggunakan komponen Form untuk mengedit data kategori
        edit // Properti edit digunakan untuk menandakan bahwa ini adalah mode edit
        form={form} // Properti form digunakan untuk menyimpan nilai state form
        isLoading={isLoading} // Properti isLoading digunakan untuk menandakan status proses pengiriman data
        handleChange={handleChange} // Properti handleChange digunakan untuk menangani perubahan nilai pada input form
        handleSubmit={handleSubmit} // Properti handleSubmit digunakan untuk menangani pengiriman data form
      />
    </Container>
  );
}

export default CategoryEdit; // Ekspor komponen CategoryEdit
