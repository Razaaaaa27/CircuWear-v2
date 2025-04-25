
        // Toggle mobile sidebar
        function toggleSidebar() {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.overlay');
            
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }
        
        // Show different sections
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Update active navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
            
            // Close mobile sidebar if open
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.overlay');
            if (window.innerWidth < 769 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        }
        
        // Initialize event listeners for navigation
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sectionId = this.getAttribute('href').substring(1);
                    showSection(sectionId);
                });
            });
        });
    

        function loadPage(page) {
            fetch(page)
                .then(res => res.text())
                .then(html => {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    document.querySelector(`[onclick="loadPage('${page}')"]`).classList.add('active');
                    document.getElementById('content-area').innerHTML = html;
                });
        }
        
        window.addEventListener('DOMContentLoaded', () => loadPage('dashboard.html'));


        function loadPage(page) {
            fetch(page)
                .then(res => res.text())
                .then(html => {
                    document.getElementById('content-area').innerHTML = html;
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    document.querySelector(`[onclick="loadPage('${page}')"]`).classList.add('active');
        
                    // Ganti URL di browser tanpa reload
                    const pageName = page.replace('.html', '');
                    history.pushState({ page }, '', `#${pageName}`);
                });
        }

        // Untuk menangani back/forward browser
window.addEventListener('popstate', () => {
    const hash = location.hash.replace('#', '') || 'dashboard';
    loadPage(`${hash}.html`);
});

        