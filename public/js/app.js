// const { check } = require("express-validator");
// is it somthing to do with this??

document.addEventListener("DOMContentLoaded", function () {
  // Add your JavaScript here.
  const menuButton = document.getElementById("menu-toggle");
  const sideNavBar = document.getElementById("side-navbar");
  const colourButton = document.getElementById("change-post-color-button");
  const username = document.getElementById("username");
  let sideNavBarOpen = false;

  menuButton.addEventListener("click", (e) => {
    sideNavBar.classList.toggle("open");
    menuButton.classList.toggle("open");
    sideNavBarOpen = true;
  });



    window.addEventListener('click', (e) => {
      let sideNavBarClicked = sideNavBar.contains(e.target)
      let menuButtonClicked = menuButton.contains(e.target)
      const colourButtonClicked = colourButton.contains(e.target)
      if (sideNavBarOpen && !sideNavBarClicked && !menuButtonClicked && !colourButtonClicked) {
        sideNavBar.classList.toggle("open");
        menuButton.classList.toggle("open");
        sideNavBarOpen = false;
      }
    });


    document.addEventListener("keydown" , (e) => {
      if (e.key === "Escape" && sideNavBarOpen) {
        sideNavBar.classList.toggle("open");
        menuButton.classList.toggle("open");
        sideNavBarOpen = false;
      }
    });

    if (colourButton) {
      colourButton.addEventListener("click", (e) => {
        const postContainer = document.getElementsByClassName("post-container");
        let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

        for (let i = 0; i < postContainer.length; i++) {
          postContainer[i].style.background = color;
        }
      })
    };

    const usernameInputBox = document.getElementById("username");
    const usernameValidationMessage = document.getElementById("username-validation-message");
    const submitButton = document.getElementById("create-user-submit-button");
    let usernameValid = false;
    
    function checkUsernameInput() {
    usernameInputBox.addEventListener("input", (e) => {
      let userInput = usernameInputBox.value;
      usernameValid = isUsernameValid(userInput);
      console.log('usernameValid', usernameValid)

      let currentDisplay = window.getComputedStyle(usernameValidationMessage).display;

      if (!usernameValid) {
       if (currentDisplay === "none") {
        usernameValidationMessage.style.display = "block"; 
        } 
      } else {
        usernameValidationMessage.style.display = "none"; 
      }
    })
    return usernameValid;
  }

    function isUsernameValid(username) {
      return /^[a-z]+$/.test(username);
    }

    let createUserForm = document.getElementById("create-user-form");

    function checkForm(usernameValid) {
      let canSubmit = true;

      for (let i = 0; i < createUserForm.length; i++) {

        if (createUserForm[i].type != 'submit' && createUserForm[i].id != 'username') {
          if (createUserForm[i].value.length == 0) canSubmit = false;
        }

      }
      if (canSubmit && usernameValid) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    }

    if (createUserForm) {
    checkForm(usernameValid);
    }

    if (createUserForm) {
      createUserForm.addEventListener("input", (e) => {
      const usernameInputBoxClicked = usernameInputBox.contains(e.target);
      if (usernameInputBoxClicked) {
        usernameValid = checkUsernameInput();
        checkForm(usernameValid);
      } else {
        checkForm(usernameValid);
      }
    });
  }


});
