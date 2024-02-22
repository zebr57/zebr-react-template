import { useSelector, useDispatch } from "react-redux";
import { changeUserInfoThunk } from "../../store/userInfo";

function UserInfoPage() {
  let { userInfo } = useSelector((state) => {
    return state.userInfoReducer;
  });
  let dispatch = useDispatch();
  return (
    <div className="userInfo-page">
      <div>昵称：{userInfo.name}</div>
      <div>年龄：{userInfo.age}</div>
      <div>性别：{userInfo.gender}</div>
      <div>token：{userInfo.token}</div>
      <div>
        配置信息如下：
        <div>主题：{userInfo.config.theme}</div>
        <div>通知：{userInfo.config.isNotification ? "开启" : "不开启"}</div>
      </div>

      <button
        onClick={() => {
          dispatch(changeUserInfoThunk());
        }}
      >
        异步修改用户信息
      </button>
      <br></br>
      <button
        onClick={() => {
          dispatch({
            type: "userInfoSlice/changeUserInfo",
            payload: {
              name: "李明花",
              age: 20,
              gender: 0,
              token: "user123",
              auth: "userInfo",
              config: {
                theme: "yellow",
                isNotification: true
              }
            }
          });
        }}
      >
        同步修改用户信息
      </button>
    </div>
  );
}
export default UserInfoPage;
