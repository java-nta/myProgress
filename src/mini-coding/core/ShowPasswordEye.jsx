import $ from "jquery";
const ShowPasswordEye = () => {
  const showPassword = (e) => {
    let passwordInputs = document.querySelectorAll("#password, #confirmation");
    passwordInputs.forEach((item) => {
      if (item.type === "password") {
        item.type = "text";
      } else {
        item.type = "password";
      }
    });

    $(".show").toggleClass("text-dingo");
    $(".show").toggleClass("text-light");
  };
  return (
    <button onClick={showPassword} type="button" className="btn">
      <i className="fa fa-eye text-light show"></i>
    </button>
  );
};

export default ShowPasswordEye;
