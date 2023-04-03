document.querySelector('.button3').addEventListener('click', function() {
    var sliderContainer = document.querySelector('.volume-slider-container');
    sliderContainer.style.display = sliderContainer.style.display === 'block' ? 'none' : 'block';
});

document.querySelector('.volume-slider').addEventListener('input', function() {
  var volume = this.value;
  // Adjust the game's volume based on the 'volume' variable.
});
  