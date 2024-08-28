// This is the boilerplate code given for you
// You can modify this code
// Product data
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart from session storage or initialize as empty array
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.getAttribute('data-id'));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ''; // Clear current cart display
  cart.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners to "Remove" buttons
  document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = parseInt(event.target.getAttribute('data-id'));
      removeFromCart(productId);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem('cart');
  renderCart();
}

// Add event listener to clear cart button
clearCartBtn.addEventListener('click', clearCart);

// Initial render
renderProducts();
renderCart();
