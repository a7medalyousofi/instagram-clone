import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Footer({ username, caption }) {
  return (
    <div className="flex space-x-3 p-4 pt-0">
      <Link to={`/p/${username}`} className="hover:underline">
        <h3 className="text-sm font-semibold text-gray-800">{username}</h3>
      </Link>
      <p className="text-sm text-gray-600">{caption}</p>
    </div>
  );
}

Footer.propTypes = {
  username: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
