import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserPhotosByUsername } from "../../services/firebase";
import Header from "./header";
import Photos from "./photos";

export default function Profile({ user }) {
  const reducer = (state, newState) => ({
    ...state,
    ...newState,
  });

  const initialState = { profile: {}, photoCollection: [], followerCount: 0 };

  const [{ profile, photoCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);

      dispatch({
        profile: user,
        photoCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <>
      <Header
        photosCount={photoCollection ? photoCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photoCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
