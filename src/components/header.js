import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiHome, FiUser } from "react-icons/fi";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { DEFAULT_IMAGE_PATH } from "../constants/paths";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  return (
    <nav className="fixed top-0 z-50 h-[60px] w-full border-b border-gray-200 bg-white shadow-md shadow-slate-50/50">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex h-[60px] items-center justify-between">
          <Link to={ROUTES.DASHBOARD}>
            <img
              height="28px"
              width="103px"
              className="h-7 w-full"
              src="/images/logo.svg"
              alt="Yemen Photos Logo"
            />
          </Link>
          <div className="flex items-center justify-center gap-6">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} className="">
                  <FiHome className="h-6 w-6" />
                </Link>
                <div className="h-8 w-8 rounded-full bg-gradient-to-t from-black via-white to-red-600 p-[1px] md:p-[2px]">
                  <div className="relative rounded-full">
                    <button
                      type="button"
                      className={`rounded-full bg-white p-[1px] md:p-[2px] ${
                        isOpen ? "" : ""
                      }`}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {user.displayName ? (
                        <img
                          className="select-none rounded-full"
                          src={`/images/avatars/${user.displayName}.jpg`}
                          alt={`${user.displayName}`}
                          onError={(e) => {
                            e.target.src = DEFAULT_IMAGE_PATH;
                          }}
                        />
                      ) : (
                        <img
                          className="h-full w-full select-none"
                          src={`/images/avatars/default.png`}
                          alt="default avatar"
                        />
                      )}
                    </button>

                    {isOpen && (
                      <div className="absolute top-10 right-0 z-10 flex min-w-[150px] flex-col items-center overflow-hidden rounded-md border border-gray-200 bg-white text-left shadow-sm">
                        <Link
                          to={`/p/${user.displayName}`}
                          className="flex w-full cursor-pointer items-center py-2 px-4 hover:bg-slate-50"
                        >
                          <FiUser className="mr-2 h-4 w-4" /> Profile
                        </Link>
                        {/* <div className="flex w-full cursor-pointer items-center py-2 px-4 hover:bg-slate-50">
                        <FiUser className="mr-2 h-4 w-4" /> Profile
                      </div> */}
                        <div
                          className="flex w-full cursor-pointer items-center border-t py-2 px-4 hover:bg-slate-50"
                          onClick={() => firebase.auth().signOut()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") firebase.auth().signOut();
                          }}
                        >
                          <FiLogOut className="mr-2 h-4 w-4" />
                          Log out
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn__sm btn__primary btn--focused"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Log In
                </button>
                <button type="button" className="btn">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
