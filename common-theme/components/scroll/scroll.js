document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-scroll]').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            let target = button.getAttribute('data-scroll');
            if(!target) return;
            document.querySelector(target).scrollIntoView({behavior: 'smooth'});
        })
    })
});
