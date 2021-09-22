import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";

import ForgotPassword from "./Auth/ForgotPassword";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import ForwardPage from "./ForwardPage/ForwardPage";
import { infoRoutes } from "./Info/infoRoutes";
import Logo from "./Logo/Logo";
import Navigation from "./Navigation/Navigation";
import Profile from "./Auth/ProfileButton";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route
              path="/"
              component={() => (
                <>
                  <Navigation />
                  <Logo />
                  <Profile />
                  <Route path="/forward" component={ForwardPage} />
                  {infoRoutes.map(({ path, component: C, fetchPath }) => (
                    <Route
                      key={fetchPath}
                      path={path}
                      render={(props) => <C {...props} fetchPath={fetchPath} />}
                    />
                  ))}
                </>
              )}
            />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
