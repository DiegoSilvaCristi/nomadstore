import { Link } from "react-router-dom";
import shoppingCart from "./../assets/shopping_cart.png"
import nomadLogo from "./../assets/NomadLogoBlack.png"

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar">
                <Link to="/">
                    <img src={nomadLogo} className="store_logo_icon" />
                </Link>
                <Link to="about" className="text">About</Link>
            </div>
            <Link to="/cart">
                <img src={shoppingCart} className= "shopping_cart_icon" />
            </Link>
        </div>
    )
}