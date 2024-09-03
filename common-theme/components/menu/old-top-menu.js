document.addEventListener('DOMContentLoaded', () => {

    document.querySelector(`[data-menu="mobile-menu"]`).addEventListener('click', () => {
        let menuContainer = document.querySelector('.top__menu-box').toggleAttribute('menu-open');
        let burgerItem = document.querySelector(`[data-menu="mobile-menu"]`).classList.toggle('open');
    })

})
