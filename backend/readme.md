## Activate the virtual environment
source venv/bin/activate
deactivate

## Install Flask
pip install flask

## Run the Flask application
python commerce.py

# Supuestos y consideraciones

Al principio implementé el endpoint trayendo la totalidad de productos cada vez que se hacía una request, sin embargo a veces tomaba mucho tiempo aún cuando habían productos de ID bajo. Entonces, decidí utilizar el máximo Id del carrito como límite de request en la lista de productos. 

Consideré el descuento total como el descuento que se incluye en el carrito de compras

# BORRAR DESPUÉS
curl -X POST -H "Content-Type: application/json" -d '[
    {
        "productId": "1",
        "price": 50,
        "quantity": 2,
        "discount": 10
    },
    {
        "productId": "3",
        "price": 15,
        "quantity": 3,
        "discount": 2
    }
]' http://127.0.0.1:5000/api/cart