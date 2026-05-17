import logo from "../assets/musiccode-logo.png";
import cartIcon from "../assets/white-cart.png";

function Navbar() {
  return (
    <nav className="nav">
      
      <img
        src={logo}
        alt="MusicCode Logo"
        className="nav-logo"
      />

      <ul className="nav__links">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li>
          <a className="contact-btn" href="#contact">
            Contact
          </a>
        </li>
        <li>
          <a className="cart-btn" href="#cart">
            <img
              src={cartIcon}
              alt="Shopping Cart"
              className="cart-icon"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;