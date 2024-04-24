import { Alert, Avatar, Badge, Button, Card, List } from 'antd';
import { useCart } from './../context/ShoppingCart'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { formatShoppingCart } from './../utils/utils';

export default function Checkout() {
    const { cart, setCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    async function emptyShoppingCart(setCart: any) {
        try {
            setCart(null);
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function handleCheckout() {
        try {
            setIsLoading(true);
            const formattedShoppingCart = formatShoppingCart(cart.products);
            const response = await axios.post('http://127.0.0.1:5000/api/cart', formattedShoppingCart);
            // Encode the data and pass it as a URL parameter
            const encodedData = encodeURIComponent(JSON.stringify(response.data));
            window.location.href = `/shipping?shippingInfo=${encodedData}`;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (!cart || cart.products.length === 0) {
        return (
            <div>
                <h1>Checkout</h1>
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
        <div className="checkout_layout">
            <h1>Checkout</h1>
            <div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={cart.products}
                        renderItem={(item: any) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar className="list_photo "src={item.thumbnail} />}
                                    title={item.title}
                                    description={
                                        <div className="product_info">
                                            <p>Precio Individual: ${item.price}</p>
                                            <p>Cantidad: {item.quantity}</p>
                                            <Badge offset={[0, 3]} count={`-${item.discountPercentage}%`} color="red">
                                            </Badge>
                                            <p>Total: ${item.discountedPrice}</p>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                    <Card>
                        <Card.Meta title="Total"/>
                        <div className="discount_section">
                            <p className ="total">Precio Total: ${cart.total}</p>   
                            <p className ="discounted_total">Precio Descuento: ${cart.discountedTotal}</p>
                        </div>
                    </Card>
                </div>
                <div className="button_layout">
                    <Link to="/">
                        <Button type="default" className="button">Volver</Button>
                    </Link>
                    <Button type="default" className="button" onClick={() => emptyShoppingCart(setCart)}>Vaciar Carrito</Button> 
                    <Link to="/shipping">
                        <Button type="default" className="button" id="checkout" onClick={handleCheckout} disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Cotizar despacho'}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
