// ====================
//   ARROW & SLIDER LOGIC
// ====================

const slider = document.getElementById("slider");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

const templates = slider.querySelectorAll('.template');

// Calculate scroll step based on first template width + margin (assumes uniform sizes)
const scrollStep = templates[0].offsetWidth + 16; // Adjust the 16 if your gap/margin is different

let activeIndex = 0;

// Get maximum scroll position
function getMaxScroll() {
    return slider.scrollWidth - slider.clientWidth;
}

// Scroll left/right by step
function slideLeft() {
    slider.scrollBy({ left: -scrollStep, behavior: "smooth" });
}

function slideRight() {
    slider.scrollBy({ left: scrollStep, behavior: "smooth" });
}

leftBtn.addEventListener("click", slideLeft);
rightBtn.addEventListener("click", slideRight);

// Auto-slide every 50 seconds
setInterval(() => {
    if (Math.abs(slider.scrollLeft - getMaxScroll()) < 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
        slider.scrollBy({ left: scrollStep, behavior: "smooth" });
    }
}, 50000);

// Unified function: highlight visible card + update body styles
function setActiveCard() {
    const sliderRect = slider.getBoundingClientRect();
    let firstVisible = null;
    let newIndex = 0;

    templates.forEach((template, idx) => {
        const rect = template.getBoundingClientRect();
        if (rect.left >= sliderRect.left && rect.right <= sliderRect.right && !firstVisible) {
            firstVisible = template;
            newIndex = idx;
        }
    });

    templates.forEach((tpl, idx) => {
        tpl.classList.toggle('active', idx === newIndex);
    });

    activeIndex = newIndex;

    // === PREVIEW SWITCH LOGIC ===
    const previews = document.querySelectorAll('.previewLayout .preview');
    previews.forEach((preview, idx) => {
        preview.style.display = (idx === activeIndex) ? 'block' : 'none';
    });

    // Optional: change body color based on index
    const style = templateStyles[activeIndex % templateStyles.length];
    document.body.style.background = style.background;
    document.body.style.color = style.color;
}




// Scroll event and initial load
slider.addEventListener('scroll', setActiveCard);
window.addEventListener('load', setActiveCard);

// Optional: allow direct scroll to a specific template
function scrollToTemplate(index) {
    const target = templates[index];
    if (target) {
        const offset = target.offsetLeft - slider.offsetLeft;
        slider.scrollTo({ left: offset, behavior: 'smooth' });
    }
}

function playVideo(container) {
    const video = container.querySelector('video');
    const img = container.querySelector('img');

    img.style.opacity = '0';
    video.style.opacity = '1';
    video.play();
}

function pauseVideo(container) {
    const video = container.querySelector('video');
    const img = container.querySelector('img');

    video.pause();
    video.currentTime = 0;
    video.style.opacity = '0';
    img.style.opacity = '1';
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const img = entry.target.querySelector('img');
    const article = entry.target.querySelector('article');
    const video = entry.target.querySelector('video');

    if (entry.isIntersecting) {
      if (img) img.classList.add('zoomed');
      if (article) article.classList.add('zoomed');
      if (video) video.classList.add('zoomed');
    } else {
      if (img) img.classList.remove('zoomed');
      if (article) article.classList.remove('zoomed');
      if (video) video.classList.remove('zoomed');
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.firstDiv > div, .tp > div, .mdd > div, .btm > div').forEach(div => {
  observer.observe(div);
});


 const button = document.querySelector('.buttonCont button');
const targets = document.querySelectorAll('.heaCont h1, .heaCont p, .hover-img, .hpCont span');
const video = document.querySelector('.hoverVideo');

button.addEventListener('mouseenter', () => {
    // Change opacity
    targets.forEach(el => el.style.opacity = '0');

    // Show and play video
    video.style.display = 'block';
    video.play();
});

button.addEventListener('mouseleave', () => {
    // Reset opacity
    targets.forEach(el => el.style.opacity = '');

    // Pause and hide video
    video.pause();
    video.currentTime = 0; // rewind
    video.style.display = 'none';
});