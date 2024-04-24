import { useCart } from './../context/ShoppingCart'; 
import { Alert, Button, Badge, Card, Col } from 'antd';
import { Link } from 'react-router-dom';
import capitalizeFirstLetter from '../utils/capitalizeFirst';

async function emptyShoppingCart(setCart: any) {
    try {
      setCart(null);
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
}

export default function Cart() {
    const { cart, setCart } = useCart();

    if (!cart || cart.products.length === 0) {
        return (
            <div className="page_layout">
                <h1>Shopping Cart</h1>
                <Alert
                    message="Carrito Vacío"
                    description="Actualmente tu carrito está vacío. Puedes volver al menú inicial para generar uno nuevo"
                    type="warning"
                    showIcon
                />
                <Link to="/" className="button_layout">
                    <Button type="default" className="button">Volver</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="page_layout">
            <h1>Shopping Cart</h1>
            <Col>
                {cart.products.map((product: any) => (
                        <Card className="card_layout" 
                            style={{ marginBottom: 32 }}
                            cover={<img alt={product.title} src={product.thumbnail} />}
                        >
                            <Card.Meta title={capitalizeFirstLetter(product.title)} description={`Precio: $${product.price}`} />
                            <Card.Meta description={`Cantidad: ${product.quantity}`} />
                            <div className="discount_section">
                                <Badge offset={[35, 3]} count={`-${product.discountPercentage}%`} color="red">
                                    <Card.Meta className ="original_price" description={`Precio Total: $${product.total}`} />
                                </Badge>
                                <Card.Meta className ="discounted_price" description={`Precio Descuento: $${product.discountedPrice}`} />
                            </div>
                        </Card>
                ))}
            </Col >
            <div className="button_layout">
                <Link to="/">
                    <Button type="default" className="button">Volver</Button>
                </Link>
                <Button type="default" className="button" onClick={() => emptyShoppingCart(setCart)}>Vaciar Carrito</Button> 
                <Link to="/checkout">
                    <Button type="default" className="button">Finalizar Compra</Button>
                </Link>
            </div>
        </div>
    );
}
