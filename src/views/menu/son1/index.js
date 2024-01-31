import React, { useRef } from "react";
import { Button, Divider } from "antd";
import ModalBox from "../../../components/common/modelBox/ModalBox";
const MemoModalBox = React.memo(ModalBox);

function Son1() {
  const modalBoxRef = useRef();
  const handleOpenModal = () => {
    //调用子组件暴露给父组件的方法
    modalBoxRef.current.changeIsOpen(true);
  };
  return (
    <div className="son2-page">
      son2-page
      <Button type="primary">primary按钮</Button>
      <Button type="default">default按钮</Button>
      <Divider></Divider>
      <Button type="primary" onClick={handleOpenModal}>
        打开modal弹窗
      </Button>
      {/* <ModalBox ref={modalBoxRef} title="公共弹窗"></ModalBox> */}
      <MemoModalBox ref={modalBoxRef} title="公共弹窗" attr={{ centered: true }}>
        <div>这是一段内容</div>
      </MemoModalBox>
    </div>
  );
}

export default Son1;
