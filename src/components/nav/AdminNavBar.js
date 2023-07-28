import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "./rare.jpeg";

export const AdminNavBar = ({ token, setToken, isAdmin, setIsAdmin }) => {
<<<<<<< HEAD
    const navigate = useNavigate();
    const navbar = useRef();
    const hamburger = useRef();

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle("is-active");
        navbar.current.classList.toggle("is-active");
    };

    return (
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
=======
    const navigate = useNavigate()
    const navbar = useRef()
    const hamburger = useRef()

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    return (
        <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={Logo} height="3rem" alt="Rare Logo" /> <h1 className="title is-4">Rare Publishing</h1>
                </a>

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
>>>>>>> f410599777ce7292b809c98b63e0df29fad0a348
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
<<<<<<< HEAD
            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {token ? (
                        <>
                            <Link to="/posts/AdminPosts/AdminAllPosts" className="navbar-item">
                                Posts
                            </Link>
                            <Link to="/categoryManager" className="navbar-item">
                                Category Manager
                            </Link>
                            <Link to="/tagManager" className="navbar-item">
                                Tag Manager
                            </Link>
                            <Link to="/newPost" className="navbar-item">
                                New Post
                            </Link>
                            <Link to="/MyPosts" className="navbar-item">
                                My Posts
                            </Link>
                            <Link to="/userListManager" className="navbar-item">
                                User List
                            </Link>
                        </>
                    ) : (
                        ""
                    )}
=======

            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {
                        token
                            ?
                            <>
                            <Link to="/posts/AdminPosts/AdminAllPosts" className="navbar-item">Posts</Link>
                            <Link to="/categoryManager" className="navbar-item">Category Manager</Link>
                            <Link to="/tagManager" className="navbar-item">Tag Manager</Link>
                            <Link to="/posts/AdminPosts/AdminNewPost" className="navbar-item">New Post</Link>
                            <Link to="/posts/AdminPosts/AdminMyPosts" className="navbar-item">My Posts</Link>
                            </>
                            :
                            ""
                    }
>>>>>>> f410599777ce7292b809c98b63e0df29fad0a348
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {token ? (
                                <button
                                    className="button is-outlined"
                                    onClick={() => {
                                        setToken("");
<<<<<<< HEAD
                                        setIsAdmin(0);
=======
                                        setIsAdmin('');
>>>>>>> f410599777ce7292b809c98b63e0df29fad0a348
                                        navigate("/login");
                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/register" className="button is-link">
                                        Register
                                    </Link>
                                    <Link to="/login" className="button is-outlined">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
<<<<<<< HEAD
          </div>
        </div>
      </div>
    </nav>
  );
=======
                    </div>
                </div>
            </div>
        </nav>
    );
>>>>>>> f410599777ce7292b809c98b63e0df29fad0a348
};
