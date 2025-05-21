// Seven Grup Web Sitesi Ana JavaScript Dosyası

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Mobil Menü Geçişleri
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            navMenu.classList.toggle('active');
        });
    }

    // Sayfa Kaydırma Animasyonları
    const scrollElements = document.querySelectorAll('.scroll-element');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('fade-in');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('fade-in');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // İlk yükleme için animasyonları tetikle
    handleScrollAnimation();

    // Kaydırma Başlığı
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Yukarı Çık Butonu
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Proje Filtreleme
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length && projectItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Aktif sınıfı kaldır
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Tıklanan butona aktif sınıfı ekle
                this.classList.add('active');
                
                // Filtreleme işlemi
                const filterValue = this.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // İletişim Formu Doğrulaması
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('.form-control');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Form gönderme işlemi burada yapılacak
                alert('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
                this.reset();
            } else {
                alert('Lütfen tüm alanları doldurun.');
            }
        });
    }

    // Sayaç Animasyonu
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length) {
        const countUp = (el) => {
            const target = parseInt(el.getAttribute('data-target'));
            const count = parseInt(el.innerText);
            const increment = target / 100;
            
            if (count < target) {
                el.innerText = Math.ceil(count + increment);
                setTimeout(() => countUp(el), 20);
            } else {
                el.innerText = target;
            }
        };
        
        const handleCountAnimation = () => {
            statNumbers.forEach((el) => {
                if (elementInView(el, 1.25) && !el.classList.contains('counted')) {
                    el.classList.add('counted');
                    countUp(el);
                }
            });
        };
        
        window.addEventListener('scroll', () => {
            handleCountAnimation();
        });
        
        // İlk yükleme için sayaçları kontrol et
        handleCountAnimation();
    }
});
