/* ============================================================
   URBANFIT - Main JavaScript
   Handles: offer bar, mobile navbar, slider, product cards,
            collections search & filter, contact form validation
   ============================================================ */

/* ---------- PRODUCT DATA ---------- */
// Each product has a name, image, price, and tags used for
// filtering (occasion: summer/party/beach, color, arrival: new/old)
const products = [
    {
        id: 12, name: 'White Tshirt', price: 26,
        img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
        tags: ['summer', 'green', 'new']
    },
    {
        id: 1, name: 'Sunny Floral Dress', price: 45,
        img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
        tags: ['summer', 'red', 'new']
    },
    {
        id: 2, name: 'Coastal Linen Shirt', price: 35,
        img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
        tags: ['summer', 'white', 'new']
    },
    {
        id: 3, name: 'Beach Party Shorts', price: 28,
        img: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop',
        tags: ['beach', 'blue', 'new']
    },
    {
        id: 4, name: 'Party Glow Jumpsuit', price: 55,
        img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
        tags: ['party', 'red', 'new']
    },
    {
        id: 5, name: 'Classic Denim Jacket', price: 65,
        img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop',
        tags: ['party', 'blue', 'old']
    },
    {
        id: 6, name: 'Emerald Party Gown', price: 89,
        img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop',
        tags: ['party', 'green', 'new']
    },
    {
        id: 7, name: 'Beach Cover-Up', price: 24,
        img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop',
        tags: ['beach', 'white', 'old']
    },
    {
        id: 8, name: 'Fresh Green Tee', price: 19,
        img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop',
        tags: ['summer', 'green', 'old']
    },
    {
        id: 9, name: 'Scarlet Party Blazer', price: 72,
        img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop',
        tags: ['party', 'red', 'old']
    },
    {
        id: 10, name: 'Azure Summer Suit', price: 98,
        img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
        tags: ['summer', 'blue', 'old']
    },
    {
        id: 11, name: 'Seaside White Skirt', price: 32,
        img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop',
        tags: ['beach', 'white', 'new']
    }
];

/* ---------- OFFER BAR CLOSE ---------- */
const offerBar = document.getElementById('offerBar');
const offerClose = document.getElementById('offerClose');
if (offerClose) {
    offerClose.addEventListener('click', function () {
        offerBar.classList.add('hidden');
    });
}

/* ---------- MOBILE SIDE NAVBAR ---------- */
const sideNavbar = document.getElementById('sideNavbar');
const sideNavbarActivate = document.getElementById('sideNavbarActivate');
const sideNavbarClose = document.getElementById('sideNavbarClose');

if (sideNavbarActivate) {
    sideNavbarActivate.addEventListener('click', function () {
        sideNavbar.classList.add('open');
    });
}
if (sideNavbarClose) {
    sideNavbarClose.addEventListener('click', function () {
        sideNavbar.classList.remove('open');
    });
}
// Close side navbar when a link is clicked
if (sideNavbar) {
    sideNavbar.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            sideNavbar.classList.remove('open');
        });
    });
}

/* ---------- SLIDER ---------- */
const sliderLeft = document.getElementById('sliderLeft');
const sliderRight = document.getElementById('sliderRight');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(function (slide) {
        slide.classList.remove('active');
    });
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;
    slides[currentSlide].classList.add('active');
}

if (sliderRight) {
    sliderRight.addEventListener('click', function () {
        showSlide(currentSlide + 1);
    });
}
if (sliderLeft) {
    sliderLeft.addEventListener('click', function () {
        showSlide(currentSlide - 1);
    });
}
// Auto-play slider every 5 seconds
if (slides.length > 0) {
    setInterval(function () {
        showSlide(currentSlide + 1);
    }, 5000);
}

