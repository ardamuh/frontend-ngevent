import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SBreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/categories/actions";
import SAlert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import { accessCategories } from "../../const/access";

// Komponen Categories
function Categories() {
  const navigate = useNavigate(); // Inisialisasi hook navigate
  const dispatch = useDispatch(); // Inisialisasi hook dispatch untuk mendispatch aksi Redux

  const notif = useSelector((state) => state.notif); // Mengambil state notifikasi dari Redux store
  const categories = useSelector((state) => state.categories); // Mengambil state kategori dari Redux store
  const [access, setAccess] = useState({
    // State access untuk mengatur hak akses pengguna
    tambah: false,
    hapus: false,
    edit: false,
  });

  // Fungsi untuk memeriksa hak akses pengguna
  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {}; // Mengambil role pengguna dari localStorage
    const access = { tambah: false, hapus: false, edit: false }; // Inisialisasi hak akses
    Object.keys(accessCategories).forEach(function (key, index) {
      // Looping untuk setiap kategori akses
      if (accessCategories[key].indexOf(role) >= 0) {
        // Jika role pengguna memiliki akses
        access[key] = true; // Mengatur hak akses sesuai kategori
      }
    });
    setAccess(access); // Mengatur state access
  };

  useEffect(() => {
    checkAccess(); // Memeriksa hak akses pengguna saat komponen dimuat
  }, []);

  useEffect(() => {
    dispatch(fetchCategories()); // Mengambil data kategori saat komponen dimuat
  }, [dispatch]);

  // Fungsi untuk menghapus kategori
  const handleDelete = (id) => {
    Swal.fire({
      // Menampilkan konfirmasi SweetAlert2
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengkonfirmasi penghapusan
        const res = await deleteData(`/cms/categories/${id}`); // Menghapus kategori dari backend
        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus kategori ${res.data.data.name}`
          )
        ); // Menetapkan notifikasi sukses
        dispatch(fetchCategories()); // Mengambil kembali data kategori dari Redux store
      }
    });
  };

  return (
    <Container className="mt-3">
      {" "}
      {/* Container untuk layout */}
      <SBreadCrumb textSecound={"Categories"} /> {/* Tampilan breadcrumb */}
      {access.tambah && ( // Menampilkan tombol tambah kategori jika pengguna memiliki hak akses
        <Button
          className={"mb-3"}
          action={() => navigate("/categories/create")}
        >
          Tambah
        </Button>
      )}
      {notif.status && ( // Menampilkan notifikasi jika ada notifikasi yang tersedia
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table // Komponen Table untuk menampilkan data kategori dalam tabel
        status={categories.status} // Status pengambilan data kategori
        thead={["Nama", "Aksi"]} // Header tabel
        data={categories.data} // Data kategori
        tbody={["name"]} // Data yang ditampilkan dalam kolom tbody
        editUrl={access.edit ? `/categories/edit` : null} // URL untuk mengedit kategori jika pengguna memiliki hak akses
        deleteAction={access.hapus ? (id) => handleDelete(id) : null} // Aksi penghapusan kategori jika pengguna memiliki hak akses
        withoutPagination // Menampilkan tabel tanpa pengaturan paginasi
      />
    </Container>
  );
}

export default Categories; // Eksport komponen Categories
