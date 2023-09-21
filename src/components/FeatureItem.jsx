import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

FeatureItem.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
};
function FeatureItem({ img, alt, children }) {
  return (
    <div className="feature-item">
      <img src={img} alt={alt} className="feature-icon" />
      {children}
    </div>
  );
}

export default FeatureItem;
