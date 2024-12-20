document.addEventListener('DOMContentLoaded', function () {
    feather.replace();

    const navbarNav = document.querySelector('.navbar-nav');
    const searchForm = document.querySelector('.search-form');
    const searchButton = document.querySelector('#search-button');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const cart = document.querySelector('.shopping-cart');
    const cartButton = document.getElementById('shopping-cart-button');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    // Toggle navbar menu
    hamburgerMenu.addEventListener('click', function () {
        navbarNav.classList.toggle('active');
    });

    // Toggle search form
    searchButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default action to avoid unintended behaviors
        searchForm.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
            navbarNav.classList.remove('active');
        }

        if (!searchForm.contains(e.target) && !searchButton.contains(e.target)) {
            searchForm.classList.remove('active');
        }

        if (!cart.contains(e.target) && !cartButton.contains(e.target)) {
            cart.style.display = 'none';
        }
    });

    // Toggle shopping cart display
    cartButton.addEventListener('click', function (e) {
        e.stopPropagation(); // Stop the click event from propagating to document
        cart.style.display = (cart.style.display === 'block') ? 'none' : 'block';
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart-button').forEach(function (button) {
        button.addEventListener('click', function (event) {
            const product = event.target.closest('.product');
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('.product-price').innerText);

            const cartItem = document.createElement('li');
            cartItem.innerHTML = `${productName} - $${productPrice.toFixed(2)} <button class="remove-item">Remove</button>`;
            cartItems.appendChild(cartItem);

            total += productPrice;
            cartTotal.innerText = total.toFixed(2);

            // Remove item from cart functionality
            cartItem.querySelector('.remove-item').addEventListener('click', function () {
                cartItems.removeChild(cartItem);
                total -= productPrice;
                cartTotal.innerText = total.toFixed(2);
            });
        });
    });

    // Modal box functionality
    const itemDetailModals = document.querySelectorAll('#item-detail-modal');
    const itemDetailButtons = document.querySelectorAll('.item-detail-button');
    const closeModalButtons = document.querySelectorAll('.close');

    itemDetailButtons.forEach(function (btn, index) {
        btn.addEventListener('click', function (e) {
            itemDetailModals[index].style.display = 'flex';
            e.preventDefault();
        });
    });

    closeModalButtons.forEach(function (btn, index) {
        btn.addEventListener('click', function () {
            itemDetailModals[index].style.display = 'none';
        });
    });

    window.addEventListener('click', function (event) {
        itemDetailModals.forEach(function (modal) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Format currency in IDR
    const rupiah = function (number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };
});
