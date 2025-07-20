document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search input");
    const searchButton = document.querySelector(".search-btn");
    const reviewButton = document.querySelector(".review button");

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
        } else {
            alert("Please enter a search term.");
        }
    });

    reviewButton.addEventListener("click", function () {
        window.location.href = "WriteReview.html";
    });

    const rateLinks = document.querySelectorAll(".cards-rate");

    rateLinks.forEach(rateContainer => {
        let selectedRating = 0;

        const stars = rateContainer.querySelectorAll(".star");
        if (stars.length === 0) return; 

        stars.forEach(star => {
            star.addEventListener("click", function () {
                selectedRating = parseInt(star.getAttribute("data-value"));

                stars.forEach(s => {
                    s.classList.remove('selected'); 
                    if (parseInt(s.getAttribute("data-value")) <= selectedRating) {
                        s.classList.add('selected');
                    }
                });
            });
        });

        const saveLink = rateContainer.querySelector("a");
        if (saveLink) { 
            saveLink.addEventListener("click", function (event) {
                event.preventDefault();
                
                stars.forEach(s => {
                    s.classList.remove('selected'); 
                });

                alert(`You rated ${selectedRating} star(s).`);
                selectedRating = 0; 
            });
        }
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("navbar");
    const navbarRight = document.getElementById("navbarRight");
    const menu = document.getElementById("menu");

    menu.addEventListener("click", function() {
      navbar.classList.toggle("active");
      navbarRight.classList.toggle("active");
      menu.classList.toggle("open"); 
    });
  });