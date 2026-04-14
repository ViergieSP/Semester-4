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

    // Logika Form Kontak dengan Validasi JS & Feedback Dinamis
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const submitBtn = contactForm.querySelector('.btn-submit');

        formFeedback.className = 'mt-4 text-center alert';
        
        if (name === '' || email === '' || message === '') {
            formFeedback.classList.add('alert-danger');
            formFeedback.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i> Error: Semua field wajib diisi!`;
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailPattern.test(email)) {
            formFeedback.classList.remove('d-none');
            formFeedback.classList.add('alert-danger');
            formFeedback.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i> Error: Format email tidak valid (Gunakan format: nama@email.com)!`;
            return; 
        }

        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
            formFeedback.classList.remove('alert-danger');
            formFeedback.classList.add('alert-success');
            formFeedback.innerHTML = `
                <i class="bi bi-check-circle-fill me-2"></i>
                Terima kasih, <strong>${name}</strong>! Pesan Anda telah kami terima.
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

    // Logika Toggle Harga
    const pricingToggle = document.getElementById('pricingToggle');
    const labelMonthly = document.getElementById('label-monthly');
    const labelYearly = document.getElementById('label-yearly');

    const proPriceParent = document.getElementById('pro-price');
    const proPriceValue = document.querySelector('#pro-price .value');
    const proPriceDuration = document.querySelector('#pro-price .duration');
    
    const plusPriceParent = document.getElementById('plus-price');
    const plusPriceValue = document.querySelector('#plus-price .value');
    const plusPriceDuration = document.querySelector('#plus-price .duration');

    const hargaProPerBulan = 199000;
    const hargaPlusPerBulan = 99000;
    const diskonPersen = 20;

    function formatSingkat(angka) {
        if (angka >= 1000000) {
            return 'Rp ' + (angka / 1000000).toFixed(1).replace('.0', '').replace('.', ',') + 'jt';
        } else if (angka >= 1000) {
            return 'Rp ' + Math.round(angka / 1000) + 'k';
        }
        return 'Rp ' + angka;
    }

    if (proPriceValue && plusPriceValue) {
        proPriceValue.textContent = formatSingkat(hargaProPerBulan);
        plusPriceValue.textContent = formatSingkat(hargaPlusPerBulan);
    }

    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            
            [proPriceParent, plusPriceParent].forEach(parent => {
                parent.classList.remove('price-change-anim');
                void parent.offsetWidth;
                parent.classList.add('price-change-anim');
            });

            if (this.checked) {
                const totalProTahun = hargaProPerBulan * 12;
                const totalPlusTahun = hargaPlusPerBulan * 12;

                const finalPro = totalProTahun - (totalProTahun * (diskonPersen / 100));
                const finalPlus = totalPlusTahun - (totalPlusTahun * (diskonPersen / 100));

                plusPriceValue.textContent = formatSingkat(finalPlus);
                plusPriceDuration.textContent = '/thn';

                proPriceValue.textContent = formatSingkat(finalPro);
                proPriceDuration.textContent = '/thn';
                
                labelYearly.classList.add('text-active');
                labelMonthly.classList.remove('text-active');
            } else {
                plusPriceValue.textContent = formatSingkat(hargaPlusPerBulan);
                plusPriceDuration.textContent = '/bln';

                proPriceValue.textContent = formatSingkat(hargaProPerBulan);
                proPriceDuration.textContent = '/bln';
                
                labelMonthly.classList.add('text-active');
                labelYearly.classList.remove('text-active');
            }
        });
    }
});
