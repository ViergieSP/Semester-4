document.addEventListener('DOMContentLoaded', function() {
    // AOS 
    AOS.init({
        duration: 800,
        once: false,
        offset: 100,
        mirror: true
    });

    // Efek Navbar saat Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Logika Form Kontak dengan Feedback Dinamis
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const submitBtn = contactForm.querySelector('.btn-submit');

        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
            formFeedback.classList.remove('d-none', 'alert-danger');
            formFeedback.classList.add('alert-success');
            formFeedback.innerHTML = `
                <i class="bi bi-check-circle-fill me-2"></i>
                Terima kasih, <strong>${name}</strong>! Pesan Anda telah kami terima. Tim kami akan segera menghubungi Anda via email.
            `;

            contactForm.reset();
            submitBtn.innerHTML = 'Kirim Pesan <i class="bi bi-send-fill ms-2"></i>';
            submitBtn.disabled = false;

            setTimeout(() => {
                formFeedback.classList.add('d-none');
            }, 5000);

        }, 2000);
    });

    // Smooth Scroll untuk Link Navigasi
    document.querySelectorAll('.nav-link, .btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse).hide();
                    }

                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});