import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "../assets/style/notif_block.module.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "../redux/authSlice.js";

NotifBlock.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  message: PropTypes.string.isRequired,
};

function NotifBlock({ type = "info", message, className }) {
  const notif_block = useRef(null);
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const closeNotif = () => {
    notif_block.current.classList.remove(styles.open);

    setTimeout(() => {
      notif_block.current.classList.add(styles.closed);
      dispatch(removeError());
    }, 425);
  };

  return (
    <div
      ref={notif_block}
      className={`${styles.notif} ${styles[type]} ${className} ${styles.open}`}
    >
      <span>{message}</span>
      <i className={styles.close} onClick={closeNotif}>
        <FontAwesomeIcon icon={faClose} />
      </i>
    </div>
  );
}

export default NotifBlock;
