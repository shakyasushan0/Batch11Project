import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productApiSlice";

function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <Container>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message>{error?.data?.message}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default HomePage;
