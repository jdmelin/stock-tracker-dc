import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppContainer from './containers/AppContainer/AppContainer';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import MyStocks from './containers/MyStocks/MyStocks';
import ProtectedRoute from './containers/ProtectedRoute/ProtectedRoute';
import Register from './containers/Register/Register';
import Stocks from './containers/Stocks/Stocks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppContainer isLoggedIn={isLoggedIn} />}>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home userId={userId} />
              </ProtectedRoute>
            }
          />
          {!isLoggedIn && (
            <Route
              path="/login"
              element={
                <Login
                  onSetIsLoggedIn={setIsLoggedIn}
                  onSetUserId={setUserId}
                />
              }
            />
          )}
          <Route
            path="/logout"
            element={<Logout onSetIsLoggedIn={setIsLoggedIn} />}
          />
          {!isLoggedIn && <Route path="/register" element={<Register />} />}
          <Route
            path="/stocks/:userId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Stocks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-stocks/:userId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MyStocks />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
