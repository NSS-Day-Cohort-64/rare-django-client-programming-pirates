import { Link } from "react-router-dom";

export const AdminNavBar = () => {
  <div>
    <ul>
      <li className="navbar__item active">
        <Link className="navbar__link" to="/INSERT PATH HERE">
          INSERT PATH NAME HERE
        </Link>
        <Link to="/categoryManager" className="navbar-item">
          Categories
        </Link>
        <Link to="/myPosts" className="navbar-item">
          My Posts
        </Link>
      </li>
    </ul>
  </div>;
};
