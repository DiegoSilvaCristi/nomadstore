from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)

# NomadStore GET home
@app.route('/', methods=['GET'])
def home():
    return "<h1>Welcome to NomadStore</h1>"

# NomadStore POST shopping cart
@app.route('/api/cart', methods=['POST'])
def process_shopping_cart():
    shoppingCart = request.get_json()
    products = get_products_from_api(shoppingCart)
    shoppingCartWithQuantities = get_shopping_cart_products_from_all(shoppingCart, products)
    isThisCartPossible = chek_if_the_cart_is_possible(shoppingCartWithQuantities)
    return jsonify({'shoppingCart': shoppingCartWithQuantities, 'cartPossible': str(isThisCartPossible)})

# As getting the full list of products can take a long time, we can limit the number of products returned by the API
# based on the biggest shopping cart item id
def check_biggest_id(shoppingCart):
    biggestId = 0
    for item in shoppingCart:
        if int(item['productId']) > biggestId:
            biggestId = int(item['productId'])
    return biggestId

def get_products_from_api(shoppingCart):
    # GET products from dummy data API
    productsList = []
    skip = 0
    response = requests.get(f'https://dummyjson.com/products?limit=10&skip={skip}')
    apiResponse = response.json()
    biggestCartId = check_biggest_id(shoppingCart)
    while skip <= biggestCartId:
        productsList.extend(apiResponse['products'])
        skip += 10
        response = requests.get(f'https://dummyjson.com/products?limit=10&skip={skip}')
        apiResponse = response.json()
    return productsList

def get_shopping_cart_products_from_all(shoppingCart, allProducts):
    # As every product in the shopping cart is in the list of products ordered by id, 
    # we can just go throgh the shopping cart and get the product from the list
    print("Shopping cart products:")
    desiredProducts = []
    for element in shoppingCart:
        product = allProducts[int(element['productId'])-1]
        stockReal = product['stock']/product['rating']
        desiredProducts.append({'id': product['id'], 'title': product['title'], 'price': product['price'], 'discount': element['discount'], 'quantity': element['quantity'], 'stock_obtenido': product['stock'], 'rating': product['rating'], 'stock_real': stockReal})
    print(desiredProducts)
    return desiredProducts

def chek_if_the_cart_is_possible(desiredProducts):
    # We check the cart to see if the real stock is greater than the desired quantity
    for product in desiredProducts:
        if product['stock_real'] < product['quantity']:
            return False
    return True

if __name__ == '__main__':
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.run()
