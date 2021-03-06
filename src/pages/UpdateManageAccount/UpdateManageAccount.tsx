import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { state, taikhoanCreator } from "../../redux";
type MyParams = {
  accountID: string;
};
interface IAccount {
  email: string;
  hoatdong: boolean;
  hoten: string;
  matkhau: string;
  sodienthoai: string;
  tendangnhap: string;
  vaitro: string;
}
export default function UpdateManageAccount() {
  const [form] = Form.useForm();
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [updateAccount, setUpdateAccount] = useState<IAccount>({
    email: "",
    hoatdong: true,
    hoten: "",
    matkhau: "",
    sodienthoai: "",
    tendangnhap: "",
    vaitro: "",
  });
  const [checkRepassword, setCheckRepassword] = useState<boolean>(true);
  const { accountID } = useParams<keyof MyParams>() as MyParams;
  const { loadData, selectedAccount, updateItem } = bindActionCreators(
    taikhoanCreator,
    dispatch
  );
  const { taiKhoanSelected } = useSelector((state: state) => state.taikhoan);
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    selectedAccount(accountID);
  }, [accountID]);
  useEffect(() => {
    setUpdateAccount({
      email: taiKhoanSelected.email,
      hoatdong: taiKhoanSelected.hoatdong,
      hoten: taiKhoanSelected.hoten,
      matkhau: taiKhoanSelected.matkhau,
      sodienthoai: taiKhoanSelected.sodienthoai,
      tendangnhap: taiKhoanSelected.tendangnhap,
      vaitro: taiKhoanSelected.vaitro,
    });
    form.setFieldsValue({
      email: taiKhoanSelected.email,
      hoatdong: taiKhoanSelected.hoatdong,
      hoten: taiKhoanSelected.hoten,
      matkhau: taiKhoanSelected.matkhau,
      sodienthoai: taiKhoanSelected.sodienthoai,
      tendangnhap: taiKhoanSelected.tendangnhap,
      vaitro: taiKhoanSelected.vaitro,
      rematkhau: taiKhoanSelected.matkhau,
    });
  }, [taiKhoanSelected]);

  const handleOnClickUpdateAccount = () => {
    form
      .validateFields()
      .then(async (value) => {
        const { rematkhau } = value;
        if (updateAccount.matkhau === rematkhau) {
          updateItem(accountID, updateAccount);
          setCheckRepassword(true);
          naviagte("/manage-account");
        } else {
          setCheckRepassword(false);
        }
      })
      .catch();
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
                <Form form={form}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <span className="label">
                        H??? t??n: <span className="required">*</span>
                      </span>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "H??? t??n l?? tr?????ng th??ng tin b???t bu???c",
                          },
                        ]}
                        name="hoten"
                      >
                        <Input
                          value={updateAccount.hoten}
                          onChange={(e) =>
                            setUpdateAccount({
                              ...updateAccount,
                              hoten: e.target.value,
                            })
                          }
                          className="form-item-input"
                        />
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
                        <Input
                          value={updateAccount.tendangnhap}
                          onChange={(e) =>
                            setUpdateAccount({
                              ...updateAccount,
                              tendangnhap: e.target.value,
                            })
                          }
                          className="form-item-input"
                        />
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
                        <Input
                          value={updateAccount.sodienthoai}
                          onChange={(e) =>
                            setUpdateAccount({
                              ...updateAccount,
                              sodienthoai: e.target.value,
                            })
                          }
                          className="form-item-input"
                        />
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
                          value={updateAccount.matkhau}
                          onChange={(e) => {
                            setUpdateAccount({
                              ...updateAccount,
                              matkhau: e.target.value,
                            });
                            setCheckRepassword(true);
                          }}
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
                        <Input
                          value={updateAccount.email}
                          onChange={(e) =>
                            setUpdateAccount({
                              ...updateAccount,
                              email: e.target.value,
                            })
                          }
                          className="form-item-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="label">
                        Nh???p l???i m???t kh???u: <span className="required">*</span>
                      </span>
                      <Form.Item
                        name="rematkhau"
                        help={
                          checkRepassword ? (
                            ""
                          ) : (
                            <React.Fragment>
                              <span style={{ color: "red" }}>
                                M???t kh???u kh??ng tr??ng kh???p
                              </span>
                            </React.Fragment>
                          )
                        }
                      >
                        <Input.Password
                          onChange={() => setCheckRepassword(true)}
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
                          onChange={(value) =>
                            setUpdateAccount({
                              ...updateAccount,
                              vaitro: value,
                            })
                          }
                        >
                          <Select.Option value="Qu???n l??">Qu???n l??</Select.Option>
                          <Select.Option value="K??? to??n">K??? to??n</Select.Option>
                          <Select.Option value="Admin">Admin</Select.Option>
                          <Select.Option value="SuperAdmin">
                            Super Admin
                          </Select.Option>
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
                            message: "Ho???t ?????ng l?? tr?????ng th??ng tin b???t bu???c",
                          },
                        ]}
                      >
                        <Select
                          suffixIcon={
                            <AiFillCaretDown
                              size={20}
                              onChange={(value: any) =>
                                setUpdateAccount({
                                  ...updateAccount,
                                  hoatdong: value,
                                })
                              }
                            />
                          }
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
                  onClick={handleOnClickUpdateAccount}
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
