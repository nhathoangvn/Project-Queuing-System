import { Menu, Row } from "antd";
import { useEffect } from "react";
import { BsClipboardData } from "react-icons/bs";
import { FiLayers, FiLogOut } from "react-icons/fi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { MdMoreVert, MdOutlineDashboard } from "react-icons/md";
import { RiSettingsLine, RiWechatLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { taikhoanCreator } from "../../redux";
import logo from "../../shared/assets/images/logoAltaMain.png";
import Header from "./components/Header";
import "./HomePage.scss";
export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signin } = bindActionCreators(taikhoanCreator, dispatch);
  const handleOnClickLogout = () => {
    navigate("/login");
    signin(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
  };
  if (!localStorage.getItem("currentUser")) {
    window.location.replace("/login");
  }
  return (
    <div className="main-layout">
      <div className="main">
        <div className="main-left">
          <Row className="main-left-logo" justify="center" align="middle">
            <img src={logo} alt="" />
          </Row>
          <Menu style={{ width: 220 }} className="main-menu">
            <Menu.Item
              key="dashboard"
              icon={<MdOutlineDashboard size={20} />}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="device"
              icon={<HiOutlineDesktopComputer size={20} />}
              onClick={() => {
                navigate("/device");
              }}
            >
              Thiết bị
            </Menu.Item>
            <Menu.Item
              key="service"
              icon={<RiWechatLine size={20} />}
              onClick={() => {
                navigate("/service");
              }}
            >
              Dịch vụ
            </Menu.Item>
            <Menu.Item
              key="provide-number"
              icon={<FiLayers size={20} />}
              onClick={() => {
                navigate("/provide-number");
              }}
            >
              Cấp số
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                navigate("/report");
              }}
              key="report"
              icon={<BsClipboardData size={20} />}
            >
              Báo cáo
            </Menu.Item>
            <Menu.Item
              key="setting"
              className="__submenu"
              icon={<RiSettingsLine size={20} />}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>Cài đặt hệ thống</span>
                <MdMoreVert size={20} style={{ marginLeft: "17px" }} />
              </div>
              <div className="setting__wrap">
                <div
                  className="setting__wrap-item"
                  onClick={() => {
                    navigate("/manage-role");
                  }}
                >
                  Quản lý vai trò
                </div>
                <div
                  className="setting__wrap-item"
                  onClick={() => {
                    navigate("/manage-account");
                  }}
                >
                  Quản lý tài khoản
                </div>
                <div
                  className="setting__wrap-item"
                  onClick={() => {
                    navigate("/dinary-user");
                  }}
                >
                  Nhật ký người dùng
                </div>
              </div>
            </Menu.Item>

            <Menu.Item
              className="logout"
              key="logout"
              icon={<FiLogOut size={20} />}
              onClick={handleOnClickLogout}
            >
              Đăng xuất
            </Menu.Item>
          </Menu>
        </div>
        <div className="main-center">
          <div className="header">
            <Header />
          </div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
