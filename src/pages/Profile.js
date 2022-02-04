import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import UserProfile from "../components/profile";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);

      if (user.length > 0) {
        setUser(user[0]);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, navigate]);

  return user?.username ? (
    <>
      <Header />
      <main className="mx-auto grid max-w-screen-lg p-4 pt-20">
        <UserProfile user={user} />
      </main>
    </>
  ) : null;
}
