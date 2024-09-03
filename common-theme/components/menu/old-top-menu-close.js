document.addEventListener('DOMContentLoaded', () => {
    try {
        window.addEventListener('click', (e) => {
            let languageContainer = document.querySelector('.lang-menu')
            let target = e.target
            let matches = target.closest('.lang-menu')
            !matches && languageContainer.classList.remove('active')
        })
    } catch (e) {
    }
})
