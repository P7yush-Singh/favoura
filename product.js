const FAVOURA_CONFIG = {
    whatsappNumber: "+919968500862"
};


/* =========================================================
   GET PRODUCT ID
========================================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const productId =
    urlParams.get("id");


const product =
    products.find(item => item.id === productId);


/* =========================================================
   ELEMENTS
========================================================= */

const productDetails =
    document.getElementById("productDetails");

const relatedProducts =
    document.getElementById("relatedProducts");

const orderModal =
    document.getElementById("orderModal");

const closeModal =
    document.getElementById("closeModal");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const orderForm =
    document.getElementById("orderForm");


let quantity = 1;


/* =========================================================
   PRODUCT NOT FOUND
========================================================= */

if (!product) {

    productDetails.innerHTML = `

        <div class="text-center py-20">

            <p class="section-label">
                Favoura
            </p>

            <h1 class="font-display text-5xl">
                Chocolate Not Found
            </h1>

            <p class="text-muted mt-5">
                The chocolate you're looking for is unavailable.
            </p>

            <a
                href="products.html"
                class="premium-button inline-flex mt-8"
            >
                Explore Chocolates
            </a>

        </div>

    `;

} else {

    renderProduct();

    renderRelatedProducts();

}


/* =========================================================
   RENDER PRODUCT
========================================================= */

function renderProduct() {

    document.title =
        `${product.name} — Favoura`;


    productDetails.innerHTML = `

        <div
            class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >

            <!-- IMAGE -->

            <div>

                <div class="product-detail-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>

            </div>


            <!-- CONTENT -->

            <div>

                <p class="section-label">
                    ${product.category}
                </p>


                <h1
                    class="font-display text-5xl md:text-6xl lg:text-7xl leading-tight"
                >
                    ${product.name}
                </h1>


                <p
                    class="text-2xl font-semibold mt-7"
                >
                    ₹${product.price}
                </p>


                <p
                    class="text-muted text-lg leading-8 mt-7 max-w-xl"
                >
                    ${product.description}
                </p>


                <!-- Quantity -->

                <div class="mt-10">

                    <p
                        class="text-sm font-semibold uppercase tracking-widest mb-4"
                    >
                        Quantity
                    </p>


                    <div
                        class="inline-flex items-center border border-chocolate/20"
                    >

                        <button
                            id="decreaseQuantity"
                            type="button"
                            class="quantity-button"
                        >
                            −
                        </button>


                        <span
                            id="quantityValue"
                            class="w-14 text-center font-semibold"
                        >
                            1
                        </span>


                        <button
                            id="increaseQuantity"
                            type="button"
                            class="quantity-button"
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- Total -->

                <div class="mt-7">

                    <span class="text-sm text-muted">
                        Total
                    </span>

                    <p
                        id="productTotal"
                        class="font-display text-3xl mt-1"
                    >
                        ₹${product.price}
                    </p>

                </div>


                <!-- Order -->

                <button
                    id="openOrderModal"
                    class="premium-button mt-9 w-full sm:w-auto"
                >
                    Order on WhatsApp →
                </button>


                <p class="text-xs text-muted mt-4">
                    Delivery details will be collected before
                    sending your order to WhatsApp.
                </p>

            </div>

        </div>

    `;


    initializeQuantity();

}


/* =========================================================
   QUANTITY
========================================================= */

function initializeQuantity() {

    const decrease =
        document.getElementById("decreaseQuantity");

    const increase =
        document.getElementById("increaseQuantity");

    const quantityValue =
        document.getElementById("quantityValue");

    const productTotal =
        document.getElementById("productTotal");


    function updateQuantity() {

        quantityValue.textContent =
            quantity;

        productTotal.textContent =
            `₹${product.price * quantity}`;


        updateOrderSummary();

    }


    decrease.addEventListener("click", () => {

        if (quantity > 1) {

            quantity--;

            updateQuantity();

        }

    });


    increase.addEventListener("click", () => {

        quantity++;

        updateQuantity();

    });


    document
        .getElementById("openOrderModal")
        .addEventListener("click", openOrderModal);


    updateQuantity();

}


/* =========================================================
   RELATED PRODUCTS
========================================================= */

