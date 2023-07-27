import "./NavBar.css"
import { AdminNavBar } from "./AdminNavBar"
import { UserNavBar } from "./UserNavBar"

export const NavBar = ({ token, setToken, isAdmin, setIsAdmin }) => {
  return (
<<<<<<< HEAD
    <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" alt="Rare Logo" />{" "}
          <h1 className="title is-4">Rare Publishing</h1>
        </a>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {token ? (
            <>
              <Link to="/" className="navbar-item">
                Posts
              </Link>
              <Link to="/categoryManager" className="navbar-item">
                Categories
              </Link>
              <Link to="/tagManager" className="navbar-item">
                Tags
              </Link>
            </>
          ) : (
            ""
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                token
                  ?
                  <button className="button is-outlined" onClick={() => {
                    setToken('')
                    setIsAdmin(0)
                    navigate('/login')
                  }}>Logout</button>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
=======
    isAdmin ? (
      <AdminNavBar token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    ) : (
      <UserNavBar token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
    )
>>>>>>> 434984b4884cbb58699fb86e301f358233c29dca
  );
};