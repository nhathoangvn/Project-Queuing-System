import { Badge, Checkbox, DatePicker, Dropdown, Menu, Row, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import React, { useEffect } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { FaFileDownload } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { capSoCreator } from "../../redux";
import { capSoListSelector } from "../../redux/selectors/capSoSelector";
import * as XLSX from "xlsx";
import "./Report.scss";
interface IDataType {
  number: string;
  serviceName: string;
  time: string;
  status: string;
  source: string;
}
export default function Report() {
  type dataIndex = keyof IDataType;
  const dispatch = useDispatch();
  const { loadData } = bindActionCreators(capSoCreator, dispatch);
  const capSoList = useSelector(capSoListSelector);
  useEffect(() => {
    loadData();
  }, []);
  let locale = {
    emptyText: "Không có dữ liệu",
  };
  const getColumnFilterProps = (
    dataIndex: dataIndex
  ): ColumnType<IDataType> => ({
    filterDropdown: ({}) => <></>,
  });
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "number",
      width: 226,
      ...getColumnFilterProps("number"),
      render: (number: string) => <Row align="middle">{number}</Row>,
      filterIcon: (
        <Dropdown
          overlay={
            <Menu style={{ width: 226 }}>
              <Menu.Item key="TatCa">Tất cả</Menu.Item>
              <Menu.Item key="2001201">2001201</Menu.Item>
              <Menu.Item key="2001202">2001202</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottom"
          overlayStyle={{
            paddingRight: "192px",
            paddingTop: "14px",
            borderRadius: "8px",
          }}
        >
          <TiArrowUnsorted color="#fff" size={20} />
        </Dropdown>
      ),
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      width: 232,
      ...getColumnFilterProps("serviceName"),
      render: (serviceName: string) => <Row align="middle">{serviceName}</Row>,
      filterIcon: (
        <Dropdown
          overlay={
            <Menu style={{ width: 232 }}>
              <Menu.Item key="TatCa">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Tất cả</span>
                  <Checkbox value="all" />
                </div>
              </Menu.Item>
              <Menu.Item key="TatCa">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Khám tim</span>
                  <Checkbox value="khamtim" />
                </div>
              </Menu.Item>
              <Menu.Item key="TatCa">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Khám sản - Phụ khoa</span>
                  <Checkbox value="khamsan" />
                </div>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
          placement="bottom"
          overlayStyle={{
            paddingRight: "200px",
            paddingTop: "14px",
            borderRadius: "8px",
          }}
        >
          <TiArrowUnsorted color="#fff" size={20} />
        </Dropdown>
      ),
    },
    {
      title: "Thời gian cấp",
      dataIndex: "createdAt",
      width: 238,
      render: (time: string) => <Row align="middle">{time}</Row>,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      width: 216,
      render: (status: string) => (
        <Row align="middle">{statusRender(status)}</Row>
      ),
    },
    {
      title: "Nguồn cấp",
      dataIndex: "source",
      width: 196,
      render: (source: string) => <Row align="middle">{source}</Row>,
    },
  ];
  function itemPagination(current: any, type: any, orginalElement: any) {
    if (type === "prev") {
      return <AiFillCaretLeft color="#A9A9B0" />;
    } else if (type === "next") {
      return <AiFillCaretRight color="#A9A9B0" />;
    }
    return orginalElement;
  }
  function statusRender(status: string) {
    switch (status) {
      case "Đang chờ":
        return (
          <React.Fragment>
            <Badge color="#4277FF" />
            Đang chờ
          </React.Fragment>
        );
      case "Đã sử dụng":
        return (
          <React.Fragment>
            <Badge color="#7E7D88" />
            Đã sử dụng
          </React.Fragment>
        );
      case "Bỏ qua":
        return (
          <React.Fragment>
            <Badge color="#E73F3F" />
            Bỏ qua
          </React.Fragment>
        );
      default:
        return;
    }
  }
  return (
    <div className="report">
      <div className="report-wrapper">
        <div className="report-container">
          <div className="report-container-filter">
            <span>Chọn thời gian</span>
            <div className="select-option-date">
              <DatePicker suffixIcon={<BiCalendar size={20} />} />
              <div style={{ padding: "0 5px 0 5px" }}>
                <AiFillCaretRight size={10} />
              </div>
              <DatePicker suffixIcon={<BiCalendar size={20} />} />
            </div>
          </div>
          <div className="report-content-container">
            <div className="report-content-table">
              <Table
                locale={locale}
                columns={columns}
                dataSource={capSoList}
                pagination={{ pageSize: 10, itemRender: itemPagination }}
              />
            </div>
            <div
              className="report-content-action-download"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const downloadExcel = () => {
                  const workSheet = XLSX.utils.json_to_sheet(capSoList);
                  const workBook = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(workBook, workSheet, "baoCao");
                  //Buffer
                  let buf = XLSX.write(workBook, {
                    bookType: "xlsx",
                    type: "buffer",
                  });
                  //Binary string
                  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
                  //Download
                  XLSX.writeFile(workBook, "baoCaoData.xlsx");
                };
                downloadExcel();
              }}
            >
              <FaFileDownload size={20} color="#FF7506" />
              <p>Tải về</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
