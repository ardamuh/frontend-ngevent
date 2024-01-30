import React from "react";
import { Form } from "react-bootstrap";
import SButton from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

export default function OrganizerForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukan Organizers"}
        label={"Organizers"}
        name="organizers"
        value={form.organizers}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan Nama"}
        label={"Nama"}
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan Email"}
        label={"Email"}
        name="email"
        value={form.email}
        type="email"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan Password"}
        label={"Password"}
        name="password"
        value={form.password}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukan Password Konfirmasi"}
        label={"Password Konfirmasi"}
        name="confirmPassword"
        value={form.confirmPassword}
        type="text"
        onChange={handleChange}
      />
      {/* <TextInputWithLabel
        placeholder={'Masukan Role'}
        label={'Role'}
        name='role'
        value={form.role}
        type='text'
        onChange={handleChange}
      /> */}
      <SButton variant="primary" action={handleSubmit} isLoading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </SButton>
    </Form>
  );
}
