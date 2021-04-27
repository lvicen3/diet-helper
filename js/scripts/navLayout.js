// This is the JavaScript used for responsive layout and the
// hidden hamburger navigation.

var active = true;

function hiddenSideMenu() {
  if (active) {
    $("#hiddenMenu").css("width", "40%");
    $(".hamburgerMenu").css("color", "#99bbad");
    active = false;
  } else {
    $("#hiddenMenu").css("width", "0");
    $(".hamburgerMenu").css("color", "#ebd8b7");
    active = true;
  }
}

// Adjust to Large Window
var largeScreen = window.matchMedia('screen and (min-width: 1500px)');
largeWindow(largeScreen);
largeScreen.addListener(largeWindow);

function largeWindow(screenSize) {
  if (screenSize.matches) {
    console.log("Detected: Screen Size More than 1250px!");
    document.querySelector("section#pageContainer").style.width = "50%";
  } else {
    document.querySelector("section#pageContainer").style.width = "100%";
  }
}