/* ---------- CREATE A PRODUCT CARD ---------- */
function createProductCard(product, onSale) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    card.setAttribute('data-name', product.name.toLowerCase());
    card.setAttribute('data-tags', product.tags.join(','));

    let badge = '';
    if (onSale) {
        badge = '<span class="sale-badge">sale</span>';
    }

    card.innerHTML =
        '<div class="product-image">' +
            '<img src="' + product.img + '" alt="' + product.name + '">' +
            badge +
            '<button class="like-btn"><i class="fa-regular fa-heart"></i></button>' +
            '<div class="product-overlay">' +
                '<button class="shop-btn">Shop Now <i class="fa-solid fa-arrow-right"></i></button>' +
            '</div>' +
        '</div>' +
        '<div class="product-info">' +
            '<h4>' + product.name + '</h4>' +
            '<p>$' + product.price + '</p>' +
        '</div>';

    // Like button toggle
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', function () {
        likeBtn.classList.toggle('liked');
        const icon = likeBtn.querySelector('i');
        if (likeBtn.classList.contains('liked')) {
            icon.className = 'fa-solid fa-heart';
        } else {
            icon.className = 'fa-regular fa-heart';
        }
    });

    return card;
}

/* ---------- HOME PAGE PRODUCTS ---------- */
const newArrivals = document.getElementById('newArrivals');
const mostWanted = document.getElementById('mostWanted');

// New arrivals: first 4 products
if (newArrivals) {
    products.slice(0, 4).forEach(function (product) {
        newArrivals.appendChild(createProductCard(product, false));
    });
}

// Most wanted: all 12 products with "sale" tag
if (mostWanted) {
    products.forEach(function (product) {
        mostWanted.appendChild(createProductCard(product, true));
    });
}

/* ---------- COLLECTIONS PAGE: SEARCH & FILTER ---------- */
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const clearFilterBtn = document.getElementById('clearFilter');

function renderProducts(list) {
    if (!productsContainer) return;
    productsContainer.innerHTML = '';
    if (list.length === 0) {
        productsContainer.innerHTML = '<p class="no-results">No products found. Try adjusting your search or filters.</p>';
    } else {
        list.forEach(function (product) {
            productsContainer.appendChild(createProductCard(product, true));
        });
    }
    if (resultCount) {
        resultCount.textContent = 'Showing ' + list.length + ' of ' + products.length + ' products';
    }
}

// Get currently selected filter values
function getSelectedTags() {
    const selected = [];
    document.querySelectorAll('input[name="tag"]:checked').forEach(function (checkbox) {
        selected.push(checkbox.value);
    });
    return selected;
}

// Apply search + filter together
function applyFilters() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedTags = getSelectedTags();

    const filtered = products.filter(function (product) {
        // Search match: check product name
        const nameMatch = product.name.toLowerCase().includes(query);

        // Filter match: product must include ALL selected tags
        const tagMatch = selectedTags.every(function (tag) {
            return product.tags.includes(tag);
        });

        return nameMatch && tagMatch;
    });

    renderProducts(filtered);
}

// Event listeners for search and filters
if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
}

if (productsContainer) {
    document.querySelectorAll('input[name="tag"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', applyFilters);
    });
}

// Clear all filters and search
if (clearFilterBtn) {
    clearFilterBtn.addEventListener('click', function () {
        document.querySelectorAll('input[name="tag"]').forEach(function (checkbox) {
            checkbox.checked = false;
        });
        if (searchInput) searchInput.value = '';
        applyFilters();
    });
}

// Initial render on collections page
if (productsContainer) {
    renderProducts(products);
}

/* ---------- CONTACT PAGE FORM VALIDATION ---------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const subjectSelect = document.getElementById('subject');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            nameInput.classList.remove('valid');
            nameInput.classList.add('invalid');
            return false;
        }
        nameError.textContent = '';
        nameInput.classList.remove('invalid');
        nameInput.classList.add('valid');
        return true;
    }

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
            return false;
        }
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
            return false;
        }
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
        return true;
    }

    function validateMessage() {
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required.';
            messageInput.classList.remove('valid');
            messageInput.classList.add('invalid');
            return false;
        }
        messageError.textContent = '';
        messageInput.classList.remove('invalid');
        messageInput.classList.add('valid');
        return true;
    }

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        const isSubjectValid = subjectSelect.value !== '';

        if (isNameValid && isEmailValid && isMessageValid && isSubjectValid) {
            formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();
            nameInput.classList.remove('valid');
            emailInput.classList.remove('valid');
            messageInput.classList.remove('valid');
        } else {
            formSuccess.textContent = '';
        }
    });
}
