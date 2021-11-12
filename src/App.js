import { AuthProvider } from './firebase/contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage/';
import PrivateRoute from './components/PrivateRoutes';
import ForgotPassword from './pages/AuthPages/ForgotPassword/';
import SignUp from './pages/AuthPages/SignUp/';
import Login from './pages/AuthPages/Login/';
import ForwardPage from './pages/ForwardPage/';
import { infoRoutes } from './constants/infoRoutes';
import Logo from './components/Logo/';
import Profile from './components/ProfileButton/';
import Info from './components/Info/index';
import Navigation from './router';

const App = () => {
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
