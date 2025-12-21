import { useState, useEffect } from "react";
import { Row, Col, Table, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateProfile, { isLoading: profileLoading }] =
    useUpdateProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  console.log(orders);
  console.log(error);
  const dispatch = useDispatch();
  useEffect(() => {
    setFullname(userInfo.fullname);
    setEmail(userInfo.email);
  }, [userInfo.fullname, userInfo.email]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      if (password != confirmPassword) {
        toast.error("Password not matched");
        return;
      }
      let resp = await updateProfile({
        fullname,
        email,
        password,
      }).unwrap();
      toast.success(resp.message);
      dispatch(setCredentials({ ...userInfo, ...resp.user }));
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <h2>Profile</h2>
          <Form onSubmit={updateProfileHandler}>
            <Form.Group controlId="fullname">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="my-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="dark">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>Orders</h2>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>CREATED AT</th>
                <th>PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link
                      className="btn btn-dark btn-sm"
                      to={`/order/${order._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export default ProfilePage;
