import { useSelector } from "react-redux";
import BankAccountLine from "../components/BankAccountLine";

function Profile() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section id="profile">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {`${userInfo["firstName"]} ${userInfo["lastName"]} !`}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>

      <BankAccountLine label="Argent Bank Checking (x8349)" amount="2,082.79" />
      <BankAccountLine label="Argent Bank Savings (x6712)" amount="10,928.42" />
      <BankAccountLine
        label="Argent Bank Checking (x8349)"
        amount="184.30"
        balanceLabel={"Current Balance"}
      />
    </section>
  );
}

export default Profile;
