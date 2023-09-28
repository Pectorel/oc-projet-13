import { useForm } from "react-hook-form";
import formStyle from "../assets/style/form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/authActions.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const { register, handleSubmit } = useForm();

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const nav = useNavigate();
  const submitForm = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(userLogin(data));
  };

  useEffect(() => {
    console.log("Works");
    if (success) {
      nav("/profile");
    }
  }, [nav, userInfo]);

  return (
    <section className={formStyle["form-wrapper"]}>
      <form
        className={formStyle["form-flex"]}
        onSubmit={handleSubmit(submitForm)}
      >
        <input
          className={formStyle["input-field"]}
          type="text"
          name={"email"}
          placeholder={"Email"}
          {...register("email")}
          required
        />
        <input
          className={formStyle["input-field"]}
          type="password"
          name={"password"}
          placeholder={"Password"}
          {...register("password")}
          required
        />
        <button className={formStyle.btn} type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
