import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import { DEFAULT_IMAGE_PATH } from "../../constants/paths";

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername,
  },
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);
  console.log("user", user);

  return (
    <>
      <div className="grid grid-cols-3 items-center gap-4 overflow-hidden rounded-xl border border-gray-200 bg-white py-4 px-4 md:gap-8 md:py-8">
        {user.username ? (
          <div className="col-span-1 mx-auto h-20 w-20 select-none rounded-full bg-gradient-to-t from-black via-white to-red-600 p-[2px] md:h-40 md:w-40 md:p-1">
            <div className="rounded-full bg-white p-[2px] md:p-1">
              <img
                className="h-full w-full rounded-full"
                alt={`${user.username} profile picture`}
                src={`/images/avatars/${profileUsername}.jpg`}
                onError={(e) => {
                  e.target.src = DEFAULT_IMAGE_PATH;
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex-grow">
            <Skeleton circle height={160} width={160} count={1} />
          </div>
        )}
        <div className="col-span-2 space-y-2 md:space-y-2">
          {/* Username + follow button */}
          <div className="flex items-center justify-start space-x-4 md:space-x-8">
            {!profileUsername ? (
              <div style={{ lineHeight: 1 }}>
                <Skeleton count={1} width={100} height={32} />
              </div>
            ) : (
              <p className="text-2xl">{profileUsername}</p>
            )}

            {!activeBtnFollow && isFollowingProfile === null ? (
              <div style={{ lineHeight: 1 }}>
                <Skeleton count={1} width={70} height={26} />
              </div>
            ) : (
              activeBtnFollow && (
                <button
                  className={`btn btn__sm ${
                    isFollowingProfile ? "btn__outlined" : "btn__primary"
                  } md:mt-0`}
                  type="button"
                  onClick={handleToggleFollow}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleToggleFollow();
                    }
                  }}
                >
                  {isFollowingProfile ? "Unfollow" : "Follow"}
                </button>
              )
            )}
          </div>
          {/* Full Name */}
          {!fullName ? (
            <div style={{ lineHeight: 1 }}>
              <Skeleton count={1} width={150} height={24} />
            </div>
          ) : (
            <h2 className="font-medium capitalize">{fullName}</h2>
          )}

          {/* Post + Followers + Following Counts */}
          <div className="space-y-2 md:space-y-4">
            {!followerCount || !following ? (
              <div className="flex space-x-4 md:space-x-8">
                <div
                  style={{ lineHeight: 1 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Skeleton count={1} width={20} height={24} />
                  <Skeleton count={1} width={37} height={21} />
                </div>
                <div
                  style={{ lineHeight: 1 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Skeleton count={1} width={20} height={24} />
                  <Skeleton count={1} width={67} height={21} />
                </div>
                <div
                  style={{ lineHeight: 1 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Skeleton count={1} width={20} height={24} />
                  <Skeleton count={1} width={68} height={21} />
                </div>
              </div>
            ) : (
              <ul className="flex space-x-4 md:space-x-8">
                <li className="flex flex-col items-center justify-center text-gray-400">
                  <span className="mr-1 font-bold text-gray-600">
                    {photosCount}
                  </span>
                  {photosCount > 1 ? "Posts" : "Post"}
                </li>
                <li className="flex flex-col items-center justify-center text-gray-400">
                  <span className="mr-1 font-bold text-gray-600">
                    {followerCount}
                  </span>
                  {followerCount === 1 ? `Follower` : `Followers`}
                </li>
                <li className="flex flex-col items-center justify-center text-gray-400">
                  <span className="mr-1 font-bold text-gray-600">
                    {following.length}
                  </span>
                  Following
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};
