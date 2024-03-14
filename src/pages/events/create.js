import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/Breadcrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { postData } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotif } from "../../redux/notif/actions";
import {
  fetchListCategories,
  fetchListTalents,
  fetchListEvents,
} from "../../redux/lists/actions";

function EventsCreate() {
  const navigate = useNavigate(); // Inisialisasi hook navigate
  const dispatch = useDispatch(); // Inisialisasi hook dispatch untuk mendispatch aksi Redux
  const lists = useSelector((state) => state.lists); // Mengambil state lists dari Redux store
  const [form, setForm] = useState({
    // State form untuk menyimpan data formulir event yang akan dibuat
    title: "",
    price: "",
    date: "",
    file: "",
    avatar: "",
    about: "",
    venueName: "",
    mapEmbedCode: "",
    tagline: "",
    statusEvent: "",
    keyPoint: [""],
    tickets: [
      {
        type: "",
        status: "",
        stock: "",
        price: "",
      },
    ],
    category: "",
    talent: "",
    stock: "",
  });

  const [alert, setAlert] = useState({
    // State alert untuk menampilkan pemberitahuan
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false); // State isLoading untuk menampilkan status loading saat mengirimkan data

  // Mengambil daftar kategori, talent, dan event saat komponen dimuat
  useEffect(() => {
    dispatch(fetchListTalents());
    dispatch(fetchListCategories());
    dispatch(fetchListEvents());
  }, [dispatch]);

  // Fungsi untuk mengunggah gambar ke backend
  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/cms/images", formData, true);
    return res;
  };

  const handleChange = async (e) => {
    // Handle change specifically for the "avatar" input field
    if (e.target.name === "avatar") {
      // Check if the selected file type is supported
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        // Calculate the size of the selected image file
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        // Check if the image size exceeds 2 MB
        if (size > 2) {
          // If the size exceeds the limit, set an alert with a message to the user
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Silakan pilih gambar dengan ukuran kurang dari 3 MB",
          });
          // Clear the file input field and reset form values
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          // If the image size is within the limit, upload the image and update form values
          const res = await uploadImage(e.target.files[0]);
          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        // If the selected file type is not supported, set an alert with a message to the user
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "Jenis gambar harus png | jpg | jpeg",
        });
        // Clear the file input field and reset form values
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    }
    // Handle change for other input fields (e.g., "category", "talent", "statusEvent")
    else if (
      e.target.name === "category" ||
      e.target.name === "talent" ||
      e.target.name === "statusEvent"
    ) {
      // Update form values based on the selected option
      setForm({ ...form, [e.target.name]: e });
    }
    // Handle change for other input fields
    else {
      // Update form values based on the input value
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    // Mengatur isLoading menjadi true untuk menampilkan indikator loading selama proses pengiriman data
    setIsLoading(true);

    // Membuat objek payload yang berisi data yang akan dikirimkan ke backend
    const payload = {
      date: form.date,
      image: form.file,
      title: form.title,
      price: form.price,
      about: form.about,
      venueName: form.venueName,
      mapEmbedCode: form.mapEmbedCode,
      tagline: form.tagline,
      keyPoint: form.keyPoint,
      category: form.category.value,
      talent: form.talent.value,
      status: form.status,
      tickets: form.tickets,
      // Menetapkan statusEvent berdasarkan nilai yang dipilih, baik "Published" atau "Draft"
      statusEvent:
        form.statusEvent.value === "Published" ? "Published" : "Draft",
    };

    // Mengirim permintaan POST ke endpoint "/cms/events" dengan payload yang telah dibuat
    const res = await postData("/cms/events", payload);

    // Memeriksa apakah permintaan berhasil
    if (res.data.data) {
      // Jika berhasil, atur notifikasi berhasil dan navigasikan ke halaman events
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah events ${res.data.data.title}`
        )
      );
      navigate("/events");
      setIsLoading(false); // Mengatur isLoading kembali menjadi false setelah berhasil mengirimkan data
    } else {
      // Jika gagal, atur alert error dengan pesan error yang diterima
      setIsLoading(false); // Mengatur isLoading kembali menjadi false setelah gagal mengirimkan data
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  const handleChangeKeyPoint = (e, i) => {
    // Salin array keyPoint dari state form
    let _temp = [...form.keyPoint];
    // Perbarui nilai pada indeks i dengan nilai baru dari input field
    _temp[i] = e.target.value;
    // Perbarui state form dengan array keyPoint yang telah dimodifikasi
    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    // Salin array keyPoint dari state form
    let _temp = [...form.keyPoint];
    // Tambahkan string kosong ke array keyPoint
    _temp.push("");
    // Perbarui state form dengan array keyPoint yang telah dimodifikasi
    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    // Salin array keyPoint dari state form
    let _temp = [...form.keyPoint];
    // Temukan indeks keyPoint yang akan dihapus
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);
    // Hapus keyPoint pada indeks yang ditentukan
    _temp.splice(removeIndex, 1);
    // Perbarui state form dengan array keyPoint yang telah dimodifikasi
    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusTicket = () => {
    // Salin array tickets dari state form
    let _temp = [...form.tickets];
    // Tambahkan objek baru dengan properti yang kosong ke array tickets
    _temp.push({
      type: "",
      status: "",
      stock: "",
      price: "",
    });
    // Perbarui state form dengan array tickets yang telah dimodifikasi
    setForm({ ...form, tickets: _temp });
  };

  const handleMinusTicket = (index) => {
    // Salin array tickets dari state form
    let _temp = [...form.tickets];
    // Temukan indeks tickets yang akan dihapus
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);
    // Hapus tickets pada indeks yang ditentukan
    _temp.splice(removeIndex, 1);
    // Perbarui state form dengan array tickets yang telah dimodifikasi
    setForm({ ...form, tickets: _temp });
  };

  const handleChangeTicket = (e, i) => {
    // Salin array tickets dari state form
    let _temp = [...form.tickets];
    // Perbarui nilai properti yang sesuai pada objek dengan indeks i
    _temp[i][e.target.name] = e.target.value;
    // Perbarui state form dengan array tickets yang telah dimodifikasi
    setForm({ ...form, tickets: _temp });
  };

  return (
    <Container>
      <BreadCrumb
        textSecound={"Events"}
        urlSecound={"/events"}
        textThird="Create"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
        handlePlusTicket={handlePlusTicket}
        handleMinusTicket={handleMinusTicket}
        handleChangeTicket={handleChangeTicket}
      />
    </Container>
  );
}

export default EventsCreate;
