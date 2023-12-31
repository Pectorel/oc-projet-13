import { useDispatch, useSelector } from "react-redux";
import BankAccountLine from "../components/BankAccountLine";
import formStyle from "../assets/style/form.module.css";
import style from "../assets/style/profile.module.css";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { userEdit } from "../redux/authActions";

function Profile() {
  const { register, handleSubmit } = useForm();
  const { userInfo, loading } = useSelector((state) => state.auth);

  const editBtn = useRef(null);
  const userName = useRef(null);
  const editForm = useRef(null);

  const dispatch = useDispatch();

  const toggleEditForm = (show = true) => {
    if (show) {
      editBtn.current.style.display = "none";
      userName.current.style.display = "none";
      editForm.current.style.display = "block";
    } else {
      editBtn.current.style.display = "inline";
      userName.current.style.display = "block";
      editForm.current.style.display = "none";
    }
  };

  const editUser = async (data) => {
    await dispatch(userEdit(data));
    toggleEditForm(false);
  };

  const cancelForm = () => {
    toggleEditForm(false);
  };

  return (
    <section id={`${style["profile"]}`}>
      <div className="header">
        <h1 className={`${style["profile-header"]}`}>
          Welcome back
          <br />
          <span
            ref={userName}
            className={"user-name"}
          >{`${userInfo["firstName"]} ${userInfo["lastName"]} !`}</span>
        </h1>
        <button
          ref={editBtn}
          className={`${style["edit-btn"]}`}
          onClick={toggleEditForm}
        >
          Edit Name
        </button>

        <form
          ref={editForm}
          className={style["edit-form"]}
          onSubmit={handleSubmit(editUser)}
        >
          <div className={style["form-section"]}>
            <input
              className={formStyle["input-field"]}
              type="text"
              defaultValue={userInfo["firstName"]}
              {...register("firstName")}
            />
            <input
              className={formStyle["input-field"]}
              type="text"
              defaultValue={userInfo["lastName"]}
              {...register("lastName")}
            />
          </div>

          <div className={style["form-section"]}>
            <button
              className={formStyle["btn"]}
              type="submit"
              disabled={loading}
            >
              Save
            </button>
            <button
              className={formStyle["btn"]}
              type="button"
              onClick={cancelForm}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <h2 className="sr-only">Accounts</h2>

      <BankAccountLine label="Argent Bank Checking (x8349)" amount="2,082.79" />
      <BankAccountLine label="Argent Bank Savings (x6712)" amount="10,928.42" />
      <BankAccountLine
        label="Argent Bank Credit Card (x8349)"
        amount="184.30"
        balanceLabel={"Current Balance"}
      />
    </section>
  );
}

export default Profile;
