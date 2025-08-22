// Sample blog data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        excerpt: "Learn how to use React Hooks to simplify your functional components and manage state effectively.",
        category: "technology",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        author: "Alex Morgan",
        date: "August 12, 2025",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    {
        id: 2,
        title: "The Psychology of Color in Web Design",
        excerpt: "Understanding how color choices affect user perception and behavior on your website.",
        category: "design",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
        author: "Jessica Lee",
        date: "August 8, 2025",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80"
    },
    {
        id: 3,
        title: "Building a Sustainable Freelance Business",
        excerpt: "Strategies for creating a stable and growing freelance career in the digital space.",
        category: "business",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
        author: "David Kim",
        date: "August 5, 2025",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    {
        id: 4,
        title: "Minimalism in Digital Product Design",
        excerpt: "How embracing minimalism can lead to more effective and user-friendly digital products.",
        category: "design",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
        author: "Sophia Martinez",
        date: "August 3, 2025",
        avatar: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
        id: 5,
        title: "The Rise of Remote Work in Tech",
        excerpt: "How remote work is changing the technology industry and what it means for developers.",
        category: "technology",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        author: "Ryan Thompson",
        date: "July 30, 2025",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    {
        id: 6,
        title: "Mindfulness Practices for Developers",
        excerpt: "Simple mindfulness techniques to reduce stress and improve focus during coding sessions.",
        category: "lifestyle",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1220&q=80",
        author: "Emma Wilson",
        date: "July 28, 2025",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
];

// DOM elements
const postsGrid = document.querySelector('.posts-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize the blog
document.addEventListener('DOMContentLoaded', () => {
    renderPosts(blogPosts);
    setupFiltering();
    setupNewsletter();
});

// Render posts to the grid
function renderPosts(posts) {
    postsGrid.innerHTML = '';
    
    if (posts.length === 0) {
        postsGrid.innerHTML = '<p class="no-posts">No articles found in this category.</p>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsGrid.appendChild(postElement);
    });
}

// Create a post card element
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.dataset.category = post.category;
    
    article.innerHTML = `
        <div class="post-image">
            <img src="${post.image}" alt="${post.title}">
            <div class="category-tag">${post.category}</div>
        </div>
        <div class="post-content">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="post-meta">
                <img src="${post.avatar}" alt="${post.author}" class="author-avatar">
                <div class="meta-details">
                    <span class="author-name">${post.author}</span>
                    <span class="post-date">${post.date}</span>
                </div>
            </div>
        </div>
    `;
    
    return article;
}

// Set up category filtering
function setupFiltering() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter posts
            const filter = button.dataset.filter;
            let filteredPosts;
            
            if (filter === 'all') {
                filteredPosts = blogPosts;
            } else {
                filteredPosts = blogPosts.filter(post => post.category === filter);
            }
            
            renderPosts(filteredPosts);
        });
    });
}

// Set up newsletter form
function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // In a real application, you would send this to a server
            alert(`Thank you for subscribing with: ${email}`);
            emailInput.value = '';
        }
    });
}

// Mobile menu functionality (optional enhancement)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
}