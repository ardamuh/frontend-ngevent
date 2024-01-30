import React, { useState } from "react";
import { Container } from "react-bootstrap";
import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import Form from "./form";
import { postData } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";

function OrganizersCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    organizers: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "organizer",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);

    const payload = {
      organizer: form.organizers,
      name: form.name,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      role: "organizer",
    };

    const res = await postData("/cms/organizers", payload);

    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil menambahkan organizers ${res.data.data.name}`
        )
      );
      navigate("/organizers");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadCrumb
        textSecond={"Organizers"}
        urlSecond={"/Organizers"}
        textThird="Create"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default OrganizersCreate;
