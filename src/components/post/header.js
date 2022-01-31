import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ username }) {
  return (
    <div className="flex p-4">
      <Link to={`/p/${username}`} className="flex items-center">
        <img
          className="mr-3 flex h-8 w-8 shrink-0 rounded-full"
          src={`/images/avatars/${username}.jpg`}
          alt=""
          onError={(e) => {
            e.target.src = `/images/avatars/default.png`;
          }}
        />
        <p className="text-sm font-bold text-gray-700">{username}</p>
      </Link>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
