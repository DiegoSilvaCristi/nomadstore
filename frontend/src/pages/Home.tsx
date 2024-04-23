import storeLogo from "./../assets/store_logo.png"
import { Button } from "antd"

export default function Home() {
    return (
        <div className="page_layout">
            <h1>¡Bienvenido a NomadStore!</h1>
            <img src={storeLogo} className= "store_logo_img" />
            <p>En NomadStore podrás generar carritos de compra aleatorios para descubrir los mejores productos.</p>
            <div className="button_layout">
                <Button type="primary" className="button">Generar Carrito</Button>
                <Button type="primary" className="button">Finalizar Compra</Button>
            </div>
        </div>
    )
}