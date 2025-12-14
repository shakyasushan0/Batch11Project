import React, { useState, useEffect } from "react";
import CheckoutStep from "../components/CheckoutStep";
import FormContainer from "../components/FormContainer";
import { Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useNavigate } from "react-router";

function PaymentPage() {
  const { paymentMethod: savedPaymentMethod, shippingAddress } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress]);
  const [paymentMethod, setPaymentMethod] = useState(
    savedPaymentMethod || "cod"
  );
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <>
      <FormContainer>
        <CheckoutStep step1 step2 step3 />
        <h2>Payment Method</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="Cash on Delivery"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod == "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="E-Sewa"
                id="esewa"
                name="paymentMethod"
                value="esewa"
                checked={paymentMethod == "esewa"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button type="submit" variant="dark" className="my-2">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default PaymentPage;
