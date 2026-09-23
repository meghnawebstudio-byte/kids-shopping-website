const products = [
    {
        id: 1,
        name: "Teddy Bear",
        category: "Toys",
        emoji: "🧸",
        price: 499,
        oldPrice: 699,
        rating: "⭐⭐⭐⭐⭐",
        description: "A soft and cuddly teddy bear for endless hugs and fun.",
        stock: "In Stock",
        isNew: true
    },
    {
        id: 2,
        name: "Color Drawing Set",
        category: "Art",
        emoji: "🎨",
        price: 299,
        oldPrice: 399,
        rating: "⭐⭐⭐⭐⭐",
        description: "A colorful drawing set for creative little artists.",
        stock: "In Stock",
        isNew: false
    },
    {
        id: 3,
        name: "Toy Racing Car",
        category: "Vehicles",
        emoji: "🚗",
        price: 349,
        oldPrice: 499,
        rating: "⭐⭐⭐⭐",
        description: "A fun racing car for exciting indoor adventures.",
        stock: "In Stock",
        isNew: true
    },
    {
        id: 4,
        name: "Cute School Bag",
        category: "School",
        emoji: "🎒",
        price: 799,
        oldPrice: 999,
        rating: "⭐⭐⭐⭐⭐",
        description: "A colorful and comfortable school bag for kids.",
        stock: "In Stock",
        isNew: false
    },
    {
        id: 5,
        name: "Building Blocks",
        category: "Toys",
        emoji: "🧩",
        price: 599,
        oldPrice: 799,
        rating: "⭐⭐⭐⭐⭐",
        description: "Build amazing shapes and structures with these blocks.",
        stock: "In Stock",
        isNew: true
    },
    {
        id: 6,
        name: "Color Pencils",
        category: "Art",
        emoji: "✏️",
        price: 199,
        oldPrice: 249,
        rating: "⭐⭐⭐⭐",
        description: "Bright and smooth color pencils for creative activities.",
        stock: "In Stock",
        isNew: false
    },
    {
        id: 7,
        name: "Toy Airplane",
        category: "Vehicles",
        emoji: "✈️",
        price: 449,
        oldPrice: 599,
        rating: "⭐⭐⭐⭐⭐",
        description: "A fun toy airplane for imaginative play.",
        stock: "In Stock",
        isNew: true
    },
    {
        id: 8,
        name: "Kids Notebook",
        category: "School",
        emoji: "📚",
        price: 149,
        oldPrice: 199,
        rating: "⭐⭐⭐⭐",
        description: "A cute notebook for school notes, drawings and ideas.",
        stock: "In Stock",
        isNew: false
    },
    {
        id: 9,
        name: "Colorful Kite",
        category: "Toys",
        emoji: "🪁",
        price: 249,
        oldPrice: 349,
        rating: "⭐⭐⭐⭐⭐",
        description: "A bright colorful kite for outdoor fun.",
        stock: "In Stock",
        isNew: true
    },
    {
        id: 10,
        name: "Plush Bunny",
        category: "Toys",
        emoji: "🐰",
        price: 399,
        oldPrice: 549,
        rating: "⭐⭐⭐⭐⭐",
        description: "A cute plush bunny that makes a lovely little friend.",
        stock: "In Stock",
        isNew: true
    },
    {
        id: 11,
        name: "Big Crayon Box",
        category: "Art",
        emoji: "🖍️",
        price: 249,
        oldPrice: 329,
        rating: "⭐⭐⭐⭐⭐",
        description: "A fun box of bright crayons for creative drawing.",
        stock: "In Stock",
        isNew: false
    },
    {
        id: 12,
        name: "Kids Football",
        category: "Games",
        emoji: "⚽",
        price: 299,
        oldPrice: 399,
        rating: "⭐⭐⭐⭐",
        description: "A lightweight football for fun games and activities.",
        stock: "In Stock",
        isNew: true
    },
    {
        id: 13,
        name: "Learning Abacus",
        category: "School",
        emoji: "🧮",
        price: 349,
        oldPrice: 449,
        rating: "⭐⭐⭐⭐⭐",
        description: "A colorful learning abacus for practicing numbers.",
        stock: "In Stock",
        isNew: false
    },
    {
        id: 14,
        name: "Mini Game Controller",
        category: "Games",
        emoji: "🎮",
        price: 699,
        oldPrice: 899,
        rating: "⭐⭐⭐⭐",
        description: "A fun game controller designed for playful activities.",
        stock: "In Stock",
        isNew: true
    }
];

