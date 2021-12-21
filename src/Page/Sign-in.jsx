import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../component/context/auth";
import Card from "../component/Card";
import axios from "axios";
import GoogleLogin from "react-google-login";
import "./Sign-in.css";

const clientId = "Your-Client-Id";

const SignIn = (props) => {
  const [form] = Form.useForm();
  const [errorModule, setErrorModule] = useState();
  const [showLogInButton, setShowLogInButton] = useState(true);
  const { setAuthTokens } = useAuth();
  let history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
  };
  let token = localStorage.getItem("tokens");

  if (token) {
    history.push("/");
  }

  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.profileObj);
    setShowLogInButton(false);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    form.resetFields();

    axios
      .post("http://localhost:3030/signin/users", {
        values,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("token:", response.data.token);
          setAuthTokens(response.data.token);
          history.push("/");
        } else {
          throw new Error(
            "you did not regestere before , please go to sign up page ."
          );
        }
        //   if (!response.data.ok) {
        // throw new Error(
        //   "you did not regestere before , please go to sign up page ."
        // );
        // }
      })
      .catch((err) => {
        setErrorModule({
          title: "Error",
          message: err.message,
        });
        console.log(err.message);
      });
  };

  useEffect(() => {
    props.ErrorHandler(errorModule);
  }, [errorModule]);

 

  return (
    <div className="parent">
      <Card className="Card">
        <h1>Blog</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          form={form}
          onFinish={onFinish}
          onSubmit={submitHandler}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <div className="orLine">OR</div>
            <div>
              <Link to="/signup">Regester now!</Link>
            </div>
          </Form.Item>
        </Form>
        {showLogInButton ? (
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign In"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
        ) : null}
      </Card>
    </div>
  );
};

export default SignIn;
