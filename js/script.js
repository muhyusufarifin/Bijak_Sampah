document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav ul li a');

    // Fungsi untuk menutup menu mobile
    function closeMobileMenu() {
        if (mainNav && mobileMenu && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }

    // Toggle menu mobile
    if (mobileMenu && mainNav) {
        mobileMenu.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    } else {
        console.error("Elemen 'mobile-menu' atau 'main-nav' tidak ditemukan.");
    }

    // Close mobile menu when a link is clicked and smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offsetTop = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 5; // Adjusted offset for precision
            const sectionId = section.getAttribute('id');

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.offsetHeight) {
                currentSectionId = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && currentSectionId && link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    // Handle window resize for mobile menu behavior consistency
    let initialWindowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (initialWindowWidth <= 768 && window.innerWidth > 768) {
            closeMobileMenu();
        }
        initialWindowWidth = window.innerWidth;
    });

    // =============== FUNGSI GALERI MODAL BARU ===============
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const galleryImages = document.querySelectorAll('.galeri-item img');
    const span = document.getElementsByClassName('close-modal')[0];

    galleryImages.forEach(img => {
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.dataset.description;
        }
    });

    // Fungsi untuk menutup modal saat tombol close (x) diklik
    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    // Fungsi untuk menutup modal saat area di luar gambar diklik
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // =========================================================
});