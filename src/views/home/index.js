import { connect } from "react-redux";
// import { useSelector, useDispatch } from "react-redux"; // 1.引入hook
import { changeNumThunk } from "../../store/toolkitIndex";

function Home(props) {
  // 2. hook 方式映射到state
  // let num = useSelector((state) => {
  //   return state.numReducer.num;
  // });
  // let dispatch = useDispatch();

  return (
    <div className="home-page">
      home page
      <div>mes:{props.mes}</div>
      <div>num:{props.num}</div>
      {/* <div>num:{num}</div> hook 形式*/}
      <button
        onClick={() => {
          props.changeMes();
        }}
      >
        修改mes
      </button>
      <button
        onClick={() => {
          props.changeNum();
        }}
      >
        修改num
      </button>
      <button
        onClick={() => {
          props.changeNumThunk();
        }}
      >
        异步修改num
      </button>
    </div>
  );
}
// 使用redux
const reduxHome = connect(
  (state) => {
    return {
      mes: state.mesReducer.mes,
      num: state.numReducer.num
    };
  },
  (dispatch) => {
    return {
      changeMes() {
        dispatch({
          type: "mesSlice/changeMes",
          payload: "hello word!"
        });
      },
      changeNum() {
        dispatch({
          type: "numSlice/addNum",
          payload: 999
        });
      },
      changeNumThunk() {
        dispatch(changeNumThunk());
      }
    };
  }
)(Home);

export default reduxHome;
