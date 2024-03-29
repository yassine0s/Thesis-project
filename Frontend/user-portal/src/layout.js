import Header from "./components/header";
import { Outlet } from "react-router-dom";
import SideBar from "./components/sidebar";
import { Layout, theme } from "antd";
import Footer from "./components/footer";
import { useUser } from "./utils/customHooks";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user, authenticated } = useUser();
  if (!user || !authenticated) navigate("/login");
  return (
    <>
      <Layout>
        {<Header />}
        <Content>
          <Layout
            style={{
              padding: "0 0",
              background: colorBgContainer,
              height: "83.5vh",
            }}
          >
            <SideBar />
            <Outlet />
          </Layout>
          <Footer></Footer>{" "}
        </Content>
      </Layout>
    </>
  );
};
export default Dashboard;
