import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../pages/DashboardPage/Dashboard";
import PrivateRoute from "../router/PrivateRoute";
import ForgotPassword from "../pages/AuthPages/ForgotPassword/ForgotPassword";
import SignUp from "../pages/AuthPages/SignUp/SignUp";
import Login from "../pages/AuthPages/Login/Login"
import ForwardPage from "../pages/ForwardPage/ForwardPage";
import { infoRoutes } from "../router/infoRoutes"
import Logo from "./Logo/Logo";
import Profile from "./ProfileButton/ProfileButton";
import Info from "./Info/Info";
import Navigation from "../router/Navigation/Navigation";

function App() {
  const renderMainPage = () => (
    <>
      <Navigation />
      <Logo />
      <Profile />
      <Route path="/forward" component={ForwardPage} />
      {infoRoutes.map(({ path, fetchPath }) => (
        <Route
          key={fetchPath}
          path={path}
          render={(props) => <Info {...props} fetchPath={fetchPath} />}
        />
      ))}
    </>
  );

  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/" component={renderMainPage} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
