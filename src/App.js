import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading ....</p>}>
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={user ? <Navigate to={ROUTES.DASHBOARD} /> : <Login />}
            />
            <Route
              path={ROUTES.SIGN_UP}
              element={user ? <Navigate to={ROUTES.DASHBOARD} /> : <SignUp />}
            />
            <Route
              path={ROUTES.DASHBOARD}
              element={user ? <Dashboard /> : <Navigate to={ROUTES.LOGIN} />}
            />
            <Route
              path={ROUTES.PROFILE}
              element={user ? <Profile /> : <Navigate to={ROUTES.LOGIN} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
