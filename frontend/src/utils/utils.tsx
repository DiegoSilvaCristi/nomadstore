// Function to generate a random number between min and max
// Obtained from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Capitalize the first letter of a string
// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

export function formatShoppingCart(cart: any) {
    const formattedCart: any[] = [];
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        formattedCart.push({
            productId: element.id,
            price: element.price,
            quantity: element.quantity,
            discount: element.discountedPrice
        });
    }
    return formattedCart
}