import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import React, { ChangeEvent, useState } from "react";
import {
  AiFillCaretDown,
  AiFillInfoCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { taikhoanCreator } from "../../redux";
import "./CreateManageAccount.scss";
export default function CreateManageAccount() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [passwordChange, setPasswordChange] = useState<string>("");
  const [repasswordChange, setRepasswordChange] = useState<string>("");
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { addAccount } = bindActionCreators(taikhoanCreator, dispatch);
  const [checkRepassword, setCheckRepassword] = useState<boolean>(true);

  const handleOnchangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordChange(e.target.value);
    setCheckRepassword(true);
  };
  const handleOnChangeRepassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepasswordChange(e.target.value);
    setCheckRepassword(true);
  };
  const handleOnClickCreateAccount = () => {
    form
      .validateFields()
      .then(async (value) => {
        const {
          hoten,
          tendangnhap,
          matkhau,
          repassword,
          email,
          sodienthoai,
          vaitro,
          hoatdong,
        } = value;
        if (passwordChange === repassword) {
          addAccount({
            hoatdong,
            hoten,
            tendangnhap,
            matkhau,
            email,
            sodienthoai,
            vaitro,
          });
          setCheckRepassword(true);
          navigate("/manage-account");
        } else {
          setCheckRepassword(false);
        }
      })
      .catch(() => setCheckRepassword(false));
  };
  return (
    <div className="create-account">
      <div className="create-account-wrapper">
        <div className="create-account-container">
          <div className="create-account-title">
            <span>Qu???n l?? t??i kho???n</span>
          </div>
          <div className="create-account-content">
            <div className="create-account-form">
              <div className="create-account-form-title">
                <span>Th??ng tin t??i kho???n</span>
              </div>
              <div className="create-account-form-item">
                <Form form={form} onFinish={handleOnClickCreateAccount}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <span className="label">
                        H??? t??n: <span className="required">*</span>
                      </span>
                      <Form.Item
                        name="hoten"
                        rules={[
                          {
                            required: true,
                            message: "H??? t??n l?? tr?????ng th??ng tin b???t bu???c",
                          },
                        ]}
                      >
                        <Input className="form-item-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="label">
                        T??n ????ng nh???p: <span className="required">*</span>
                      </span>
                      <Form.Item
                        name="tendangnhap"
                        rules={[
                          {
                            required: true,
                            message:
                              "T??n ????ng nh???p l?? tr?????ng th??ng tin b???t bu???c",
                          },
                        ]}
                      >
                        <Input className="form-item-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="label">
                        S??? ??i???n tho???i: <span className="required">*</span>
                      </span>
                      <Form.Item
                        name="sodienthoai"
                        rules={[
                          {
                            required: true,
                            message:
                              "S??? ??i???n tho???i l?? tr?????ng th??ng tin b???t bu???c",
                          },
                        ]}
                      >
                        <Input className="form-item-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="label">
                        M???t kh???u: <span className="required">*</span>
                      </span>
                      <Form.Item
                        name="matkhau"
                        rules={[
                          {
                            required: true,
                            message: "M???t kh???u l?? tr?????ng th??ng tin b???t bu???c",
                          },
                        ]}
                      >
                        <Input.Password
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleOnchangePassword(e)
                          }
                          className="form-item-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="label">
                        Email: <span className="required">*</span>
                      </span>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Email l?? tr?????ng th??ng tin b???t bu???c",
                          },
                        ]}
                      >
                        <Input className="form-item-input" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="label">
                        Nh???p l???i m???t kh???u: <span className="required">*</span>
                      </span>
                      <Form.Item
                        name="repassword"
                        help={
                          checkRepassword ? (
                            ""
                          ) : (
                            <React.Fragment>
                              <Row align="middle" style={{ color: "#ff4d4f" }}>
                                <AiOutlineInfoCircle size={16} />
                                M???t kh???u kh??ng tr??ng kh???p
                              </Row>
                            </React.Fragment>
                          )
                        }
                      >
                        <Input.Password
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleOnChangeRepassword(e)
                          }
                          className="form-item-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="label">
                        Vai tr?? <span className="required">*</span>
                      </span>
                      <Form.Item
                        name="vaitro"
                        rules={[
                          {
                            required: true,
                            message: "Vai tr?? l?? tr?????ng th??ng tin b???t bu???c",
                          },
                        ]}
                      >
                        <Select
                          suffixIcon={<AiFillCaretDown size={20} />}
                          placeholder="Ch???n vai tr??"
                        >
                          <Select.Option value="Qu???n l??">Qu???n l??</Select.Option>
                          <Select.Option value="K??? to??n">K??? to??n</Select.Option>
                          <Select.Option value="Admin">Admin</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="label">
                        T??nh tr???ng: <span className="required">*</span>
                      </span>
                      <Form.Item
                        name="hoatdong"
                        rules={[
                          {
                            required: true,
                            message: "T??nh tr???ng l?? tr?????ng th??ng tin b???t bu???c",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Ch???n t??nh tr???ng"
                          suffixIcon={<AiFillCaretDown size={20} />}
                        >
                          <Select.Option value={true}>Ho???t ?????ng</Select.Option>
                          <Select.Option value={false}>
                            Ng??ng ho???t ?????ng
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="required-label">
                        <span style={{ color: "red" }}>*</span> L?? tr?????ng th??ng
                        tin b???t bu???c
                      </span>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
          <div className="create-account-action">
            <Row justify="center" align="middle">
              <Space size="large">
                <Button
                  className="btn-cancel"
                  onClick={() => naviagte("/manage-account")}
                >
                  Hu??? b???
                </Button>
                <Button
                  className="btn-add"
                  onClick={handleOnClickCreateAccount}
                >
                  Th??m
                </Button>
              </Space>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
