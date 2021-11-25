import React, { useEffect } from "react";
import { PageHeader, Button } from "antd";
import "./Header.css";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  const logOut = () => {
    localStorage.removeItem("tokens");
    history.push("/");
  };

  return (
    <div className="parente">
      <PageHeader
        className="site-page-header header"
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button key="1" type="primary" htmlType="button" onClick={logOut}>
            logout
          </Button>,
        ]}
      ></PageHeader>
      <br />
    </div>
  );
};

export default Header;
