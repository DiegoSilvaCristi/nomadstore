import storeLogo from './../assets/store_logo.png';
import { Button, List } from 'antd';
import axios from 'axios';
import getRandomInt from './../utils/randomNumber';
import { useCart } from './../context/ShoppingCart'; 

async function getShoppingCart(setCart: any) {
  try {
    const number = getRandomInt(1, 20);
    const response = await axios.get('https://dummyjson.com/carts/' + number);
    setCart(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Home() {
    const { setCart } = useCart();

    const data = [
        '1. Puedes generar un carrito de compra aleatorio con el botón: "Generar Carrito"',
        '2. Para ver tu carrito, pincha el icono de carrito de la esquina superior derecha. El número en el icono indica la cantidad de productos en tu carrito.',
        '3. Para proceder con la compra, pincha el botón: "Finalizar Compra"',
        '4. Tranquilo, siempre puedes volver al inicio pinchando el logo de NomadStore en la esquina superior izquierda.', 
      ];

  return (
    <div className="page_layout">
      <h1>¡Bienvenido a NomadStore!</h1>
      <img src={storeLogo} className="store_logo_img" alt="Store Logo" />
      <p>En NomadStore podrás generar carritos de compra aleatorios para descubrir los mejores productos.</p>
      <div>
        <h3>¿Cómo comprar?</h3>
        <List
            size="default"
            bordered
            dataSource={data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
            />
      </div>
      <div className="button_layout">
        <Button type="default" className="button" onClick={() => getShoppingCart(setCart)}>Generar Carrito</Button>
        <Button type="default" className="button">Finalizar Compra</Button>
      </div>
    </div>
  );
}
