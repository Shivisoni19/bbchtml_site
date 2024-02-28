// Function to load the header and footer components
function loadHeaderAndFooter() {
    // Load the footer component
    fetch('footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
      });
  }
  
  // Call the function to load components when the page loads
  window.addEventListener('load', loadHeaderAndFooter);
  