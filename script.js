/* =========================================================
   FAVOURA MAIN SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        };

        updateNavbar();

        window.addEventListener("scroll", updateNavbar);

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

            });

        });

    }


    /* =====================================================
       HOMEPAGE — FEATURED PRODUCTS
    ===================================================== */

    const featuredContainer =
        document.getElementById("featuredProducts");


    if (
        featuredContainer &&
        typeof products !== "undefined"
    ) {

        const featuredProducts =
            products.filter(product => product.featured);


        featuredContainer.innerHTML =
            featuredProducts
                .slice(0, 3)
                .map(product => createProductCard(product))
                .join("");

        initReveal();

    }


    /* =====================================================
       PRODUCTS PAGE
    ===================================================== */

    const productGrid =
        document.getElementById("productGrid");

    const categoryFilters =
        document.getElementById("categoryFilters");

    const productCount =
        document.getElementById("productCount");

    const emptyProducts =
        document.getElementById("emptyProducts");


    if (
        productGrid &&
        typeof products !== "undefined"
    ) {

        renderProducts("all");


        /* ================================================
           FILTER BUTTONS
        ================================================ */

        if (categoryFilters) {

            categoryFilters.addEventListener(
                "click",
                event => {

                    const button =
                        event.target.closest(
                            ".filter-button"
                        );


                    if (!button) return;


                    /* Remove active */

                    categoryFilters
                        .querySelectorAll(
                            ".filter-button"
                        )
                        .forEach(btn => {

                            btn.classList.remove("active");

                        });


                    /* Add active */

                    button.classList.add("active");


                    /* Get category */

                    const category =
                        button.dataset.category;


                    renderProducts(category);

                }
            );

        }

    }


    /* =====================================================
       PRODUCT RENDER FUNCTION
    ===================================================== */

    function renderProducts(category) {

        if (!productGrid) return;


        let filteredProducts = products;


        /* Filter */

        if (category !== "all") {

            filteredProducts =
                products.filter(
                    product =>
                        product.category === category
                );

        }


        /* Product count */

        if (productCount) {

            productCount.textContent =
                `${filteredProducts.length} Chocolates`;

        }


        /* Empty state */

        if (filteredProducts.length === 0) {

            productGrid.innerHTML = "";

            if (emptyProducts) {
                emptyProducts.classList.remove("hidden");
            }

            return;

        }


        if (emptyProducts) {

            emptyProducts.classList.add("hidden");

        }


        /* Render */

        productGrid.innerHTML =
            filteredProducts
                .map(product => createProductCard(product))
                .join("");

    }


    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        return `

            <article class="product-card">

                <a
                    href="product.html?id=${encodeURIComponent(product.id)}"
                    class="block"
                >

                    <div class="product-image-wrapper">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                            onerror="this.style.display='none'"
                        >


                        <div class="product-overlay">

                            <span
                                class="bg-white text-chocolate px-5 py-3 text-sm font-semibold"
                            >
                                View Chocolate →
                            </span>

                        </div>

                    </div>


                    <div class="product-info">

                        <p class="product-category">
                            ${product.category}
                        </p>


                        <h2 class="product-name">
                            ${product.name}
                        </h2>


                        <p class="product-description">
                            ${product.description}
                        </p>


                        <p class="product-price">
                            ₹${product.price}
                        </p>

                    </div>

                </a>

            </article>

        `;

    }

});