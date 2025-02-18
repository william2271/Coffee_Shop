import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './Header.css';

const Header = () => {
  const authContext = useContext(AuthContext);

  // Check if the context is available
  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { username, role, setUsername, setRole } = authContext;

  // Logout function to clear user data and reset context state
  const logout = () => {
    setUsername('');
    setRole('unauthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  return (
    <nav className="navbar navbar-expand-lg mocha">
      <div className="container-fluid new_font">
        <a className="navbar-brand">
          <Link to="/" className="nav-link new_font">Brew and Bean Café</Link>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link new_font">Home</Link>
            </li>
            {!username ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link new_font">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/createaccount" className="nav-link new_font">Create Your Account</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" onClick={logout} className="nav-link btn btn-link new_font">Logout</Link>
                </li>
                <li className="nav-item">
              <Link to="/menu" className="nav-link new_font">Menu</Link>
            </li>
              </>
              
            )}
            
            {role === 'ADMIN' && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link new_font">Admin</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;