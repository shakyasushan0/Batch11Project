import { Table, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from "../../slices/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { Link } from "react-router";

function ProductListPage() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [addProduct, { isLoading: productLoading }] = useAddProductMutation();
  const [deleteProduct, {}] = useDeleteProductMutation();
  const addProductHandler = async () => {
    try {
      await addProduct().unwrap();
      toast.success("Product created!");
    } catch (err) {
      toast.error(err?.data?.error || err?.error);
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const resp = await deleteProduct(id).unwrap();
        toast.success(resp.message);
      } catch (err) {
        toast.error(err?.data?.error || err?.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button variant="dark" size="sm" onClick={addProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.error}</Message>
      ) : (
        <Table hover striped responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link
                    className="btn btn-light btn-sm"
                    to={`/admin/product/${product._id}/edit`}
                  >
                    <FaEdit />
                  </Link>
                  <Button
                    variant="light"
                    size="sm"
                    className="ms-2"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <FaTrash style={{ color: "red" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductListPage;
