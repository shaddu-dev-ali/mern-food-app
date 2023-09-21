import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import { CartProvider } from './components/contextReducer';

export default function () {
  return (
    <CartProvider>
      {/* <h1>Hello</h1> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/signup"
            element={<Signup />}
          />
          <Route
            exact
            path="/myorders"
            element={<MyOrder />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}
