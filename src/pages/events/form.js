import React from "react";
import {
  CloseButton,
  Col,
  Figure,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import Button from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import SelectBox from "../../components/SelectBox";
import { config } from "../../configs";

export default function EventsForm({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
  lists,
  handlePlusKeyPoint,
  handleChangeKeyPoint,
  handleMinusKeyPoint,
  handlePlusTicket,
  handleMinusTicket,
  handleChangeTicket,
}) {
  const statusEvent = [
    {
      value: "Published",
      label: "Published",
      name: "statusEvent",
      target: { value: "Published", name: "statusEvent" },
    },
    {
      value: "Draft",
      label: "Draft",
      name: "statusEvent",
      target: { value: "Draft", name: "statusEvent" },
    },
  ];
  return (
    <Form className="mb-2">
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={"Masukan judul"}
            label={"Judul"}
            name="title"
            value={form.title}
            type="text"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={"Masukan tagline"}
            label={"Tagline"}
            name="tagline"
            value={form.tagline}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={"Masukan tanggal acara"}
            label={"Tanggal"}
            name="date"
            value={form.date}
            type="datetime-local"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <SelectBox
            label={"Category"}
            placeholder={"Masukan kategori"}
            name="category"
            value={form.category}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInputWithLabel
            placeholder={"Masukan about"}
            label={"About"}
            name="about"
            value={form.about}
            type="text"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={"Masukan tempat acara"}
            label={"Tempat acara"}
            name="venueName"
            value={form.venueName}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Row} controlId="formMapEmbedCode">
          <Form.Label column sm={2}>
            Google Maps Embed Code
          </Form.Label>
          <Row>
            <Col sm={60}>
              <FormControl
                as="textarea"
                rows={3}
                name="mapEmbedCode"
                value={form.mapEmbedCode || ""} // ensure the value is controlled
                onChange={handleChange}
                placeholder="Paste your Google Maps embed code here"
              />
            </Col>
          </Row>
        </Form.Group>
      </Row>
      <Form.Label>Key Point</Form.Label> {/* Label untuk komponen key point */}
      <Row>
        {/* Mapping melalui setiap elemen dalam array keyPoint */}
        {form.keyPoint.map((key, index) => (
          <Col sm={6}>
            {/* Setiap key point direpresentasikan dalam sebuah input field */}
            <InputGroup className="mb-3" key={index}>
              <FormControl
                placeholder="Masukan keypoint" // Placeholder untuk input key point
                value={key} // Nilai input key point
                type="text" // Tipe input sebagai teks
                name="key" // Nama input
                onChange={(e) => {
                  handleChangeKeyPoint(e, index); // Memanggil fungsi handleChangeKeyPoint saat terjadi perubahan
                }}
              />
              {/* Tombol untuk menghapus key point hanya muncul jika index tidak sama dengan 0 */}
              {index !== 0 && (
                <InputGroup.Text id="basic-addon2">
                  <CloseButton onClick={() => handleMinusKeyPoint(index)} />{" "}
                  {/* Tombol untuk menghapus key point */}
                </InputGroup.Text>
              )}
            </InputGroup>
          </Col>
        ))}
      </Row>
      <Button
        className="mb-3"
        variant="success"
        action={handlePlusKeyPoint}
        size="sm"
      >
        Tambah keypoint
      </Button>
      <Row>
        <Col>
          <SelectBox
            label={"Talent"}
            placeholder={"Masukan talent"}
            name="talent"
            value={form.talent}
            options={lists.talents}
            isClearable={true}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
        <Col>
          <TextInputWithLabel
            placeholder={"Masukan Avatar"}
            label={"Cover"}
            name="avatar"
            // value={form.avatar}
            type="file"
            onChange={handleChange}
          />
          {form.avatar !== "" && (
            <div>
              <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src={`${config.api_image}/${form.avatar}`}
                />

                <Figure.Caption>Perview image cover</Figure.Caption>
              </Figure>
            </div>
          )}
        </Col>
      </Row>
      <Form.Label>Tiket</Form.Label>
      {form.tickets.map((tic, index) => (
        <Row>
          <Col sm={6}>
            <TextInputWithLabel
              placeholder={"Masukan tipe tiket"}
              label={"Tipe"}
              name="type"
              value={tic.type}
              type="text"
              onChange={(e) => handleChangeTicket(e, index)}
            />
          </Col>
          <Col sm={6}>
            <TextInputWithLabel
              placeholder={"Masukan Harga"}
              label={"Harga"}
              name="price"
              value={tic.price}
              type="number"
              onChange={(e) => handleChangeTicket(e, index)}
            />
          </Col>
          <Col sm={6}>
            <TextInputWithLabel
              placeholder={"Masukan jumlah tiket"}
              label={"Stock"}
              name="stock"
              value={tic.stock}
              type="number"
              onChange={(e) => handleChangeTicket(e, index)}
            />
          </Col>
          <Col sm={index !== 0 ? 5 : 6}>
            <SelectBox
              label={"Status Ticket"}
              placeholder={"Masukan Status Ticket"}
              value={lists.statusEvent}
              options={statusEvent}
              isClearable={true}
              handleChange={(e) => handleChange(e)}
            />
          </Col>
          {index !== 0 && (
            <Col
              sm={1}
              className="d-flex justify-content-end align-items-center"
            >
              <CloseButton onClick={() => handleMinusTicket(index)} />
            </Col>
          )}
        </Row>
      ))}
      <div className="mb-3">
        <Button variant="success" action={handlePlusTicket} size="sm">
          Tambah Ticket
        </Button>
      </div>
      <Button variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </Button>
    </Form>
  );
}
