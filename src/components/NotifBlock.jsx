import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "../assets/style/notif_block.module.css";
import { useRef } from "react";

NotifBlock.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  message: PropTypes.string.isRequired,
};

function NotifBlock({ type = "info", message, className }) {
  const notif_block = useRef(null);

  const closeNotif = () => {
    notif_block.current.classList.remove(styles.open);

    setTimeout(() => {
      notif_block.current.classList.add(styles.closed);
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
