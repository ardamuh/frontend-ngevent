import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import BreadCrumb from "../../components/Breadcrumb";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrders,
  setPage,
  setDate,
  // setKeyword,
} from "../../redux/orders/actions";
import AlertMessage from "../../components/Alert";
import { fetchListEvents } from "../../redux/lists/actions";
import DateRange from "../../components/InputDate";
import { formatDate } from "../../utils/formatDate";

function OrderPage() {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");

  const notif = useSelector((state) => state.notif);
  const orders = useSelector((state) => state.orders);
  // const events = useSelector((state) => state.events);

  let [isShowed, setIsShowed] = React.useState(false);

  useEffect(() => {
    const limit = 10;
    const page = orders.page || 1;
    dispatch(
      fetchOrders({
        limit,
        page,
        startDate: orders.date?.startDate,
        endDate: orders.date?.endDate,
      })
    );
  }, [dispatch, orders.page, orders.date]);

  useEffect(() => {
    dispatch(fetchListEvents());
  }, [dispatch]);

  const displayDate = `${
    orders.date?.startDate ? formatDate(orders.date?.startDate) : ""
  }${orders.date?.endDate ? " - " + formatDate(orders.date.endDate) : ""}`;

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Fungsi untuk menangani submit pencarian
  const handleSearchSubmit = () => {
    dispatch(
      fetchOrders({
        limit: 10,
        page: 1,
        keyword: searchKeyword,
        // ... (other parameters if necessary)
      })
    );
  };

  return (
    <Container className="mt-3">
      <BreadCrumb textSecound={"orders"} />
      <Row>
        <Col
          className="cursor-pointer position-relative"
          onClick={() => setIsShowed(true)}
        >
          <SearchInput disabled query={displayDate} />
          {isShowed ? (
            <DateRange
              date={orders.date}
              setIsShowed={() => setIsShowed(!isShowed)}
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
            />
          ) : (
            ""
          )}
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      {/*<Row className="mb-4">
        <Col xs={12} md={6}>
          <SearchInput
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder="Search by event title..."
          />
        </Col>
        <Col xs={12} md={6} className="text-right">
          <Button onClick={handleSearchSubmit}>Search</Button>
        </Col>
      </Row>*/}

      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={orders.status}
        thead={[
          "Nama",
          "Email",
          "Judul",
          "Tanggal Event",
          "Tanggal Order",
          "Tempat",
        ]}
        data={orders.data}
        tbody={["name", "email", "title", "date", "orderDate", "venueName"]}
        pages={orders.pages}
        actionNotDisplay
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </Container>
  );
}

export default OrderPage;
