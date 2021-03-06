import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { state, thietBiCreator } from "../../redux";
import { IDevice } from "../../types/TypeDevice";
import "./UpdateDevice.scss";
type MyParams = {
  deviceID: string;
};
export default function UpdateDevice() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deviceID } = useParams<keyof MyParams>() as MyParams;
  const { updateItem, selectedItem } = bindActionCreators(
    thietBiCreator,
    dispatch
  );
  const { thietBiInfo } = useSelector((state: state) => state.thietbi);
  const [updateDevice, setUpdateDevice] = useState<IDevice>({
    idDevice: "",
    deviceName: "",
    ipAddress: "",
    service: [],
    statusConnection: true,
    statusWork: true,
    matkhau: "",
    taikhoan: "",
    typeDevice: "",
  });
  const handleOnClickUpdateDevice = () => {
    form
      .validateFields()
      .then(async () => {
        updateItem(deviceID, updateDevice);
        navigate("/device");
      })
      .catch();
  };
  useEffect(() => {
    selectedItem(deviceID);
  }, []);
  useEffect(() => {
    setUpdateDevice({
      deviceName: thietBiInfo.deviceName,
      idDevice: thietBiInfo.idDevice,
      ipAddress: thietBiInfo.ipAddress,
      service: thietBiInfo.service,
      statusConnection: thietBiInfo.statusConnection,
      statusWork: thietBiInfo.statusWork,
      matkhau: thietBiInfo.matkhau,
      taikhoan: thietBiInfo.taikhoan,
      typeDevice: thietBiInfo.typeDevice,
    });
    form.setFieldsValue({
      deviceName: thietBiInfo.deviceName,
      idDevice: thietBiInfo.idDevice,
      ipAddress: thietBiInfo.ipAddress,
      matkhau: thietBiInfo.matkhau,
      taikhoan: thietBiInfo.taikhoan,
    });
  }, [thietBiInfo]);
  console.log(thietBiInfo.service);

  return (
    <div className="update-device">
      <div className="update-device-wrapper">
        <div className="update-device-container">
          <div className="update-device-title">
            <p>Qu???n l?? thi???t b???</p>
          </div>
          <div className="update-device-form-container">
            <div className="update-device-form">
              <div className="update-device-form-content-title">
                <p>Th??ng tin thi???t b???</p>
              </div>
              <Form form={form} onFinish={handleOnClickUpdateDevice}>
                <div className="update-device-form-item">
                  <Row gutter={24} style={{ paddingLeft: "24px" }}>
                    <Col span={12} className="form-item">
                      <div className="label">
                        <p>M?? thi???t b???:</p>
                        <div className="required">
                          <p>*</p>
                        </div>
                      </div>
                      <div className="input">
                        <Form.Item
                          name="idDevice"
                          rules={[
                            {
                              required: true,
                              message:
                                "M?? thi???t b??? l?? tr?????ng th??ng tin b???t bu???c",
                            },
                          ]}
                        >
                          <Input
                            value={updateDevice.idDevice}
                            onChange={(e) =>
                              setUpdateDevice({
                                ...updateDevice,
                                idDevice: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={12} className="form-item">
                      <div className="label">
                        <p>Lo???i thi???t b???:</p>
                        <div className="required">
                          <p>*</p>
                        </div>
                      </div>
                      <div className="select-option">
                        <Select
                          suffixIcon={<AiFillCaretDown size={20} />}
                          value={{ value: `${updateDevice.typeDevice}` }}
                          size="large"
                          onChange={(value: any) =>
                            setUpdateDevice({
                              ...updateDevice,
                              typeDevice: value,
                            })
                          }
                        >
                          <Select.Option value="Kiosk">Kiosk</Select.Option>
                          <Select.Option value="Display Counter">
                            Display Counter
                          </Select.Option>
                        </Select>
                      </div>
                    </Col>
                    <Col span={12} className="form-item">
                      <div className="label">
                        <p>T??n thi???t b???:</p>
                        <div className="required">
                          <p>*</p>
                        </div>
                      </div>
                      <div className="input">
                        <Form.Item
                          name="deviceName"
                          rules={[
                            {
                              required: true,
                              message:
                                "T??n thi???t b??? l?? tr?????ng th??ng tin b???t bu???c",
                            },
                          ]}
                        >
                          <Input
                            value={updateDevice.deviceName}
                            onChange={(e) =>
                              setUpdateDevice({
                                ...updateDevice,
                                deviceName: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={12} className="form-item">
                      <div className="label">
                        <p>T??n ????ng nh???p:</p>
                        <div className="required">
                          <p>*</p>
                        </div>
                      </div>
                      <div className="input">
                        <Form.Item
                          name="taikhoan"
                          rules={[
                            {
                              required: true,
                              message: "T??i kho???n l?? th?????ng th??ng tin b???t bu???c",
                            },
                          ]}
                        >
                          <Input
                            value={updateDevice.taikhoan}
                            onChange={(e) =>
                              setUpdateDevice({
                                ...updateDevice,
                                taikhoan: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={12} className="form-item">
                      <div className="label">
                        <p>?????a ch??? IP:</p>
                        <div className="required">
                          <p>*</p>
                        </div>
                      </div>
                      <div className="input">
                        <Form.Item
                          name="ipAddress"
                          rules={[
                            {
                              required: true,
                              message:
                                "?????a ch??? IP l?? th?????ng th??ng tin b???t bu???c",
                            },
                          ]}
                        >
                          <Input
                            value={updateDevice.ipAddress}
                            onChange={(e) =>
                              setUpdateDevice({
                                ...updateDevice,
                                ipAddress: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={12} className="form-item">
                      <div className="label">
                        <p>M???t kh???u:</p>
                        <div className="required">
                          <p>*</p>
                        </div>
                      </div>
                      <div className="input">
                        <Form.Item
                          name="matkhau"
                          rules={[
                            {
                              required: true,
                              message: "M???t kh???u l?? th?????ng th??ng tin b???t bu???c",
                            },
                          ]}
                        >
                          <Input
                            value={updateDevice.matkhau}
                            onChange={(e) =>
                              setUpdateDevice({
                                ...updateDevice,
                                matkhau: e.target.value,
                              })
                            }
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={24} className="form-item">
                      <div className="label">
                        <p>D???ch v??? s??? d???ng:</p>
                        <div className="required">
                          <p>*</p>
                        </div>
                      </div>
                      <div className="service-usage">
                        <Select
                          mode="multiple"
                          value={updateDevice.service}
                          onChange={(value: any) =>
                            setUpdateDevice({ ...updateDevice, service: value })
                          }
                        >
                          <Select.Option value="T???t c???">T???t c???</Select.Option>
                          <Select.Option value="Kh??m tim m???ch">
                            Kh??m tim m???ch
                          </Select.Option>
                          <Select.Option value="Kh??m s???n-Ph??? khoa">
                            Kh??m s???n ph??? khoa
                          </Select.Option>
                          <Select.Option value="Kh??m r??ng h??m m???t">
                            Kh??m r??ng h??m m???t
                          </Select.Option>
                          <Select.Option value="Kh??m tai m??i h???ng">
                            Kh??m tai m??i h???ng
                          </Select.Option>
                          <Select.Option value="Kh??m h?? h???p">
                            Kh??m h?? h???p
                          </Select.Option>
                          <Select.Option value="Kh??m t???ng qu??t">
                            Kh??m t???ng qu??t
                          </Select.Option>
                        </Select>
                      </div>
                    </Col>
                    <Col span={24} className="form-item-notes">
                      <div className="label">
                        <div className="required">
                          <p>*</p>
                        </div>
                        <p>L?? tr?????ng th??ng tin b???t bu???c</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
            <Row justify="center" align="middle" className="action-container">
              <Space size="large">
                <Button
                  className="btn-cancel"
                  onClick={() => navigate("/device")}
                >
                  Hu??? b???
                </Button>
                <Button
                  className="btn-update"
                  onClick={handleOnClickUpdateDevice}
                >
                  C???p nh???t
                </Button>
              </Space>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
