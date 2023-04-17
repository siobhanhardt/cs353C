document.addEventListener('DOMContentLoaded', function () {
  const audioElement = document.getElementById('audio-element');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeButton = document.querySelector('.button3');
  const volumeSliderContainer = document.querySelector('.volume-slider-container');
  
   volumeSlider.addEventListener('input', function () {
       audioElement.volume = volumeSlider.value;
   });

  volumeSliderContainer.style.display = 'none';
  volumeButton.addEventListener('click', function () {
      if (volumeSliderContainer.style.display === 'none') {
          volumeSliderContainer.style.display = 'block';
      } else {
          volumeSliderContainer.style.display = 'none';
      }
  });

  var audioElement2 = document.getElementById('audio-element');
  
  document.body.addEventListener('click', function() {
      if (audioElement2.paused) {
          audioElement2.play();
      } 
  });
});

document.getElementById("button1").addEventListener("click", function () {
  const textBoxContainer = document.getElementById("textBoxContainer");

  // Clear any previous content
  textBoxContainer.innerHTML = "";

  // Create the box with text
  const textBox = document.createElement("div");
  textBox.style.width = "300px";
  textBox.style.height = "200px";
  textBox.style.border = "2px outset white";
  textBox.style.padding = "8px";
  textBox.style.backgroundColor = "#C0C0C0";
  textBox.style.position = "fixed";
  textBox.style.top = "50px";
  textBox.style.right = "50px";
  textBox.style.zIndex = "4";
  textBox.style.fontFamily = "'W95FA', sans-serif";
  textBox.style.fontSize = "14px";

  // Blue bar of Windows 95
  const titleBar = document.createElement("div");
  titleBar.style.backgroundColor = "#000080";
  titleBar.style.color = "white";
  titleBar.style.padding = "3px";
  titleBar.style.fontWeight = "bold";
  titleBar.style.fontSize = "12px";
  titleBar.style.display = "flex";
  titleBar.style.justifyContent = "space-between";
  const titleText = document.createTextNode("SLACKER.txt");
  titleBar.appendChild(titleText);
  textBox.appendChild(titleBar);

  // Close button at the left top W95 style
  const closeButton = document.createElement("span");
  closeButton.textContent = "X";
  closeButton.style.color = "black";
  closeButton.style.cursor = "pointer";
  closeButton.style.padding = "2px 5px";
  closeButton.style.backgroundColor = "#C0C0C0";
  closeButton.style.border = "1px solid #808080";
  closeButton.style.borderTopColor = "#ffffff";
  closeButton.style.borderLeftColor = "#ffffff";
  closeButton.style.fontSize = "12px";
  closeButton.style.fontWeight = "bold";
  closeButton.style.display = "inline-block";
  closeButton.addEventListener("click", function () {
    textBoxContainer.innerHTML = "";
  });
  titleBar.appendChild(closeButton);

  const textContent = document.createElement("div");
  textContent.style.padding = "5px";
  textContent.style.backgroundColor = "white";
  textContent.style.height = "calc(100% - 46px)"; 
  textContent.style.overflowY = "auto";

  const textLines = [
    "SLACKER \u00A9 was developed by:",
    "",
    "Brendon Freaney",
    "Fabio Lima",
    "Jasmine Ha",
    "Kevin Shiels",
    "Siobhan Hardt",
    "Tan Xiaoxu",
    "",
    "SLACKER \u00A9 2023. All rights reserved."
  ];

  for (let i = 0; i < textLines.length; i++) {
    const text = document.createTextNode(textLines[i]);
    textContent.appendChild(text);
    if (i < textLines.length - 1) { // Add a line break, except for the last line
      const lineBreak = document.createElement("br");
      textContent.appendChild(lineBreak);
    }
  }
  textBox.appendChild(textContent);
  textBoxContainer.appendChild(textBox);
});
