const body = document.body,
    theme = document.getElementById("themeToggle");
theme.addEventListener("click", () => {
    body.classList.toggle("light");
    theme.textContent = body.classList.contains("light") ? "☾" : "☼";
    localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
});
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    theme.textContent = "☾";
}


// ------------Mobile navigation
const mobileMenu = document.getElementById("mobileMenu");
const nav = document.querySelector(".site-header nav");

mobileMenu.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
        mobileMenu.textContent = "✕";
    } else {
        mobileMenu.textContent = "☰";
    }
});


// ---------- CUSTOM CURSOR

const cursorDot=document.querySelector(".cursor-dot");
const cursorRing=document.querySelector(".cursor-ring");

let mouseX=0;
let mouseY=0;

let ringX=0;
let ringY=0;

window.addEventListener("mousemove",(e)=>{

mouseX=e.clientX;
mouseY=e.clientY;

cursorDot.style.left=mouseX+"px";
cursorDot.style.top=mouseY+"px";

});

function animateCursor(){

ringX+=(mouseX-ringX)*0.15;
ringY+=(mouseY-ringY)*0.15;

cursorRing.style.left=ringX+"px";
cursorRing.style.top=ringY+"px";

requestAnimationFrame(animateCursor);

}

animateCursor();

// --------FAQ
    document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
        const currentItem = question.closest(".faq-item");
        // Close all other FAQs
        document.querySelectorAll(".faq-item").forEach((item) => {
            if (item !== currentItem) {
                item.classList.remove("active");
            }
        });
        // Toggle current FAQ
        currentItem.classList.toggle("active");
    });
});

// ------------------ SERVICE MODAL
const serviceModal = document.getElementById("serviceModal")
document.querySelectorAll(".service-card").forEach((card) =>
    card.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            document.getElementById("serviceTitle").textContent = card.dataset.service;
            serviceModal.classList.add("open");
        }
    })
);

document.querySelectorAll(".close").forEach((b) =>
    b.addEventListener("click", () => {
        serviceModal.classList.remove("open");
        galleryModal.classList.remove("open");
    })
);
document.querySelectorAll(".modal").forEach((m) =>
    m.addEventListener("click", (e) => {
        if (e.target === m) m.classList.remove("open");
    })
);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        serviceModal.classList.remove("open");
        galleryModal.classList.remove("open");
    }
});

// ---------form submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {

                submitBtn.textContent = "Message Sent ✓";

                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);

            } else {

                console.error(result);

                submitBtn.textContent = "Try Again";
                submitBtn.disabled = false;
            }

        } catch (error) {

            console.error(error);

            submitBtn.textContent = "Try Again";
            submitBtn.disabled = false;
        }

    });

}
