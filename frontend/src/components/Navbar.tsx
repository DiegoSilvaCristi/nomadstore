import { Link } from 'react-router-dom';
import { useCart } from './../context/ShoppingCart';
import { Badge } from 'antd';
import shoppingCart from "./../assets/shopping_cart.png"
import nomadLogo from "./../assets/NomadLogoBlack.png"

export default function Navbar() {
    const { cart } = useCart();
    var count = cart && cart["totalQuantity"]

    return (
        <div className="navbar">
            <div className="navbar">
                <Link to="/">
                    <img src={nomadLogo} className="store_logo_icon" alt="Nomad Logo" />
                </Link>
                <Link to="about" className="text">¿Qué es NomadStore?</Link>
            </div>
            
            <div className="shopping_widget">
                <Link to="/cart">
                <Badge count={count} overflowCount={10} offset={[5, 45]}>
                    <img src={shoppingCart} className= "shopping_cart_icon" alt="Shopping Cart" />
                </Badge>
                </Link>
            </div>
        </div>
    );
}
