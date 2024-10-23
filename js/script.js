window.onload = function() {
    const dailyCards = document.querySelectorAll('.daily-card');
    const buttons = document.querySelectorAll('.btn-img');
    const otherCards = document.querySelectorAll('.card');
    const diskCards = document.querySelectorAll('.disk-container');
    const tabContainer = document.querySelectorAll('.tab-container');
    const title = document.querySelectorAll('.title');
    const header = document.querySelectorAll('.header');
    const musicDisplay = document.querySelectorAll('.music-display');
    const carouselContainer = document.querySelectorAll('.carousel-item')
    const credit = document.querySelectorAll('.credit-container')

    const observerDailyCards = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 250); 
                observerDailyCards.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.5
    });

    dailyCards.forEach(card => {
        observerDailyCards.observe(card);
    });

    const allElements = [...buttons, ...otherCards, ...diskCards, ...tabContainer, ...title
        ,...header, ...musicDisplay, ...carouselContainer, ...credit
    ];

    const observer = new IntersectionObserver((entries) => { 
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    allElements.forEach(element => {
        observer.observe(element);
    });
};