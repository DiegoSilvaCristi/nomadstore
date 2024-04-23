import { useCart } from './../context/ShoppingCart'; 

export default function Cart() {
    const { cart } = useCart();

    return (
        <div className="page_layout">
            <h1>Shopping Cart</h1>
            {cart && (
                <div className="cart">
                    <div className="cart-items">
                        {cart.products.map(product => (
                            <div key={product.id} className="cart-item">
                                <img src={product.thumbnail} alt={product.title} className="item-thumbnail" />
                                <div className="item-details">
                                    <h2>{product.title}</h2>
                                    <p>Price: ${product.price}</p>
                                    <p>Quantity: {product.quantity}</p>
                                    <p>Total: ${product.total}</p>
                                    <p>Discount Percentage: {product.discountPercentage}%</p>
                                    <p>Discounted Price: ${product.discountedPrice}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Summary</h2>
                        <p>Total Price: ${cart.total}</p>
                        <p>Discounted Total: ${cart.discountedTotal}</p>
                        <p>Total Products: {cart.totalProducts}</p>
                        <p>Total Quantity: {cart.totalQuantity}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
