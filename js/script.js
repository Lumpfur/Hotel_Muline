/**************************************************** 
 * Определение с какого устройства открывается сайт
*/

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

/**************************************************** */

if (isMobile.any()) {
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc');
}

// ===== ПОЛУЧАЕМ ЭЛЕМЕНТЫ МЕНЮ (ОДИН РАЗ!) =====
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

// ===== МЕНЮ (БУРГЕР) =====
if (iconMenu && menuBody) {
    iconMenu.addEventListener('click', function(e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

// ===== ПРОКРУТКА К РАЗДЕЛАМ =====
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

            // если открыто мобильное меню — закрываем
            if (iconMenu && iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

// ===== ПЛАВНАЯ ПРОКРУТКА ДЛЯ КНОПОК "ЗАБРОНИРОВАТЬ" =====
document.addEventListener('DOMContentLoaded', function() {
    const bookingLinks = document.querySelectorAll('a[href="#booking"]');

    bookingLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#booking');
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== ЗАКРЫТИЕ МЕНЮ ПО КЛИКУ НА ССЫЛКУ (МОБИЛКИ) =====
document.addEventListener('DOMContentLoaded', function() {
    const allMenuLinks = document.querySelectorAll('.menu__link');

    allMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                if (iconMenu) {
                    iconMenu.classList.remove('_active');
                }
                if (menuBody) {
                    menuBody.classList.remove('_active');
                }
                document.body.classList.remove('_lock');
            }
        });
    });
});

// ===== КНОПКА "ЗАБРОНИРОВАТЬ" В МОБИЛЬНОМ МЕНЮ =====
document.addEventListener('DOMContentLoaded', function() {
    const menuBookingBtn = document.getElementById('menuBookingBtn');
    const iconMenu = document.querySelector('.menu__icon');
    const menuBody = document.querySelector('.menu__body');

    if (menuBookingBtn) {
        menuBookingBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Закрываем меню
            if (iconMenu) {
                iconMenu.classList.remove('_active');
            }
            if (menuBody) {
                menuBody.classList.remove('_active');
            }
            document.body.classList.remove('_lock');

            // Плавно скроллим к блоку бронирования
            const target = document.querySelector('#booking');
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});