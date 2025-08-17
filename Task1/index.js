// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Create a button element
    const button = document.createElement('button');
    button.textContent = 'Click Me!';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.margin = '20px auto';
    button.style.display = 'block';
    
    // Add click event
    button.addEventListener('click', function() {
        alert('Hello! Welcome to JavaScript!');
    });
    
    // Add button to the page
    document.querySelector('main').appendChild(button);
});