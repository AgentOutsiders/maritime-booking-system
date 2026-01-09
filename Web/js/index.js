const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.2, 
    }
);

document.querySelectorAll(".fromLeft, .fromRight").forEach((card) => {
    cardObserver.observe(card);
});