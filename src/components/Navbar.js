import { React, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCartState } from '../components/contextReducer';

export default function () {
  const [cart, showCart] = useState(false);
  let data = useCartState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem('authToken') && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/myorders"
                  >
                    MyOrders
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {!localStorage.getItem('authToken') ? (
                <>
                  <Link
                    className="btn bg-white text-success mx-3"
                    to="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className="btn bg-white text-success mx-3"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className="btn bg-white text-success mx-3"
                    onClick={() => showCart(true)}
                  >
                    MyCart{' '}
                    <Badge pill bg="primary">
                      {data.length}
                    </Badge>
                  </div>
                  {cart ? (
                    <Modal onClose={() => showCart(false)}>
                      <Cart />
                    </Modal>
                  ) : null}
                  <div
                    className="btn bg-white text-success mx-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
