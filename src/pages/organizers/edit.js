import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SAlert from "../../components/Alert";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import { useDispatch, useSelector } from "react-redux";
import { setNotif } from "../../redux/notif/actions";
import { fetchListOrganizers } from "../../redux/lists/actions";
import SBreadCrumb from "../../components/Breadcrumb";

function OrganizersEdit() {
  const navigate = useNavigate();
  const { organizerId } = useParams();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    organizers: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneOrganizers = async () => {
    const res = await getData(`/cms/organizers/${organizerId}`);
    console.log(res);
    setForm({
      ...form,
      organizer: form.organizers,
      name: res.data.data.name,
      email: res.data.data.email,
      password: res.data.data.password,
    });
  };

  useEffect(() => {
    fetchOneOrganizers();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchListOrganizers());
  }, [dispatch]);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {
      organizer: form.organizers,
      name: form.name,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    const res = await putData(`/cms/organizers/${organizerId}`, payload);
    console.log(res);
    if (res?.data?.data) {
      dispatch(
        setNotif(true, "success", `Berhasil ubah event ${res.data.data.name}`)
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
        textThird="Edit"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        lists={lists}
        edit
      />
    </Container>
  );
}

export default OrganizersEdit;
