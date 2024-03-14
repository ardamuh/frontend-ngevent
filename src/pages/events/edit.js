import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/Breadcrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { getData, postData, putData } from "../../utils/fetch";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotif } from "../../redux/notif/actions";
import {
  fetchListCategories,
  fetchListTalents,
  fetchListEvents,
} from "../../redux/lists/actions";
import moment from "moment";

function EventsEdit() {
  // Menggunakan hooks useNavigate dan useParams dari React Router
  const navigate = useNavigate();
  const { eventId } = useParams();
  const dispatch = useDispatch(); // Menggunakan useDispatch untuk dispatch actions
  const lists = useSelector((state) => state.lists); // Menggunakan useSelector untuk mengakses state dari Redux store
  const [form, setForm] = useState({
    // State form untuk menyimpan data form
    title: "",
    date: "",
    file: "",
    avatar: "",
    about: "",
    venueName: "",
    mapEmbedCode: "",
    tagline: "",
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
    statusEvent: "",
  });

  const [alert, setAlert] = useState({
    // State alert untuk menampilkan pesan alert
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false); // State isLoading untuk menunjukkan status loading

  // Mengambil data events dengan ID tertentu ketika komponen dimount
  const fetchOneCategories = async () => {
    const res = await getData(`/cms/events/${eventId}`);

    // Mengatur nilai form dengan data events yang diambil dari server
    setForm({
      ...form,
      title: res.data.data.title,
      date: moment(res.data.data.date).format("YYYY-MM-DDTHH:SS"),
      file: res.data.data.image._id,
      avatar: res.data.data.image.name,
      about: res.data.data.about,
      venueName: res.data.data.venueName,
      mapEmbedCode: res.data.data.mapEmbedCode,
      tagline: res.data.data.tagline,
      keyPoint: res.data.data.keyPoint,
      statusEvent: {
        label: res?.data?.data?.statusEvent,
        target: {
          name: "statusEvent",
          value: res?.data?.data?.statusEvent,
        },
        value: res?.data?.data?.statusEvent,
      },
      category: {
        label: res?.data?.data?.category?.name,
        target: { name: "category", value: res?.data?.data?.category?._id },
        value: res?.data?.data?.category?._id,
      },
      talent: {
        label: res?.data?.data?.talent?.name,
        target: { name: "talent", value: res?.data?.data?.talent?._id },
        value: res?.data?.data?.talent?._id,
      },
      tickets: res.data.data.tickets,
    });
  };

  useEffect(() => {
    fetchOneCategories(); // Memanggil fetchOneCategories saat komponen dimount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mengambil data lists (categories, talents, events) dari Redux store
  useEffect(() => {
    dispatch(fetchListTalents()); // Mengambil daftar talents dari server
    dispatch(fetchListCategories()); // Mengambil daftar categories dari server
    dispatch(fetchListEvents()); // Mengambil daftar events dari server
  }, [dispatch]);

  // Fungsi untuk mengupload gambar
  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/cms/images", formData, true);
    return res;
  };

  // Fungsi untuk menangani perubahan pada form
  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      // Validasi tipe dan ukuran gambar yang diupload
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          // Jika ukuran gambar melebihi 3 MB, tampilkan pesan alert
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          // Jika ukuran gambar valid, upload gambar dan atur nilai form
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        // Jika tipe gambar tidak valid, tampilkan pesan alert
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else if (
      e.target.name === "category" ||
      e.target.name === "talent" ||
      e.target.name === "statusEvent"
    ) {
      // Jika yang diubah adalah category, talent, atau statusEvent, atur nilai form
      setForm({ ...form, [e.target.name]: e });
    } else {
      // Jika yang diubah adalah properti lain pada form, atur nilai form
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async () => {
    setIsLoading(true); // Mengatur isLoading menjadi true saat proses submit dimulai

    // Menyiapkan payload untuk dikirim ke server berisi data form yang akan diubah
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
      statusEvent:
        form.statusEvent.value === "Published" ? "Published" : "Draft", // Mengatur status event berdasarkan nilai dari form.statusEvent
    };

    // Melakukan permintaan PUT untuk mengubah data event dengan ID tertentu
    const res = await putData(`/cms/events/${eventId}`, payload);

    // Memeriksa apakah data berhasil diubah atau tidak
    if (res.data.data) {
      // Jika berhasil, dispatch action untuk menampilkan notifikasi sukses
      dispatch(
        setNotif(true, "success", `berhasil ubah events ${res.data.data.title}`)
      );

      // Redirect ke halaman events setelah berhasil ubah data
      navigate("/events");

      // Mengatur isLoading menjadi false setelah selesai proses submit
      setIsLoading(false);
    } else {
      // Jika gagal, mengatur isLoading menjadi false dan menampilkan pesan error
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  // Function untuk meng-handle perubahan nilai pada key point
  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint]; // Menduplikasi array keyPoint ke _temp

    _temp[i] = e.target.value; // Mengganti nilai pada indeks ke-i dengan nilai baru

    setForm({ ...form, keyPoint: _temp }); // Meng-update state form dengan nilai keyPoint yang baru
  };

  // Function untuk menambahkan key point baru
  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint]; // Menduplikasi array keyPoint ke _temp
    _temp.push(""); // Menambahkan string kosong sebagai key point baru

    setForm({ ...form, keyPoint: _temp }); // Meng-update state form dengan keyPoint yang baru
  };

  // Function untuk menghapus key point berdasarkan index
  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint]; // Menduplikasi array keyPoint ke _temp
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index); // Mencari index dari key point yang akan dihapus

    _temp.splice(removeIndex, 1); // Menghapus key point dari array _temp
    setForm({ ...form, keyPoint: _temp }); // Meng-update state form dengan keyPoint yang baru
  };

  // Function untuk menambahkan ticket baru
  const handlePlusTicket = () => {
    let _temp = [...form.tickets]; // Menduplikasi array tickets ke _temp
    _temp.push({
      // Menambahkan objek ticket baru dengan nilai awal
      type: "",
      status: "",
      stock: "",
      price: "",
    });

    setForm({ ...form, tickets: _temp }); // Meng-update state form dengan tickets yang baru
  };

  // Function untuk menghapus ticket berdasarkan index
  const handleMinusTicket = (index) => {
    let _temp = [...form.tickets]; // Menduplikasi array tickets ke _temp
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index); // Mencari index dari ticket yang akan dihapus

    _temp.splice(removeIndex, 1); // Menghapus ticket dari array _temp
    setForm({ ...form, tickets: _temp }); // Meng-update state form dengan tickets yang baru
  };

  // Function untuk meng-handle perubahan nilai pada sebuah tiket berdasarkan indeks
  const handleChangeTicket = (e, i) => {
    let _temp = [...form.tickets]; // Menduplikasi array tickets ke _temp

    _temp[i][e.target.name] = e.target.value; // Mengganti nilai atribut tiket pada indeks ke-i dengan nilai baru

    setForm({ ...form, tickets: _temp }); // Meng-update state form dengan nilai tickets yang baru
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
        edit
      />
    </Container>
  );
}

export default EventsEdit;
