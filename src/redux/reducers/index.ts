import { combineReducers } from "redux";
import capSoReducer from "./capSoReducer";
import dichVuReducer from "./dichVuReducer";
import nguoiDungReducer from "./nguoiDungReducer";
import taiKhoanReducer from "./taiKhoanReducer";
import thietBiReducer from "./thietBiReducer";
import vaiTroReducer from "./vaiTroReducer";

const reducers = combineReducers({
  taikhoan: taiKhoanReducer,
  thietbi: thietBiReducer,
  dichvu: dichVuReducer,
  capSo: capSoReducer,
  vaitro: vaiTroReducer,
  nguoidung: nguoiDungReducer,
});
export default reducers;
export type state = ReturnType<typeof reducers>;
