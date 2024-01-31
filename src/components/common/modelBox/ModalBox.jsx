import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "antd";
import propTypes from "prop-types";
import modalBoxStyle from "./ModalBox.module.css";

function ModalBox(props, ref) {
  const { title } = props;

  const [isOpen, setIsOpen] = useState();

  // 确认后关闭
  const handleOk = () => {
    setIsOpen(false);
  };
  // 取消并且关闭
  const handleCancel = () => {
    setIsOpen(false);
  };

  /* ===================================== export ===================================== */
  useImperativeHandle(ref, () => ({
    // 暴露给父组件的方法
    changeIsOpen: (newVal) => {
      setIsOpen(newVal);
    },
  }));

  return (
    <>
      <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel} {...props.attr}>
        <div className={modalBoxStyle["modal-body"]}>{props.children}</div>
      </Modal>
    </>
  );
}

// 类型校验
ModalBox.propTypes = {
  // msg: function (props) {
  //   if (typeof props.msg !== "string") {
  //     throw new Error("msg must be a string");
  //   }
  // },
  msg: propTypes.string,
};
// 默认值
ModalBox.defaultProps = {
  msg: "自定义标题",
  attr: {
    okText: "确定",
    cancelText: "取消",
  },
};

export default forwardRef(ModalBox);
