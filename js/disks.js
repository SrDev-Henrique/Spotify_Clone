const diskCards = document.querySelectorAll(".disk-container");

const observeDiskCards = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("visible");
            }, index * 250);
            observeDiskCards.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5,
});

diskCards.forEach((card) => {
    observeDiskCards.observe(card);
});