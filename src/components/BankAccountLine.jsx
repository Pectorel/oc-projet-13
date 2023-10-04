import PropTypes from "prop-types";

BankAccountLine.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string,
  balanceLabel: PropTypes.string,
};

function BankAccountLine({
  label,
  amount,
  currency = "$",
  balanceLabel = "Available Balance",
}) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{label}</h3>
        <p className="account-amount">
          {currency}
          {amount}
        </p>
        <p className="account-amount-description">{balanceLabel}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

export default BankAccountLine;
