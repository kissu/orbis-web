document.addEventListener('DOMContentLoaded', function () {
    loadContent('ActivitiePage');

    const navigationLinks = document.querySelectorAll('.tab-bar a');
    navigationLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const route = this.getAttribute('href').substring(1); 
            loadContent(route);
        });
    });
});

function loadContent(route) {
    fetch(`${route}.html`)
        .then(response => response.text())
        .then(html => {
            document.querySelector('.content').innerHTML = html;
        })
        .catch(error => console.error(error));
}