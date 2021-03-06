import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { dichVuCreator } from "../../redux";
import { IService } from "../../types/TypeService";
import "./CreateService.scss";
export default function CreateService() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newService, setNewService] = useState<IService>({
    idService: "",
    description: "",
    serviceName: "",
    statusWork: true,
  });
  const { addItem } = bindActionCreators(dichVuCreator, dispatch);
  const handleOnClickAddItemService = () => {
    form
      .validateFields()
      .then(async () => {
        addItem(newService);
        navigate("/service");
      })
      .catch(() => {});
  };
  return (
    <div className="create-service">
      <div className="create-service-wrapper">
        <Form form={form} onFinish={handleOnClickAddItemService}>
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
                            Mã dịch vụ:<span style={{ color: "red" }}>*</span>
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
                              onChange={(e) =>
                                setNewService({
                                  ...newService,
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
                            Tên dịch vụ:<span style={{ color: "red" }}>*</span>
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
                              onChange={(e) =>
                                setNewService({
                                  ...newService,
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
                            onChange={(e) =>
                              setNewService({
                                ...newService,
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
                    onClick={handleOnClickAddItemService}
                  >
                    Thêm dịch vụ
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
