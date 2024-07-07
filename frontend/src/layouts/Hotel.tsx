import React from "react";
import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content/* , Footer */ } = Layout;

const items = [
  {
    key: 1,
    label: "Hotels"
  },
  {
    key: 2,
    label: "My bookings"
  }
];

const HotelLayout: React.FC = () => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          minWidth: "100dvw",
          height: "68px",
          display: "flex",
          alignItems: "center",
          padding: "0 10%"
        }}
      >
        {/* <div className="demo-logo" /> */}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 10%",
          minHeight: `calc(100dvh - 68px)`
        }}
      >
        <div>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Hotels</Breadcrumb.Item>
            {/* <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
        </div>
        {/* <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        > */}
          <Outlet />
        {/* </div> */}
      </Content>
      {/* <Footer style={{ position: "fixed", bottom: 0, width: "100dvw", textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer> */}
    </Layout>
  );
};

export default HotelLayout;
