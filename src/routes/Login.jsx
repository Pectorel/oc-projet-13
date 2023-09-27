import formStyle from "../assets/style/form.module.css";
import { Form } from "react-router-dom";

function Login() {
  return (
    <section className={formStyle["form-wrapper"]}>
      <Form className={formStyle["form-flex"]} method="post">
        <input
          className={formStyle["input-field"]}
          type="text"
          name={"email"}
          placeholder={"Email"}
        />
        <input
          className={formStyle["input-field"]}
          type="password"
          name={"password"}
          placeholder={"Password"}
        />
        <button className={formStyle.btn} type="submit">
          Login
        </button>
      </Form>
    </section>
  );
}

export default Login;
