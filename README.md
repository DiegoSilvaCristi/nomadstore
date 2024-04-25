# NomadStore 

NomadStore es un e-commerce donde podrás generar carritos de compra aleatorios y procesar los datos para el envío. Funciona trayendo información de la API dummyjson (https://dummyjson.com/) y evaluando en el backend la disponibilidad de productos para su envío. 

## Tecnologías

### Backend

El backend del proyecto está hecho en python utilizando Flask. Provee dos enpoints, un GET para saludar y un POST para procesar el carrito de compras que se entrega en unn formato determinado. 

El backend corre en el puerto 3000 y presenta manejo por CORS para la comunicación con el frontend en su respectivo puerto.

#### ¿Cómo correr el backend?   

En primer lugar, hay que asegurarse de tener instaladas todas las tecnologías a utilizar: ```python```, ```Flask```, ```request```, ```jsonify``` y ```requests```. Luego, se puede proceder con: 

1. Activar el entorno virtual
```bash
source venv/bin/activate
```

2. Correr la aplicación
```bash 
python commerce.py
```
### Frontend

Como se explica en el README del frontend, este está construido con una mezcla de React + TypeScript + Vite. A lo largo de los scripts se utilizan distintas librerías para el manejo de los datos y la interfaz, las cuales deben ser instaladas de acuerdo a los pasos siguientes. 

El frontend corre en el puerto 5173 por defecto y es importante que sea así dado que tomé la decisión de sólo permitir CORS para ese puerto en el backend. Si por algún motivo no se puede utilizar, se puede cambiar la configuración del backend modificando la línea 64 del archivo ```commerce.py``` para que diga: 

```bash 
CORS(app, resources={r"/api/*": {"origins": "*"}})
```
#### ¿Cómo correr el frontend?   

En primer lugar, hay que asegurarse de tener instaladas todas las tecnologías a utilizar: ```node```, ```npm```, ```React```, ```TypeScript``` y ```Vite```. Luego, se puede proceder con:

1. Instalar las dependencias
```bash
npm install
```
2. Correr la aplicación
```bash
npm run dev
```

***Es importante comenzar corriendo el backend para que el frontend pueda hacer las peticiones correspondientes.***

## Suepuestos y consideraciones	

Al principio implementé el endpoint trayendo la totalidad de productos cada vez que se hacía una request, sin embargo a veces tomaba mucho tiempo aún cuando habían productos de ID bajo. Entonces, decidí utilizar el máximo Id del carrito como límite de request en la lista de productos. Esto está especificado en el código pero el análisis es el siguiente: 

1. Traer todos los productos cada vez que se hace una request involucra traer 100 productos cada vez. 
2. Los carritos de la API tienen pocos elementos, por lo que aunque el tiempo para buscar el mayor id es lineal, es mucho más rápido que traer todos los productos.
3. En el peor de los casos si será un poco más lento, ya que a la request de traer los productos del 1 al 100 se suma el proceso de buscar el mayor id. Sin embargo, es un proceso que se hace rara vez.
4. Finalmente, si se hace la request con menos de 100 productos, se puede parar la paginación antes, acortando el tiempo de respuesta. Según mis pruebas locales, el tiempo suele ser 1 o 2 segundos más rápido en general.
