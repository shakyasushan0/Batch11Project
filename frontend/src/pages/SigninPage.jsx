import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router";
import { useLoginMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import Loader from "../components/Loader";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const resp = await login({ email, password }).unwrap();
      dispatch(setCredentials(resp.user));
    } catch (err) {
      toast.error(err?.data?.error);
    }
  };

  return (
    <FormContainer>
      <h2>SignIn</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>
          Signin
        </Button>
        {isLoading && <Loader />}
      </Form>
      <div className="my-3">
        <Link>New Customer? Register</Link>
      </div>
    </FormContainer>
  );
}

export default SigninPage;
