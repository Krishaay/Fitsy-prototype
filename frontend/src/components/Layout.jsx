import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); 
      } else {
        setShowNavbar(true);   
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="layout-wrapper">
      <header className={`navbar ${showNavbar ? "show" : "hide"}`}>
        <div className="logo">Fitsy</div>

        <nav className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/wardrobe">Wardrobe</Link>
          <Link to="/history">History</Link>

          <button
            id="logout-btn"
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="page-content">
        {children}
      </main>
    </div>
  );
}