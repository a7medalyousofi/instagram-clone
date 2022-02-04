import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

const User = ({ username, fullName, emailAddress }) => (
  <Link
    to={`/p/${username}`}
    className="flex items-center gap-x-6 overflow-hidden border-y border-gray-200 bg-white p-4 sm:rounded-xl sm:border"
  >
    {!username ? (
      <div className="avatar__sm">
        <Skeleton circle height="100%" containerClassName="avatar-skeleton" />
      </div>
    ) : (
      <div className="h-14 w-14 shrink-0 select-none rounded-full bg-gradient-to-t from-black via-white to-red-600 p-[2px] md:h-16 md:w-16 md:p-[3px]">
        <div className="rounded-full bg-white p-[2px] md:p-[3px]">
          <img
            className="h-full w-full rounded-full "
            src={`/images/avatars/${username}.jpg`}
            alt="default avatar"
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
        </div>
      </div>
    )}
    <div className="flex-grow">
      {!fullName ? (
        <Skeleton height="18px" width="75%" count={1} />
      ) : (
        <h3 className="text-sm font-semibold capitalize text-gray-700">
          {fullName}
        </h3>
      )}
      {!emailAddress ? (
        <Skeleton height="18px" count={1} />
      ) : (
        <p className="text-sm font-light text-gray-600">{emailAddress}</p>
      )}
    </div>
  </Link>
);

export default User;

User.propTypes = {
  fullName: PropTypes.string,
  emailAddress: PropTypes.string,
};
