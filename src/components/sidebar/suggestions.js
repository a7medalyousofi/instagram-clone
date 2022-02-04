import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";

export default function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return (
    <div className="flex flex-col space-y-4 overflow-hidden border-y border-gray-200 bg-white p-4 shadow-md shadow-slate-300/10 sm:border md:rounded-xl">
      <div className="align-items flex items-center justify-between text-sm">
        <p className="font-semibold text-gray-600">Suggestions for you</p>
      </div>
      {!profiles ? (
        <div className="grid grid-cols-6 items-center gap-4">
          <div className="avatar avatar__sm shrink-0">
            <Skeleton
              circle
              height="100%"
              count={1}
              containerClassName="avatar-skeleton"
            />
          </div>
          <div className="col-span-4 flex-grow">
            <Skeleton height="18px" width="100%" count={1} />
          </div>
          <div className="flex-grow">
            <Skeleton height="18px" width="100%" count={1} />
          </div>
        </div>
      ) : profiles.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 md:grid-cols-none">
          {profiles.map((profile) => (
            <SuggestedProfile
              key={profile.docId}
              profileDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
              loggedInUserDocId={loggedInUserDocId}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
