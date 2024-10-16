import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/chat'
          element={auth?.isLoggedIn ? <Chat /> : <Navigate to='/login' />}
        />
        <Route
          path='/register'
          element={!auth?.isLoggedIn ? <Register /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!auth?.isLoggedIn ? <Login /> : <Navigate to='/' />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
