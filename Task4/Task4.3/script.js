// Sample product data
        const products = [
            {
                id: 1,
                title: "Wireless Headphones",
                category: "electronics",
                price: 129.99,
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                badge: "Popular"
            },
            {
                id: 2,
                title: "Smart Watch Series 5",
                category: "electronics",
                price: 249.99,
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 3,
                title: "Cotton T-Shirt",
                category: "clothing",
                price: 29.99,
                rating: 4.3,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 4,
                title: "Blender",
                category: "home",
                price: 49.99,
                rating: 4.0,
                image: "https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsZW5kZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 5,
                title: "JavaScript: The Good Parts",
                category: "books",
                price: 24.99,
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
                badge: "Bestseller"
            },
            {
                id: 6,
                title: "Yoga Mat",
                category: "sports",
                price: 39.99,
                rating: 4.2,
                image: "https://images.unsplash.com/photo-1545389336-8c6dfde0b1e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 7,
                title: "Smartphone X",
                category: "electronics",
                price: 799.99,
                rating: 4.9,
                image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8JTIwc21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
                badge: "New"
            },
            {
                id: 8,
                title: "Running Shoes",
                category: "sports",
                price: 89.99,
                rating: 4.6,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 9,
                title: "Coffee Maker",
                category: "home",
                price: 79.99,
                rating: 4.4,
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 10,
                title: "Design Patterns",
                category: "books",
                price: 39.99,
                rating: 4.8,
                image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 11,
                title: "Winter Jacket",
                category: "clothing",
                price: 119.99,
                rating: 4.5,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFja2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 12,
                title: "Dumbbell Set",
                category: "sports",
                price: 149.99,
                rating: 4.7,
                image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHVtYmJlbGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            }
        ];

        // DOM elements
        const productGrid = document.getElementById('product-grid');
        const priceRange = document.getElementById('price-range');
        const maxPriceElement = document.getElementById('max-price');
        const sortSelect = document.getElementById('sort-by');
        const countElement = document.getElementById('count');
        
        // Initialize the page
        function init() {
            renderProducts(products);
            setupEventListeners();
        }
        
        // Set up event listeners
        function setupEventListeners() {
            // Price range filter
            priceRange.addEventListener('input', function() {
                maxPriceElement.textContent = '$' + this.value;
                filterProducts();
            });
            
            // Category filters
            document.querySelectorAll('.category-list input').forEach(checkbox => {
                checkbox.addEventListener('change', filterProducts);
            });
            
            // Sort option
            sortSelect.addEventListener('change', filterProducts);
        }
        
        // Filter and sort products
        function filterProducts() {
            const maxPrice = parseInt(priceRange.value);
            const selectedCategories = getSelectedCategories();
            const selectedRatings = getSelectedRatings();
            const sortOption = sortSelect.value;
            
            let filteredProducts = products.filter(product => {
                return product.price <= maxPrice &&
                       selectedCategories.includes(product.category) &&
                       selectedRatings.some(rating => product.rating >= rating);
            });
            
            // Sort products
            switch(sortOption) {
                case 'price-asc':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating-desc':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
                case 'name-asc':
                    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                    break;
            }
            
            renderProducts(filteredProducts);
        }
        
        // Get selected categories from checkboxes
        function getSelectedCategories() {
            const categories = [];
            document.querySelectorAll('.category-list input:checked').forEach(checkbox => {
                categories.push(checkbox.id);
            });
            return categories;
        }
        
        // Get selected ratings from checkboxes
        function getSelectedRatings() {
            const ratings = [];
            document.querySelectorAll('.filter-section:nth-child(3) input:checked').forEach(checkbox => {
                ratings.push(parseInt(checkbox.id.split('-')[1]));
            });
            return ratings;
        }
        
        // Render products to the grid
        function renderProducts(productsToRender) {
            productGrid.innerHTML = '';
            
            if (productsToRender.length === 0) {
                productGrid.innerHTML = '<p class="no-products">No products match your filters.</p>';
                countElement.textContent = '0';
                return;
            }
            
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                let badgeHtml = '';
                if (product.badge) {
                    badgeHtml = `<div class="product-badge">${product.badge}</div>`;
                }
                
                // Generate star rating HTML
                let starsHtml = '';
                for (let i = 1; i <= 5; i++) {
                    if (i <= Math.floor(product.rating)) {
                        starsHtml += '<i class="fas fa-star"></i>';
                    } else if (i - 0.5 <= product.rating) {
                        starsHtml += '<i class="fas fa-star-half-alt"></i>';
                    } else {
                        starsHtml += '<i class="far fa-star"></i>';
                    }
                }
                
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                        ${badgeHtml}
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-rating">
                            ${starsHtml} <span>${product.rating}</span>
                        </div>
                        <div class="product-price">
                            <div class="price">$${product.price.toFixed(2)}</div>
                            <button class="add-to-cart"><i class="fas fa-shopping-cart"></i></button>
                        </div>
                    </div>
                `;
                
                productGrid.appendChild(productCard);
            });
            
            countElement.textContent = productsToRender.length;
        }
        
        // Initialize the application
        init();