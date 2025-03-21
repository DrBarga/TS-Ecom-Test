document.addEventListener('DOMContentLoaded', function() {
    // Get the container where products will be inserted dynamically
    const productsContainer = document.getElementById('products-container');

    // Define the GraphQL query to fetch product data
    const query = `
    {
        products(first: 8) {
            edges {
                node {
                    title
                    description
                    variants(first: 1) {
                        edges {
                            node {
                                price {
                                    amount
                                    currencyCode
                                }
                                compareAtPrice {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                    images(first: 2) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                    }
                }
            }
        }
    }
    `;

    // Send a request to the Shopify Storefront API to fetch product data
    fetch('https://tsodykteststore.myshopify.com/api/2023-01/graphql.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': '7e174585a317d187255660745da44cc7'  // Authentication token
        },
        body: JSON.stringify({ query })  
    })
    .then(response => response.json())  
    .then(data => {
        // Loop through the products received from the API response
        const products = data.data.products.edges;
        products.forEach(product => {
            const productNode = product.node;

            // Create a new product card element for each product
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            // Create product photo section
            const productPhoto = document.createElement('div');
            productPhoto.className = 'product-photo';

            // Add the product image
            const productImage = document.createElement('img');
            productImage.src = 'images/product-image.png';  // Placeholder image
            productImage.alt = productNode.title;
            productPhoto.appendChild(productImage);

            // Create product information section
            const productInfo = document.createElement('div');
            productInfo.className = 'product-info';

            // Add product title
            const productTitle = document.createElement('h3');
            productTitle.className = 'product-title';
            productTitle.textContent = 'Steam Cleaner';
            productInfo.appendChild(productTitle);

            // Add product description
            const productDescription = document.createElement('p');
            productDescription.className = 'product-description';
            productDescription.textContent = 'Lorem ipsum dolor sit amet'; 
            productInfo.appendChild(productDescription);

            // Create product price section
            const productPrice = document.createElement('div');
            productPrice.className = 'product-price';

            // Add the old sale price (strikethrough)
            const salePrice = document.createElement('span');
            salePrice.className = 'sale-price';
            salePrice.textContent = '450'; 
            productPrice.appendChild(salePrice);

            // Add the current price
            const currentPrice = document.createElement('span');
            currentPrice.className = 'current-price';
            currentPrice.textContent = '150'; 
            productPrice.appendChild(currentPrice);

            // Append price information to the product info section
            productInfo.appendChild(productPrice);

            // Append product photo and info to the product card
            productCard.appendChild(productPhoto);
            productCard.appendChild(productInfo);

            // Add the product card to the products container in the DOM
            productsContainer.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

    // Animation for FAQ toggle buttons
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Find the corresponding FAQ answer section
            const faqItem = toggle.closest('.accordion-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');

            // Toggle the "open" class to show/hide the answer
            faqAnswer.classList.toggle('open');

            // Change the toggle button text based on the open/closed state
            toggle.textContent = faqAnswer.classList.contains('open') ? '-' : '+';
        });
    });

    // Handler for the "customer support" link to prevent default action
    const supportLink = document.querySelector('.support-link');
    if (supportLink) {
        supportLink.addEventListener('click', function(event) {
            event.preventDefault(); 
        });
    }
});
