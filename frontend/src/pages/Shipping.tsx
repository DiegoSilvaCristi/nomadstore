import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Button, Form, Radio, Input, InputNumber, message } from 'antd';
import { Link } from 'react-router-dom';

export default function Shipping() {
    const location = useLocation();
    const [shippingInfo, setShippingInfo] = useState(null);
    const { TextArea } = Input;

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'This is a success message',
        });
        <Link to="/">
        </Link>
      };

    useEffect(() => {
        const fetchShippingInfo = async () => {
            const params = new URLSearchParams(location.search);
            const encodedData = params.get('shippingInfo');
            if (encodedData) {
                try {
                    const decodedData = decodeURIComponent(encodedData);
                    const parsedData = JSON.parse(decodedData);
                    setShippingInfo(parsedData);
                } catch (error) {
                    console.error('Error parsing shipping info:', error);
                    setShippingInfo(null);
                }
            }
        };

        fetchShippingInfo();
    }, [location.search]);

    if (!shippingInfo) {
        return (
            <div className="page_layout">
                <Button type="primary" className='loading_button' loading>
                    Comprobando disponibilidad
                </Button>
            </div>
        );
    }

    console.log("Carrito con cantidades:", shippingInfo["shoppingCart"])

    if (shippingInfo["cartPossible"] === 'False') {
        return (
            <div className="checkout_layout">
                <Alert
                    message="No hay envíos disponibles :(" className="shipping_alert"
                    description="Lo sentimos, uno o más productos de tu carrito no están disponibles en stock. Si quieres, puedes probar con otro carrito."
                    type="error"
                    showIcon
                />
                <Link to="/" className="button_layout">
                    <Button type="default" className="button">Volver</Button>
                </Link>
            </div>
        );
    }
    else{
        return (
            <div className="checkout_layout">
                <Alert
                    message="Envío Nomad ⚡$3670" className="shipping_alert"
                    description="Para confirmar pedido ingresa tus datos y presiona el botón 'Confirmar Pedido'"
                    type="info"
                    showIcon
                />
                <div className="form">
                    <h2 className="title">Información de envío</h2>
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        layout="horizontal"
                        >
                        <Form.Item label="Documento">
                        <Radio.Group>
                            <Radio value="boleta"> Boleta </Radio>
                            <Radio value="factura"> Factura </Radio>
                        </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Nombre">
                        <Input />
                        </Form.Item>
                        <Form.Item label="Apellidos">
                        <Input />
                        </Form.Item>
                        <Form.Item label="Región">
                        <Input />
                        </Form.Item>
                        <Form.Item label="Comuna">
                        <Input />
                        </Form.Item>
                        <Form.Item label="Calle">
                        <Input />
                        </Form.Item>
                        <Form.Item label="Número">
                        <InputNumber />
                        </Form.Item>
                        <Form.Item label="Notas">
                            <TextArea rows={3} />
                        </Form.Item>
                    </Form>
                </div>
                <div className="button_layout">
                    <Link to="/cart">
                        <Button type="default" className="button">Volver</Button>
                    </Link>
                    <Link to="/">
                        <Button type="default" className="button" >Confirmar Pedido</Button>
                    </Link>
                </div>

            </div>
        );
    }
}

