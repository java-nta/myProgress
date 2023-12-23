import $ from "jquery";
const ToastMessage = ({ icon, iconColor, headMssg, bodyMssg }) => {
  const close = () => {
    $(".toast-mssg").removeClass("toast-active");
  };
  setTimeout(() => {
    $(".toast-mssg").addClass("toast-active");
  }, 500);
  setTimeout(() => {
    $(".toast-mssg").removeClass("toast-active");
  }, 500 + 5000);
  const classes = (...classe) => classe.filter(Boolean).join(" ");
  return (
    <div className="toast-mssg">
      <div className="d-flex align-items-center gap-4">
        <i className={classes("icon fa ", icon, iconColor)}></i>
        <div className="d-flex flex-column">
          <p className="m-0 fw-bold fs-3 text-dingo">{headMssg}</p>
          <p className="m-0 fw-medium text-light">{bodyMssg}</p>
        </div>
      </div>
      <button type="button" onClick={close} className="toast-close btn">
        <i className="fa fa-close text-light"></i>
      </button>
      <div className="toast-progress"></div>
    </div>
  );
};

export default ToastMessage;