let wishlist =
    JSON.parse(localStorage.getItem("happyWishlist")) || [];

let cart =
    JSON.parse(localStorage.getItem("happyCart")) || [];

let reviews =
    JSON.parse(localStorage.getItem("happyReviews")) || {};

let currentCategory = "All";
let currentReviewProduct = null;
let notificationTimer;


/* =========================
   SAVE DATA
========================= */

function saveData() {
    localStorage.setItem(
        "happyWishlist",
        JSON.stringify(wishlist)
    );

    localStorage.setItem(
        "happyCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "happyReviews",
        JSON.stringify(reviews)
    );
}


/* =========================
   CUTE NOTIFICATIONS
========================= */

function showNotification(title, message, icon = "🌈") {

    const box =
        document.getElementById("cuteNotification");

    if (!box) return;

    document.getElementById(
        "notificationTitle"
    ).textContent = title;

    document.getElementById(
        "notificationMessage"
    ).textContent = message;

    document.getElementById(
        "notificationIcon"
    ).textContent = icon;

    box.classList.add("show");

    clearTimeout(notificationTimer);

    notificationTimer =
        setTimeout(hideNotification, 3500);
}


function hideNotification() {

    const box =
        document.getElementById("cuteNotification");

    if (box) {
        box.classList.remove("show");
    }
}


/* =========================
   PRODUCTS
========================= */

