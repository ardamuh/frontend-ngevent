import React from "react";
import { Form } from "react-bootstrap";
import SButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

// Deklarasi komponen CategoriesForm dengan menerima properti handleSubmit, form, handleChange, isLoading, dan edit
export default function CategoriesForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel // Komponen TextInputWithLabel untuk input nama kategori
        placeholder={"Masukan nama kategori"} // Placeholder untuk input
        label={"Nama kategori"} // Label untuk input
        name="name" // Nama input
        value={form.name} // Nilai input
        type="text" // Tipe input
        onChange={handleChange} // Fungsi yang dipanggil saat nilai input berubah
      />
      <SButton variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? "Ubah" : "Simpan"}{" "}
        {/* Teks tombol, 'Ubah' jika mode edit aktif, 'Simpan' jika mode tambah kategori */}
      </SButton>
    </Form>
  );
}
