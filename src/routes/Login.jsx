import { useForm } from "react-hook-form";
import style from "../assets/style/login.module.css";
import formStyle from "../assets/style/form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/authActions.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotifBlock from "../components/NotifBlock.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

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
      <div className={`${formStyle["form-wrapper"]} ${style["login-wrapper"]}`}>
        <header>
          <FontAwesomeIcon icon={faUserCircle} />
          <h2>Sign In</h2>
        </header>

        {error != null && show_error ? (
          <NotifBlock
            className={style.notification}
            type={"error"}
            message={error}
          />
        ) : null}

        <form
          className={`${formStyle["form-flex"]}`}
          onSubmit={handleSubmit(submitForm)}
        >
          <label className={`${formStyle["input-label"]}`}>
            Username
            <br />
            <input
              className={formStyle["input-field"]}
              type="email"
              name={"email"}
              {...register("email")}
              required
            />
          </label>

          <label className={`${formStyle["input-label"]}`}>
            Password
            <br />
            <input
              className={formStyle["input-field"]}
              type="password"
              name={"password"}
              {...register("password")}
              required
            />
          </label>

          <label className={`${formStyle["input-checkbox"]}`}>
            <input type="checkbox" />
            Remember me
          </label>

          <button className={formStyle.btn} type="submit" disabled={loading}>
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
