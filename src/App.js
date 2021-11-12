import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import Home from "./Pages/Home/Home/Home";
import Purchase from "./Pages/Home/Purchase/Purchase";
import ShowAllProducts from "./Pages/Home/ShowAllProducts/ShowAllProducts";
import Login from "./Pages/Login/Login/Login";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import Register from "./Pages/Login/Register/Register";
import NotFoundError from "./Pages/Shared/NotFoundError/NotFoundError";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute path="/purchase/:id">
              <Purchase />
            </PrivateRoute>

            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/allProducts">
              <ShowAllProducts />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFoundError />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
