import Skeleton from "./skeleton/Skeleton";

const UiDesign = () => {
  return (
    <div className="ui-design mt-5">
      <h1 className="text-dingo mt-5 d-flex align-items-center gap-2">
        <i className="fa fa-chess"></i>
        <span>UI Design</span>
      </h1>
      <div className="d-flex">
        <Skeleton />
      </div>
    </div>
  );
};

export default UiDesign;
