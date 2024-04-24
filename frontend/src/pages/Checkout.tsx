import { Alert, Avatar, Badge, Button, List } from 'antd';
import { useCart } from './../context/ShoppingCart'; 
import { Link } from 'react-router-dom';

async function emptyShoppingCart(setCart: any) {
    try {
      setCart(null);
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
}

export default function Checkout() {
    const { cart, setCart } = useCart();

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
        <div>
            <h1>Checkout</h1>
            <div className="checkout_layout">
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
                                            <Badge offset={[35, 3]} count={`-${item.discountPercentage}%`} color="red">
                                            </Badge>
                                            <p>Total: ${item.discountedPrice}</p>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <div className="button_layout">
                    <Link to="/">
                        <Button type="default" className="button">Volver</Button>
                    </Link>
                    <Button type="default" className="button" onClick={() => emptyShoppingCart(setCart)}>Vaciar Carrito</Button> 
                    <Button type="default" className="button" id="checkout">Cotizar despacho</Button>
                </div>
            </div>
        </div>
    );
}
