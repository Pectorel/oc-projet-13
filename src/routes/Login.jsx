import { useForm } from "react-hook-form";
import style from "../assets/style/login.module.css";
import formStyle from "../assets/style/form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/authActions.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotifBlock from "../components/NotifBlock.jsx";

function Login() {
  const [show_error, setShowError] = useState(false);

  const { register, handleSubmit } = useForm();

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const nav = useNavigate();

  const submitForm = async (data) => {
    data.email = data.email.toLowerCase();
    await dispatch(userLogin(data));
    setShowError(true);
  };

  useEffect(() => {
    if (success) {
      nav("/profile");
    }
  }, [nav, userInfo]);

  return (
    <section className={` ${style.content}`}>
      {error != null && show_error ? (
        <NotifBlock
          className={style.notification}
          type={"error"}
          message={error}
        />
      ) : null}

      <div className={formStyle["form-wrapper"]}>
        <form
          className={`${formStyle["form-flex"]}`}
          onSubmit={handleSubmit(submitForm)}
        >
          <input
            className={formStyle["input-field"]}
            type="email"
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
      </div>
    </section>
  );
}

export default Login;
