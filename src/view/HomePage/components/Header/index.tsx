import { Avatar, Breadcrumb, Col, Dropdown, Row } from "antd";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { db } from "../../../../config/firebase";
import { capSoCreator, dichVuCreator, state } from "../../../../redux";
import avatar from "../../../../shared/assets/images/avatar.png";
import Notification, { INotification } from "../Notification/Notification";
import "./Header.scss";
interface IBreadcrumb {
  pathname: string;
  title: string[];
  childrenBreadcrumb?: IBreadcrumb;
}
interface IRouterProps {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}

const Header: React.FC = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCheckedNotification, setIsCheckedNotification] =
    useState<boolean>(false);
  const { taiKhoanLogin } = useSelector((state: state) => state.taikhoan);
  const dispatch = useDispatch();
  const [list, setList] = useState<any>([]);
  const { loadData } = bindActionCreators(capSoCreator, dispatch);
  const { capSoList } = useSelector((state: state) => state.capSo);
  const { deviceID, serviceID, numberID, roleID, accountID } = useParams();
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    const getListNotification = async () => {
      const capSoCollectionRef = collection(db, "capso");
      const capSo = await getDocs(capSoCollectionRef);
      const data: any[] = capSo.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setList(data);
    };
    getListNotification();
  }, []);
  const breadcrumbItems: IBreadcrumb[] = [
    {
      pathname: "/dashboard",
      title: ["Dashboard"],
    },
    {
      pathname: "/device",
      title: ["Thi???t b???", "Danh s??ch thi???t b???"],
    },
    {
      pathname: "/device/create",
      title: ["Thi???t b???", "Danh s??ch thi???t b???", "Th??m thi???t b???"],
    },
    {
      pathname: `/device/details/${deviceID}`,
      title: ["Thi???t b???", "Danh s??ch thi???t b???", "Chi ti???t thi???t b???"],
    },
    {
      pathname: `/device/update/${deviceID}`,
      title: ["Thi???t b???", "Danh s??ch thi???t b???", "C???p nh???t thi???t b???"],
    },
    {
      pathname: "/service",
      title: ["D???ch v???", "Danh s??ch d???ch v???"],
    },
    {
      pathname: "/service/create",
      title: ["D???ch v???", "Danh s??ch d???ch v???", "Th??m d???ch v???"],
    },
    {
      pathname: `/service/details/${serviceID}`,
      title: ["D???ch v???", "Danh s??ch d???ch v???", "Chi ti???t"],
    },
    {
      pathname: `/service/update/${serviceID}`,
      title: ["D???ch v???", "Danh s??ch d???ch v???", "Chi ti???t", "C???p nh???t"],
    },
    {
      pathname: "/provide-number",
      title: ["C???p s???", "Danh s??ch c???p s???"],
    },
    {
      pathname: "/provide-number/create",
      title: ["C???p s???", "Danh s??ch c???p s???", "C???p s???"],
    },
    {
      pathname: `/provide-number/details/${numberID}`,
      title: ["C???p s???", "Danh s??ch c???p s???", "Chi ti???t"],
    },
    {
      pathname: "/report",
      title: ["B??o c??o", "L???p b??o c??o"],
    },
    {
      pathname: "/manage-role",
      title: ["C??i ?????t h??? th???ng", "Qu???n l?? vai tr??"],
    },
    {
      pathname: "/manage-role/create",
      title: ["C??i ?????t h??? th???ng", "Qu???n l?? vai tr??", "Th??m vai tr??"],
    },
    {
      pathname: `/manage-role/update/${roleID}`,
      title: ["C??i ?????t h??? th???ng", "Qu???n l?? vai tr??", "Th??m vai tr??"],
    },
    {
      pathname: "/manage-account",
      title: ["C??i ?????t h??? th???ng", "Qu???n l?? t??i kho???n"],
    },
    {
      pathname: "/manage-account/create",
      title: ["C??i ?????t h??? th???ng", "Qu???n l?? t??i kho???n", "Th??m t??i kho???n"],
    },
    {
      pathname: `/manage-account/update/${accountID}`,
      title: ["C??i ?????t h??? th???ng", "Qu???n l?? t??i kho???n", "C???p nh???t t??i kho???n"],
    },
    {
      pathname: "/dinary-user",
      title: ["C??i ?????t h??? th???ng", "Nh???t k?? ng?????i d??ng"],
    },
    {
      pathname: "/me",
      title: ["Th??ng tin c?? nh??n"],
    },
  ];
  const breadcrumb = (locationPathname: string) => {
    return breadcrumbItems.map((breadcrumbItem) => {
      switch (breadcrumbItem.pathname) {
        case locationPathname:
          return breadcrumbItem;
        default:
          return null;
      }
    });

    //   .filter((value) => value != null);
    // if (pathname.startsWith(pathname)) {
    //   return breadcrumbItems.filter(
    //     (item: IBreadcrumb) => item.pathname === pathname
    //   );
    // }
    // return breadcrumbItems.filter((item: IBreadcrumb) =>
    //   locationPathname.startsWith(item.pathname)
    // );
    // return locationPathname.split("/").filter((value) => value !== "");+
  };

  return (
    <Row className="header">
      <Col span={17} className="header-breadcrumb">
        <Breadcrumb separator=">">
          {breadcrumb(location.pathname).map((items) =>
            items?.title?.map((title, index) => {
              return (
                <Breadcrumb.Item href={items.pathname} key={index}>
                  {title}
                </Breadcrumb.Item>
              );
            })
          )}
          {/* {breadcrumb(location.pathname)} */}
        </Breadcrumb>
      </Col>
      <Col
        span={7}
        className={
          location.pathname === "/dashboard"
            ? "header-bg header-user-information"
            : "header-user-information"
        }
      >
        <Row>
          <Col span={6}>
            <Row
              justify="end"
              align="middle"
              className="header-user-notification"
            >
              <Dropdown
                overlay={<Notification notifications={list} />}
                onVisibleChange={(visible) => {
                  setIsCheckedNotification(visible);
                }}
                trigger={["click"]}
                placement="bottom"
                overlayStyle={{ paddingLeft: "160px", paddingTop: "16px" }}
              >
                <Row
                  align="middle"
                  justify="center"
                  className={
                    isCheckedNotification
                      ? "around-notification-checked"
                      : "around-notification"
                  }
                >
                  <BsFillBellFill />
                </Row>
              </Dropdown>
            </Row>
          </Col>
          <Col span={18}>
            <Row className="header-user-avatar" onClick={() => navigate("/me")}>
              <Avatar src={avatar} size={40} />
              <div className="header-user-info">
                <span>Xin ch??o</span>
                <p>{taiKhoanLogin[0].hoten}</p>
              </div>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default Header;
