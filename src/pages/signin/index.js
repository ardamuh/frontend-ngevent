import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import SForm from "./form";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";

function PageSignin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const res = await postData(`/cms/auth/signin`, form);

    if (res?.data?.data) {
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role,
          res.data.data.refreshToken
        )
      );
      setIsLoading(false);
      navigate("/");
    } else {
      setIsLoading(false);
      setAlert({
        status: true,
        message: res?.response?.data?.msg ?? "Internal server error",
        type: "danger",
      });
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center align-items-center">
      <Card
        style={{ width: "400px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        className="border-0"
      >
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#007bff" }}
          >
            Sign In
          </Card.Title>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
          <SForm
            form={form}
            handleChange={handleChange}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PageSignin;
