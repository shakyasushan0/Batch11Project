import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    fetch("/api/products")
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => setErr(err.message));
  }, []);
  return (
    <Container>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Spinner />
      ) : err ? (
        <Message>{err}</Message>
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
