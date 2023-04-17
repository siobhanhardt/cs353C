document.addEventListener('DOMContentLoaded', function () {
  const audioElement = document.getElementById('audio-element');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeButton = document.querySelector('.button3');
  const volumeSliderContainer = document.querySelector('.volume-slider-container');
  
  volumeSlider.addEventListener('input', function () {
      audioElement.volume = volumeSlider.value;
  });

  volumeButton.addEventListener('click', function () {
      if (volumeSliderContainer.style.display === 'none') {
          volumeSliderContainer.style.display = 'block';
      } else {
          volumeSliderContainer.style.display = 'none';
      }
  });

  var audioElement2 = document.getElementById('audio-element');

  window.onload = function() {
      audioElement2.play();
  };
  
  document.body.addEventListener('click', function() {
      if (audioElement2.paused) {
          audioElement2.play();
      } else {
          audioElement2.pause();
      }
  });
});

