
/* ====================
   START OF LOADER SECTION
   ==================== */
window.addEventListener("load", function () {
    const percentageText = document.querySelector('.percentage-text');
    const duration = 4000; // 4 seconds
    const startTime = Date.now();

    function updatePercentage() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const percentage = Math.round(progress * 100);
      percentageText.textContent = `${percentage}%`;
      if (progress < 1) {
        requestAnimationFrame(updatePercentage);
      }
    }

    updatePercentage();

    const loader = document.querySelector(".loader-container");
    const lastShownDate = localStorage.getItem("loaderLastShownDate");
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    if (lastShownDate !== today) {
      // Show loader and fade it out
      setTimeout(() => {
        loader.style.transition = "opacity 1s ease-out";
        loader.style.opacity = "0";

        setTimeout(() => {
          loader.style.display = "none";
        }, 1000); // match fade duration

        // Save today's date
        localStorage.setItem("loaderLastShownDate", today);
      }, 4000);
    } else {
      // Hide immediately if already shown today
      loader.style.display = "none";
    }
});
/* ====================
END OF LOADER SECTION
==================== */

/* ====================
Start OF Nav Menu SECTION
==================== */

const menuIcon = document.querySelector('.menuIc');
const closeIcon = document.querySelector('.closeIc');
const navContainer = document.querySelector('.navContainer');

menuIcon.addEventListener('click', () => {
    navContainer.classList.add('active');
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
    document.body.classList.add('no-scroll'); // prevent scroll
});

closeIcon.addEventListener('click', () => {
    navContainer.classList.remove('active');
    closeIcon.style.display = 'none';
    menuIcon.style.display = 'block';
    document.body.classList.remove('no-scroll'); // allow scroll again
});

navContainer.addEventListener('click', () => {
    navContainer.classList.remove('active');
    closeIcon.style.display = 'none';
    menuIcon.style.display = 'block';
    document.body.classList.remove('no-scroll'); // allow scroll again
});

/* ====================
End OF Nav Menu SECTION
==================== */

/* ====================
   START OF SCROLL TO TOP SECTION
   ==================== */
// Scroll to top functionality
const mybutton = document.querySelector(".arrow");
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 500) {
    if (mybutton) mybutton.style.display = "block";
  } else {
    if (mybutton) mybutton.style.display = "none";
  }
});

if (mybutton) {
  mybutton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
/* ====================
   END OF SCROLL TO TOP SECTION
   ==================== */

const iframe = document.querySelector('.spline');
document.addEventListener('mousemove', (e) => {
  // If mouse is at top half or corner, enable interaction
  if (e.clientY < 200) {
    iframe.style.pointerEvents = 'auto';
  } else {
    iframe.style.pointerEvents = 'none';
  }
});

/* ====================
    START OF TYPED.JS ANIMATION SECTION
    ==================== */
// Typed.js animations
new Typed('.info', {
    strings: ['Daniel Okoh', 'An Full Stack Developer', 'A Game and Tech Enthusiast'],
    typeSpeed: 100,
    showCursor: true,
    backSpeed: 150,
    loop: true,
});
/* ====================
    END OF TYPED.JS ANIMATION SECTION
    ==================== */

/* ====================
    START OF EXPAND BUTTON SECTION
    ==================== */
const expandBtn = document.querySelector(".exp");
if (expandBtn) {

setTimeout(() => {
    expandBtn.addEventListener("click", () => {
    window.location.href = "contact.html";
    });
}, 1000);
}
/* ====================
    END OF EXPAND BUTTON SECTION
    ==================== */

/* ====================
    START OF BOOKING POPUP SECTION
    ==================== */
// Booking popup logic
const bookingContainer = document.querySelector(".bookingContainer");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".bookingForm");
const confirmationMessage = document.querySelector(".bookingSuccess");

window.popUp = () => {
if (bookingContainer && overlay) {
    bookingContainer.style.display = "block";
    overlay.style.display = "block";
}
};

window.closeB = () => {
if (bookingContainer && overlay) {
    bookingContainer.style.display = "none";
    overlay.style.display = "none";
}
};

if (overlay) {
overlay.addEventListener("click", closeB);
}

if (form) {
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
    method: form.method,
    body: formData,
    })
    .then(response => {
    if (response.ok) {
        form.reset();
        if (confirmationMessage) {
        confirmationMessage.style.display = "block";
        setTimeout(() => {
            confirmationMessage.style.display = "none";
            closeB();
        }, 2000);
        }
    } else {
        alert("Oops! Something went wrong.");
    }
    })
    .catch(error => {
    console.error("Error:", error);
    alert("Failed to send. Try again later.");
    });
});
}
/* ====================
END OF BOOKING POPUP SECTION
==================== */

/* ====================
    START OF PORTFOLIO BUTTON SECTION
    ==================== */
// Navigation button click
const portfolioBtn = document.querySelector(".innerpjHead");
if (portfolioBtn) {
portfolioBtn.addEventListener("click", () => {
    setTimeout(() => {
    window.location.href = "portfolio.html";
    }, 500);
});
}
/* ====================
    END OF PORTFOLIO BUTTON SECTION
    ==================== */

