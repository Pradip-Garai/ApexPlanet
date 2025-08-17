document.addEventListener('DOMContentLoaded', () => {
  // Gallery data with working Unsplash image URLs
  const galleryData = [
    { 
      id: 1, 
      src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80', 
      category: 'nature', 
      caption: 'Beautiful Nature' 
    },
    { 
      id: 2, 
      src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80', 
      category: 'architecture', 
      caption: 'Modern Architecture' 
    },
    { 
      id: 3, 
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80', 
      category: 'people', 
      caption: 'Portrait Photography' 
    },
    { 
      id: 4, 
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80', 
      category: 'nature', 
      caption: 'Mountain Landscape' 
    },
    { 
      id: 5, 
      src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80', 
      category: 'architecture', 
      caption: 'Urban Cityscape' 
    },
    { 
      id: 6, 
      src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80', 
      category: 'people', 
      caption: 'Professional Model' 
    },
    { 
      id: 7, 
      src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80', 
      category: 'nature', 
      caption: 'Forest Adventure' 
    },
    { 
      id: 8, 
      src: 'https://images.unsplash.com/photo-1439396087961-98bc12c21176?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80', 
      category: 'architecture', 
      caption: 'Historic Bridge' 
    }
  ];

  const galleryGrid = document.querySelector('.gallery-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;
  let filteredImages = [];

  // Load gallery images
  function loadGallery() {
    galleryGrid.innerHTML = '';
    galleryData.forEach((item, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = `gallery-item ${item.category}`;
      galleryItem.setAttribute('data-index', index);
      galleryItem.innerHTML = `
        <img src="${item.src}" alt="${item.caption}" class="gallery-img" loading="lazy">
        <div class="gallery-caption">${item.caption}</div>
      `;
      galleryGrid.appendChild(galleryItem);

      // Add click event to open lightbox
      galleryItem.addEventListener('click', () => openLightbox(index));
    });
    filteredImages = [...galleryData];
  }

  // Filter images
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');
      if (filter === 'all') {
        filteredImages = [...galleryData];
      } else {
        filteredImages = galleryData.filter(item => item.category === filter);
      }
      renderFilteredImages();
    });
  });

  function renderFilteredImages() {
    galleryGrid.innerHTML = '';
    filteredImages.forEach((item, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = `gallery-item ${item.category}`;
      galleryItem.setAttribute('data-index', index);
      galleryItem.innerHTML = `
        <img src="${item.src}" alt="${item.caption}" class="gallery-img" loading="lazy">
        <div class="gallery-caption">${item.caption}</div>
      `;
      galleryGrid.appendChild(galleryItem);
      galleryItem.addEventListener('click', () => openLightbox(index));
    });
  }

  // Lightbox functions
  function openLightbox(index) {
    currentIndex = index;
    const item = filteredImages[currentIndex];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  function navigateLightbox(direction) {
    if (direction === 'prev') {
      currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    } else {
      currentIndex = (currentIndex + 1) % filteredImages.length;
    }
    const item = filteredImages[currentIndex];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption;
  }

  // Event listeners
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox('prev'));
  nextBtn.addEventListener('click', () => navigateLightbox('next'));

  // Close lightbox when clicking outside
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox('prev');
    if (e.key === 'ArrowRight') navigateLightbox('next');
  });

  // Initialize gallery
  loadGallery();
});