function displayProducts(list = products) {

    const container =
        document.getElementById("productsContainer");

    if (!container) return;

    if (!list.length) {

        container.innerHTML = `
            <div style="grid-column:1/-1;">
                <h3>😔 No products found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }

    container.innerHTML =
        list.map(product => {

            const saved =
                wishlist.includes(product.id);

            const discount =
                Math.round(
                    ((product.oldPrice - product.price) /
                    product.oldPrice) * 100
                );

            return `
                <div class="product-card">

                    <span class="sale-badge">
                        🔥 ${discount}% OFF
                    </span>

                    ${
                        product.isNew
                        ? `<span class="new-badge">🆕 NEW</span>`
                        : ""
                    }

                    <div class="product-image-box">
                        <div class="product-emoji">
                            ${product.emoji}
                        </div>
                    </div>

                    <h3>${product.name}</h3>

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <div class="rating">
                        ${product.rating}
                    </div>

                    <div class="price">
                        <span class="old-price">
                            ₹${product.oldPrice}
                        </span>
                        ₹${product.price}
                    </div>

                    <span class="discount">
                        💰 Save ₹${product.oldPrice - product.price}
                    </span>

                    <div class="product-buttons">

                        <button
                            class="details-btn"
                            onclick="showProductDetails(${product.id})">
                            👀 Details
                        </button>

                        <button
                            class="buy-btn"
                            onclick="addToCart(${product.id})">
                            🛒 Add
                        </button>

                        <button
                            class="wishlist-btn"
                            onclick="toggleWishlist(${product.id})">
                            ${saved ? "❤️ Saved" : "♡ Wishlist"}
                        </button>

                    </div>

                </div>
            `;

        }).join("");
}


/* =========================
   CATEGORY FILTER
========================= */

function filterProducts(category) {

    currentCategory = category;

    searchProducts();

    showNotification(
        `${category} Time! 🎀`,
        category === "All"
            ? "Showing all our fun products!"
            : `Showing our cute ${category} products!`,
        "🌈"
    );
}


/* =========================
   SEARCH
========================= */

function searchProducts() {

    const input =
        document.getElementById("searchInput");

    const text =
        input
            ? input.value.toLowerCase().trim()
            : "";

    let result = products;

    if (currentCategory !== "All") {

        result =
            result.filter(
                product =>
                    product.category === currentCategory
            );
    }

    if (text) {

        result =
            result.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(text) ||

                    product.category
                        .toLowerCase()
                        .includes(text)
            );
    }

    displayProducts(result);
}


/* =========================
   SCROLL TO PRODUCTS
========================= */

function scrollToProducts() {

    const section =
        document.getElementById("products");

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================
   WISHLIST
========================= */

function toggleWishlist(id) {

    const product =
        products.find(p => p.id === id);

    if (!product) return;

    if (wishlist.includes(id)) {

        wishlist =
            wishlist.filter(
                productId => productId !== id
            );

        showNotification(
            "Wishlist Updated 💕",
            `${product.name} removed from your wishlist.`,
            "🌷"
        );

    } else {

        wishlist.push(id);

        showNotification(
            "Yay! Saved! 💖",
            `${product.name} is now in your wishlist!`,
            "❤️"
        );
    }

    saveData();

    updateWishlist();

    searchProducts();
}


function updateWishlist() {

    const count =
        document.getElementById("wishlistCount");

    const box =
        document.getElementById("wishlistContainer");

    if (!count || !box) return;

    count.textContent = wishlist.length;

    if (!wishlist.length) {

        box.innerHTML = `
            <div class="wishlist-item">
                <div>
                    <h3>💖 Your wishlist is empty</h3>
                    <p>Add products you love and they will appear here! 🌈</p>
                </div>
            </div>
        `;

        return;
    }

    box.innerHTML =
        wishlist.map(id => {

            const product =
                products.find(
                    p => p.id === id
                );

            if (!product) return "";

            return `
                <div class="wishlist-item">

                    <div class="item-info">

                        <div class="item-emoji">
                            ${product.emoji}
                        </div>

                        <div>
                            <h3>${product.name}</h3>
                            <p>₹${product.price}</p>
                        </div>

                    </div>

                    <div>

                        <button
                            class="buy-btn"
                            onclick="addToCart(${product.id})">
                            🛒 Add to Cart
                        </button>

                        <button
                            class="remove-btn"
                            onclick="toggleWishlist(${product.id})">
                            ❌ Remove
                        </button>

                    </div>

                </div>
            `;

        }).join("");
}


/* =========================
   CART
========================= */

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    if (!product) return;

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

        showNotification(
            "More Fun Added! 🛒",
            `${product.name} quantity increased to ${existing.quantity}.`,
            "🎁"
        );

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

        showNotification(
            "Yay! Added to Cart! 🛒",
            `${product.name} is ready for shopping!`,
            "🛍️"
        );
    }

    saveData();

    updateCart();
}


function updateCart() {

    const box =
        document.getElementById("cartContainer");

    const countElement =
        document.getElementById("cartCount");

    if (!box || !countElement) return;

    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    countElement.textContent = count;

    if (!cart.length) {

        box.innerHTML = `
            <div class="cart-item">
                <div>
                    <h3>🛒 Your cart is empty</h3>
                    <p>Add some fun products and they will appear here! 🎁</p>
                </div>
            </div>
        `;

        setTotals(0, 0);

        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    box.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            if (!product) return "";

            totalItems += item.quantity;

            totalPrice +=
                product.price * item.quantity;

            return `
                <div class="cart-item">

                    <div class="item-info">

                        <div class="item-emoji">
                            ${product.emoji}
                        </div>

                        <div>
                            <h3>${product.name}</h3>
                            <p>₹${product.price} each</p>
                        </div>

                    </div>

                    <div>

                        <button
                            class="details-btn"
                            onclick="changeQuantity(${product.id}, -1)">
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            class="details-btn"
                            onclick="changeQuantity(${product.id}, 1)">
                            +
                        </button>

                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${product.id})">
                            ❌ Remove
                        </button>

                    </div>

                    <strong>
                        ₹${product.price * item.quantity}
                    </strong>

                </div>
            `;

        }).join("");

    setTotals(totalItems, totalPrice);
}


function setTotals(items, price) {

    const totalItems =
        document.getElementById("totalItems");

    const totalPrice =
        document.getElementById("totalPrice");

    const finalPrice =
        document.getElementById("finalPrice");

    if (totalItems)
        totalItems.textContent = items;

    if (totalPrice)
        totalPrice.textContent = price;

    if (finalPrice)
        finalPrice.textContent = price;
}


function changeQuantity(id, change) {

    const item =
        cart.find(
            product => product.id === id
        );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product => product.id !== id
            );

        showNotification(
            "Removed from Cart 🌷",
            "You can add it again anytime!",
            "🧸"
        );

    } else {

        const product =
            products.find(p => p.id === id);

        showNotification(
            "Cart Updated 🛒",
            `${product.name} quantity: ${item.quantity}`,
            "✨"
        );
    }

    saveData();

    updateCart();
}


function removeFromCart(id) {

    const product =
        products.find(p => p.id === id);

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveData();

    updateCart();

    if (product) {

        showNotification(
            "Cart Updated 💕",
            `${product.name} was removed from your cart.`,
            "🌷"
        );
    }
}


/* =========================
   PRODUCT DETAILS
========================= */

function showProductDetails(id) {

    const product =
        products.find(p => p.id === id);

    if (!product) return;

    currentReviewProduct = id;

    document.getElementById(
        "modalEmoji"
    ).textContent = product.emoji;

    document.getElementById(
        "modalName"
    ).textContent = product.name;

    document.getElementById(
        "modalRating"
    ).textContent = product.rating;

    document.getElementById(
        "modalDescription"
    ).textContent = product.description;

    document.getElementById(
        "modalOldPrice"
    ).textContent = `₹${product.oldPrice}`;

    document.getElementById(
        "modalPrice"
    ).textContent = `₹${product.price}`;

    document.getElementById(
        "modalStock"
    ).textContent = `✅ ${product.stock}`;

    document.getElementById(
        "modalCartButton"
    ).onclick = function () {

        addToCart(id);
    };

    displayReviews(id);

    document.getElementById(
        "productModal"
    ).style.display = "flex";
}


function closeProductModal() {

    const modal =
        document.getElementById("productModal");

    if (modal) {
        modal.style.display = "none";
    }
}


/* =========================
   REVIEWS
========================= */

function displayReviews(id) {

    const box =
        document.getElementById(
            "reviewsContainer"
        );

    if (!box) return;

    const list =
        reviews[id] || [];

    if (!list.length) {

        box.innerHTML = `
            <div class="no-reviews">
                💬 No reviews yet. Be the first! 🌟
            </div>
        `;

        return;
    }

    box.innerHTML =
        list.map(review => {

            return `
                <div class="review-item">

                    <div class="review-top">

                        <span class="review-name">
                            👤 ${review.name}
                        </span>

                        <span class="review-stars">
                            ${"⭐".repeat(review.rating)}
                        </span>

                    </div>

                    <p class="review-text">
                        ${review.text}
                    </p>

                </div>
            `;

        }).join("");
}


function submitReview() {

    if (!currentReviewProduct) {

        showNotification(
            "Choose a Product 🌸",
            "Please open a product before writing a review.",
            "🧸"
        );

        return;
    }

    const name =
        document.getElementById(
            "reviewName"
        ).value.trim();

    const text =
        document.getElementById(
            "reviewText"
        ).value.trim();

    const rating =
        Number(
            document.getElementById(
                "reviewRating"
            ).value
        );

    if (!name || !text) {

        showNotification(
            "Almost There! 🌸",
            "Please enter your name and review.",
            "📝"
        );

        return;
    }

    if (!reviews[currentReviewProduct]) {

        reviews[currentReviewProduct] = [];
    }

    reviews[currentReviewProduct].push({
        name: name,
        rating: rating,
        text: text
    });

    saveData();

    displayReviews(currentReviewProduct);

    document.getElementById(
        "reviewName"
    ).value = "";

    document.getElementById(
        "reviewText"
    ).value = "";

    document.getElementById(
        "reviewRating"
    ).value = "5";

    showNotification(
        "Review Added! ⭐",
        "Thank you for your lovely review! 💖",
        "🌟"
    );
}


/* =========================
   ACCOUNT
========================= */

function showLogin() {

    document.getElementById(
        "loginForm"
    ).style.display = "block";

    document.getElementById(
        "signupForm"
    ).style.display = "none";

    document.getElementById(
        "loginTab"
    ).classList.add("active");

    document.getElementById(
        "signupTab"
    ).classList.remove("active");
}


function showSignup() {

    document.getElementById(
        "loginForm"
    ).style.display = "none";

    document.getElementById(
        "signupForm"
    ).style.display = "block";

    document.getElementById(
        "loginTab"
    ).classList.remove("active");

    document.getElementById(
        "signupTab"
    ).classList.add("active");
}


function loginUser() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "loginPassword"
        ).value.trim();

    if (!email || !password) {

        showNotification(
            "Oops! 🌸",
            "Please enter your email and password.",
            "🔐"
        );

        return;
    }

    showNotification(
        "Welcome Back! 🎉",
        "Demo login successful!",
        "👋"
    );
}


function signupUser() {

    const name =
        document.getElementById(
            "signupName"
        ).value.trim();

    const email =
        document.getElementById(
            "signupEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "signupPassword"
        ).value.trim();

    if (!name || !email || !password) {

        showNotification(
            "Almost There! 🌷",
            "Please fill all account fields.",
            "📝"
        );

        return;
    }

    showNotification(
        "Account Created! 🎉",
        `Welcome ${name}! Your demo account is ready.`,
        "🎀"
    );

    document.getElementById(
        "signupName"
    ).value = "";

    document.getElementById(
        "signupEmail"
    ).value = "";

    document.getElementById(
        "signupPassword"
    ).value = "";

    showLogin();
}


/* =========================
   CONTACT
========================= */

function sendMessage() {

    const name =
        document.getElementById(
            "contactName"
        ).value.trim();

    const email =
        document.getElementById(
            "contactEmail"
        ).value.trim();

    const message =
        document.getElementById(
            "contactMessage"
        ).value.trim();

    if (!name || !email || !message) {

        showNotification(
            "Oops! 💌",
            "Please fill all contact fields.",
            "🌸"
        );

        return;
    }

    showNotification(
        "Message Sent! 💌",
        `Thank you ${name}! We received your message.`,
        "📨"
    );

    document.getElementById(
        "contactName"
    ).value = "";

    document.getElementById(
        "contactEmail"
    ).value = "";

    document.getElementById(
        "contactMessage"
    ).value = "";
}


/* =========================
   CHECKOUT
========================= */

function openCheckout() {

    if (!cart.length) {

        showNotification(
            "Your Cart is Empty! 🛒",
            "Add something fun before checkout.",
            "🧸"
        );

        return;
    }

    const total =
        cart.reduce(
            (sum, item) => {

                const product =
                    products.find(
                        p => p.id === item.id
                    );

                return sum +
                    product.price * item.quantity;

            },
            0
        );

    document.getElementById(
        "checkoutTotal"
    ).textContent = total;

    document.getElementById(
        "checkoutModal"
    ).style.display = "flex";
}


function closeCheckout() {

    const modal =
        document.getElementById("checkoutModal");

    if (modal) {
        modal.style.display = "none";
    }
}


function placeOrder() {

    const name =
        document.getElementById(
            "customerName"
        ).value.trim();

    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();

    const address =
        document.getElementById(
            "customerAddress"
        ).value.trim();

    const city =
        document.getElementById(
            "customerCity"
        ).value.trim();

    const pincode =
        document.getElementById(
            "customerPincode"
        ).value.trim();

    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        showNotification(
            "Almost There! 🌸",
            "Please fill all delivery details.",
            "📦"
        );

        return;
    }

    const orderId =
        "HK" +
        Date.now()
            .toString()
            .slice(-6);

    document.getElementById(
        "orderNumber"
    ).textContent = orderId;

    document.getElementById(
        "orderMessage"
    ).textContent =
        `Thank you ${name}! Your demo order is ready. 🎁`;

    closeCheckout();

    document.getElementById(
        "successModal"
    ).style.display = "flex";

    cart = [];

    saveData();

    updateCart();

    document.getElementById(
        "customerName"
    ).value = "";

    document.getElementById(
        "customerPhone"
    ).value = "";

    document.getElementById(
        "customerAddress"
    ).value = "";

    document.getElementById(
        "customerCity"
    ).value = "";

    document.getElementById(
        "customerPincode"
    ).value = "";
}


function closeSuccess() {

    const modal =
        document.getElementById("successModal");

    if (modal) {
        modal.style.display = "none";
    }

    showNotification(
        "Happy Shopping! 🌈",
        "Thank you for visiting Happy Kids Store!",
        "🧸"
    );
}


/* =========================
   BACK TO TOP
========================= */

window.addEventListener(
    "scroll",
    function () {

        const button =
            document.getElementById("backToTop");

        if (!button) return;

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");
        }
    }
);


function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   CLOSE MODALS
========================= */

window.addEventListener(
    "click",
    function (event) {

        const productModal =
            document.getElementById(
                "productModal"
            );

        const checkoutModal =
            document.getElementById(
                "checkoutModal"
            );

        const successModal =
            document.getElementById(
                "successModal"
            );

        if (
            productModal &&
            event.target === productModal
        ) {
            closeProductModal();
        }

        if (
            checkoutModal &&
            event.target === checkoutModal
        ) {
            closeCheckout();
        }

        if (
            successModal &&
            event.target === successModal
        ) {
            closeSuccess();
        }
    }
);


/* =========================
   START WEBSITE
========================= */

displayProducts();

updateWishlist();

updateCart();

showLogin();