function renderRelatedProducts() {

    if (!relatedProducts) return;


    const related =
        products
            .filter(item => item.id !== product.id)
            .slice(0, 3);


    relatedProducts.innerHTML =
        related.map(item => {

            return `

                <article class="product-card">

                    <a
                        href="product.html?id=${item.id}"
                    >

                        <div class="product-image-wrapper">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                                loading="lazy"
                            >

                        </div>


                        <div class="product-info">

                            <p class="product-category">
                                ${item.category}
                            </p>

                            <h3 class="product-name">
                                ${item.name}
                            </h3>

                            <p class="product-price">
                                ₹${item.price}
                            </p>

                        </div>

                    </a>

                </article>

            `;

        }).join("");

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openOrderModal() {

    orderModal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

    updateOrderSummary();

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeOrderModal() {

    orderModal.classList.add("hidden");

    document.body.style.overflow = "";

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeOrderModal
    );

}


if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeOrderModal
    );

}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeOrderModal();

    }

});


/* =========================================================
   ORDER SUMMARY
========================================================= */

function updateOrderSummary() {

    if (!product) return;


    const summaryProduct =
        document.getElementById("summaryProduct");

    const summaryQuantity =
        document.getElementById("summaryQuantity");

    const summaryTotal =
        document.getElementById("summaryTotal");


    if (!summaryProduct) return;


    summaryProduct.textContent =
        product.name;


    summaryQuantity.textContent =
        quantity;


    summaryTotal.textContent =
        `₹${product.price * quantity}`;

}


/* =========================================================
   FORM VALIDATION
========================================================= */

if (orderForm) {

    orderForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document.getElementById("customerName")
                .value.trim();

        const phone =
            document.getElementById("customerPhone")
                .value.trim();

        const address =
            document.getElementById("customerAddress")
                .value.trim();

        const landmark =
            document.getElementById("customerLandmark")
                .value.trim();

        const note =
            document.getElementById("orderNote")
                .value.trim();


        clearErrors();


        let valid = true;


        /* NAME */

        if (!name) {

            showError(
                "nameError",
                "Please enter your name."
            );

            valid = false;

        }


        /* PHONE */

        const cleanPhone =
            phone.replace(/\D/g, "");


        if (
            cleanPhone.length !== 10 ||
            !/^[6-9]\d{9}$/.test(cleanPhone)
        ) {

            showError(
                "phoneError",
                "Please enter a valid 10-digit Indian mobile number."
            );

            valid = false;

        }


        /* ADDRESS */

        if (!address) {

            showError(
                "addressError",
                "Please enter your delivery address."
            );

            valid = false;

        }


        if (!valid) return;


        createWhatsAppOrder(
            name,
            cleanPhone,
            address,
            landmark,
            note
        );

    });

}


/* =========================================================
   ERROR HELPERS
========================================================= */

function showError(elementId, message) {

    const element =
        document.getElementById(elementId);


    if (element) {

        element.textContent =
            message;

    }

}


function clearErrors() {

    document
        .querySelectorAll(".form-error")
        .forEach(error => {

            error.textContent = "";

        });

}


/* =========================================================
   WHATSAPP ORDER
========================================================= */

function createWhatsAppOrder(
    name,
    phone,
    address,
    landmark,
    note
) {

    if (
        !FAVOURA_CONFIG.whatsappNumber ||
        FAVOURA_CONFIG.whatsappNumber.includes("X")
    ) {

        alert(
            "Please configure the Favoura WhatsApp number first."
        );

        return;

    }


    const total =
        product.price * quantity;


    const message = `

*NEW FAVOURA ORDER*

━━━━━━━━━━━━━━━━━━

*PRODUCT* - ${product.name}

*QUANTITY* - ${quantity}

*PRICE* - ₹${product.price}

*TOTAL* - ₹${total}

━━━━━━━━━━━━━━━━━━

*CUSTOMER DETAILS*

Name: ${name}

Phone: ${phone}

*DELIVERY ADDRESS*

${address}

${landmark ? `Landmark: ${landmark}` : ""}

${note ? `Note: ${note}` : ""}

━━━━━━━━━━━━━━━━━━

Order placed through the Favoura website.

    `.trim();


    const whatsappURL =
        `https://wa.me/${FAVOURA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}