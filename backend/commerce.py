from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# NomadStore GET home
@app.route('/', methods=['GET'])
def home():
    return "<h1>Welcome to NomadStore</h1>"



# NomadStore POST shopping cart
@app.route('/api/cart', methods=['POST'])
def create_data():
    shoppingCart = request.get_json()
    products = get_products(shoppingCart)
    print("Products:", products)
    return jsonify({'message': 'Data created successfully', 'data': products})

# As getting the full list of products can take a long time, we can limit the number of products returned by the API
# based on the biggest shipping cart item id
def check_biggest_id(shoppingCart):
    biggestId = 0
    for item in shoppingCart:
        if int(item['productId']) > biggestId:
            biggestId = int(item['productId'])
    return biggestId

def get_products(shoppingCart):
    # GET products from dummy data API
    productsList = []
    skip = 0
    response = requests.get(f'https://dummyjson.com/products?limit=10&skip={skip}')
    apiResponse = response.json()
    while skip <= check_biggest_id(shoppingCart):
        productsList.extend(apiResponse['products'])
        skip += 10
        response = requests.get(f'https://dummyjson.com/products?limit=10&skip={skip}')
        apiResponse = response.json()
    return productsList

if __name__ == '__main__':
    app.run()
