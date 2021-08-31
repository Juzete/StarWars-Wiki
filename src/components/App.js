import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Models from "./Models/Models";
import ForgotPassword from "./Auth/ForgotPassword";
import SignUp from "./Auth/SignUp"
import Login from "./Auth/Login"
import ForwardPage from "./ForwardPage/ForwardPage";


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
              <Route path="/models" component={Models} />
              <Route path="/forward" component={ForwardPage} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
  );
}

export default App;
