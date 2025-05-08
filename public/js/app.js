document.addEventListener("DOMContentLoaded", function () {
  // Add your JavaScript here.
  const menuButton = document.getElementById("menu-toggle");
  const sideNavBar = document.getElementById("side-navbar");
  const colourButton = document.getElementById("change-post-color-button");
  let sideNavBarOpen = false;

  menuButton.addEventListener("click", (e) => {
    sideNavBar.classList.toggle("open");
    menuButton.classList.toggle("open");
    sideNavBarOpen = true;
    // let currentDisplay = window.getComputedStyle(sideNavBar).display;
    // if (currentDisplay === "none") {
      
    //   sideNavBar.style.display = "flex"; 
    // } else {
    //   sideNavBar.style.display = "none";
    // }
  });

    window.addEventListener('click', (e) => {
      const sideNavBarClicked = sideNavBar.contains(e.target)
      const menuButtonClicked = menuButton.contains(e.target)
      if (sideNavBarOpen && !sideNavBarClicked && !menuButtonClicked) {
        sideNavBar.classList.toggle("open");
        menuButton.classList.toggle("open");
      }
    });

    document.addEventListener("keydown" , (e) => {
      if (e.key === "Escape" && sideNavBarOpen) {
        sideNavBar.classList.toggle("open");
        menuButton.classList.toggle("open");
      }
    });

    colourButton.addEventListener("click", (e) => {
      const postContainer = document.getElementsByClassName("post-container");
      let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

      for (let i = 0; i < postContainer.length; i++) {
        postContainer[i].style.background = color;
      }

    })


});
