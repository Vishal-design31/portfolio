// Disable right-click everywhere
document.addEventListener('contextmenu', event => event.preventDefault());

//Disable common keyboard shortcuts for viewing source / dev tools
document.addEventListener('keydown', function(event) {
    // List of blocked keys
    if (
        event.ctrlKey && (event.key === 'u' || event.key === 'U') || // Ctrl+U (View source)
        event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I') || // Ctrl+Shift+I (DevTools)
        event.ctrlKey && event.shiftKey && (event.key === 'j' || event.key === 'J') || // Ctrl+Shift+J (Console)
        event.ctrlKey && (event.key === 's' || event.key === 'S') || // Ctrl+S (Save page)
        event.key === 'F12' // F12 (DevTools)
    ) {
        event.preventDefault();
        alert("This action is disabled on this site.");
    }
});


/*---reels features---*/

// Disable right click on iframes
document.querySelectorAll(".gdrive-video").forEach(iframe => {
  iframe.addEventListener("contextmenu", e => e.preventDefault());
});
// Load YouTube API


/**----------------------------------------------- */

// for reels 
document.addEventListener('DOMContentLoaded', () => {
  let index = 0;
  const track = document.querySelector('.video-track');
  const total = track.children.length;

  // Vimeo Player instances
  const players = Array.from(track.querySelectorAll('iframe')).map(iframe => new Vimeo.Player(iframe));

  // Listen for play event → pause all others
  players.forEach((player, i) => {
    player.on('play', () => {
      players.forEach((otherPlayer, j) => {
        if (i !== j) {
          otherPlayer.pause();
        }
      });
    });
  });

  //scroll horizontally for reels
  function getVisibleVideos() {
    const containerWidth = document.getElementById('videoCarousel').offsetWidth;
    const videoWidth = track.children[0].offsetWidth;
    return Math.floor(containerWidth / videoWidth) || 1;
  }

  window.scrollVideos = function (direction) {
    const visibleVideos = getVisibleVideos();
    const maxIndex = total - visibleVideos;

    index += direction;
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;

    const videoWidth = track.children[0].offsetWidth;
    track.style.transform = `translateX(-${index * videoWidth}px)`;
  };

  // for motion graphics 
  let newIndex = 0;
  const newTrack = document.querySelector('.video-track-new');
  const newTotal = newTrack.children.length;

  function getVisibleVideosNew() {
    const containerWidth = document.getElementById('videoCarouselNew').offsetWidth;
    const videoWidth = newTrack.children[0].offsetWidth;
    return Math.floor(containerWidth / videoWidth) || 1; // At least 1
  }

  window.scrollVideosNew = function (direction) {
    const visibleVideos = getVisibleVideosNew();
    const maxIndex = newTotal - visibleVideos;

    newIndex += direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > maxIndex) newIndex = maxIndex;

    const videoWidth = newTrack.children[0].offsetWidth;
    newTrack.style.transform = `translateX(-${newIndex * videoWidth}px)`;
  };
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
});

document.querySelectorAll('.slide-in').forEach(el => {
  observer.observe(el);
});

const fadeUps = document.querySelectorAll('.fade-up-on-scroll');

const observerNew = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerNew.unobserve(entry.target); // only animate once
    }
  });
}, {
  threshold: 0.2
});

fadeUps.forEach(section => {
  observerNew.observe(section);
});

/**** Videos at a time */
document.querySelectorAll("video").forEach(video => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach(other => {
      if (other !== video) other.pause();
    });
  });
});


//form validation

const nameInput = document.getElementById('exampleInputName');
const mobileInput = document.getElementById('exampleInputNumber');
const submitBtn = document.getElementById('submitBtn');

function validateForm() {
  const nameValid = nameInput.value.trim().length > 2;
  const mobileValid = /^\d{10}$/.test(mobileInput.value.trim());

  nameInput.classList.toggle('is-invalid', !nameValid && nameInput.value !== '');
  mobileInput.classList.toggle('is-invalid', !mobileValid && mobileInput.value !== '');

  submitBtn.disabled = !(nameValid && mobileValid);
}

nameInput.addEventListener('input', validateForm);
mobileInput.addEventListener('input', validateForm);


function showSuccessModal() {
    // Show modal
    var modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();

    // Redirect after 3 seconds
    setTimeout(function() {
        window.location.href = "https://vishal-design31.github.io/portfolio/";
    }, 3000);

}

//redirecting to homepage manually
function redirectNow() {
    window.location.href = "https://vishal-design31.github.io/portfolio/";
}
// auto pause videos
const videos = document.querySelectorAll('.gdrive-video');

videos.forEach((iframe) => {
  // Detect when the iframe is clicked (initiates play)
  iframe.addEventListener('mouseenter', () => {
    videos.forEach((otherIframe) => {
      if (otherIframe !== iframe) {
        // Pause other videos using postMessage
        otherIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    });
  });
});



