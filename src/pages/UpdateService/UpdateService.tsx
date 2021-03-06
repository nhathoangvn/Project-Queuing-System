import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { dichVuCreator, state } from "../../redux";
type MyParams = {
  serviceID: string;
};
export default function UpdateService() {
  const [form] = Form.useForm();
  const [updateService, setUpdateService] = useState({
    idService: "",
    serviceName: "",
    description: "",
    statusWork: true,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedItem, updateItem } = bindActionCreators(
    dichVuCreator,
    dispatch
  );
  const { serviceID } = useParams<keyof MyParams>() as MyParams;
  useEffect(() => {
    selectedItem(serviceID);
  }, [serviceID]);
  const { dichVuSelected } = useSelector((state: state) => state.dichvu);
  useEffect(() => {
    setUpdateService({
      idService: dichVuSelected.idService,
      description: dichVuSelected.description,
      serviceName: dichVuSelected.serviceName,
      statusWork: dichVuSelected.statusWork,
    });
    form.setFieldsValue({
      idService: dichVuSelected.idService,
      serviceName: dichVuSelected.serviceName,
    });
  }, [dichVuSelected]);
  const handleOnClickUpdateItemService = () => {
    form
      .validateFields()
      .then(() => {
        updateItem(serviceID, updateService);
        navigate("/service");
      })
      .catch();
  };
  return (
    <div className="create-service">
      <div className="create-service-wrapper">
        <Form form={form}>
          <div className="create-service-container">
            <div className="create-service-title">
              <span>Quản lý dịch vụ</span>
            </div>
            <div className="create-service-content-container">
              <div className="create-service-content">
                <div className="create-service-content-title">
                  <span>Thông tin dịch vụ</span>
                </div>
                <div className="create-service-form">
                  <Row>
                    <Col span={12}>
                      <div className="form-item">
                        <div className="label">
                          <span>
                            Mã dịch vụ: <span style={{ color: "red" }}>*</span>
                          </span>
                        </div>
                        <div className="input">
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message:
                                  "Mã dịch vụ là trường thông tin bắt buộc",
                              },
                            ]}
                            name="idService"
                          >
                            <Input
                              // value={updateService.idService}
                              onChange={(e) =>
                                setUpdateService({
                                  ...updateService,
                                  idService: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="form-item">
                        <div className="label">
                          <span>
                            Tên dịch vụ: <span style={{ color: "red" }}>*</span>
                          </span>
                        </div>
                        <div className="input">
                          <Form.Item
                            name="serviceName"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Tên dịch vụ là trường thông tin bắt buộc",
                              },
                            ]}
                          >
                            <Input
                              // value={updateService.serviceName}
                              onChange={(e) =>
                                setUpdateService({
                                  ...updateService,
                                  serviceName: e.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="form-item">
                        <div className="label">
                          <span>Mô tả:</span>
                        </div>
                        <div>
                          <Input.TextArea
                            className="input-area"
                            style={{ resize: "none" }}
                            value={updateService.description}
                            onChange={(e) =>
                              setUpdateService({
                                ...updateService,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="content-bottom">
                  <div className="title">
                    <span>Quy tắc cấp số</span>
                  </div>
                  <div>
                    <div className="content-form">
                      <Row className="content-form-item">
                        <Col span={4} className="checkbox">
                          <Checkbox
                            style={{
                              fontWeight: 600,
                              fontSize: "16px",
                            }}
                          >
                            Tăng tự động từ:
                          </Checkbox>
                        </Col>
                        <Col span={20}>
                          <div className="checkbox-content">
                            <Input
                              value="0001"
                              bordered
                              style={{
                                width: "61px",
                                height: "44px",
                                borderRadius: "8px",
                              }}
                            />
                            <Row
                              align="middle"
                              style={{
                                height: "44px",
                                padding: "0 12px 0 12px",
                              }}
                            >
                              đến
                            </Row>
                            <Input
                              value="9999"
                              bordered
                              style={{
                                width: "61px",
                                height: "44px",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="content-form">
                      <Row className="content-form-item ">
                        <Col span={4} className="checkbox">
                          <Checkbox
                            style={{
                              fontWeight: 600,
                              fontSize: "16px",
                            }}
                          >
                            Prefix:
                          </Checkbox>
                        </Col>
                        <Col span={20}>
                          <div className="checkbox-content">
                            <Input
                              value="0001"
                              bordered
                              className=""
                              style={{
                                width: "61px",
                                height: "44px",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="content-form">
                      <Row className="content-form-item">
                        <Col span={4} className="checkbox">
                          <Checkbox
                            style={{
                              fontWeight: 600,
                              fontSize: "16px",
                            }}
                          >
                            Surfix:
                          </Checkbox>
                        </Col>
                        <Col span={20}>
                          <div className="checkbox-content">
                            <Input
                              value="0001"
                              bordered
                              style={{
                                width: "61px",
                                height: "44px",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row
                        style={{
                          height: "44px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Col span={4} style={{ paddingLeft: "24px" }}>
                          <Checkbox
                            style={{
                              fontWeight: 600,
                              fontSize: "16px",
                            }}
                          >
                            Reset mỗi ngày:
                          </Checkbox>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div style={{ paddingTop: "12px", paddingLeft: "24px" }}>
                    <span style={{ color: "red" }}>*</span>{" "}
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#7e7d88",
                      }}
                    >
                      Là trường thông tin bắt buột
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Row justify="center" align="middle" className="action-content">
              <Space size="large">
                <Form.Item>
                  <Button
                    className="btn-cancel"
                    onClick={() => navigate("/service")}
                  >
                    Huỷ bỏ
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    className="btn-add"
                    onClick={handleOnClickUpdateItemService}
                  >
                    Cập nhật
                  </Button>
                </Form.Item>
              </Space>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
}
