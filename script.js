// Mobile Navigation
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile navigation when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 90, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Active link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize EmailJS with your user ID
emailjs.init("YOUR_USER_ID");

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading indicator
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        
        // Send the email using EmailJS
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function() {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = `
                    <p>Thank you for your message!</p>
                    <p>I'll get back to you soon.</p>
                `;
                
                // Clear form and append success message
                contactForm.reset();
                contactForm.style.display = 'none';
                contactForm.parentNode.appendChild(successMessage);
                
                // Remove success message after 5 seconds and show form again
                setTimeout(() => {
                    successMessage.remove();
                    contactForm.style.display = 'block';
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 5000);
            })
            .catch(function(error) {
                // Show error message
                alert('Oops! Something went wrong. Please try again later.');
                console.error('EmailJS error:', error);
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Animation on scroll (simple version)
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.skills-category, .project-card, .timeline-item, .contact-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
});

// Add CSS class for animated elements
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .skills-category, .project-card, .timeline-item, .contact-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Add active class to nav links based on URL hash on page load
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash) {
        const activeNavLink = document.querySelector(`.nav-links a[href="${hash}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
    } else {
        // Default to home if no hash
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});

// Add style for active nav links if not defined in CSS
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--primary-color);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});

// Simple typing effect for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        
        let titleIndex = 0;
        let subtitleIndex = 0;
        let titleDone = false;
        
        function typeTitle() {
            if (titleIndex < titleText.length) {
                heroTitle.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeTitle, 100);
            } else {
                titleDone = true;
                setTimeout(typeSubtitle, 300);
            }
        }
        
        function typeSubtitle() {
            if (subtitleIndex < subtitleText.length) {
                heroSubtitle.textContent += subtitleText.charAt(subtitleIndex);
                subtitleIndex++;
                setTimeout(typeSubtitle, 100);
            }
        }
        
        setTimeout(typeTitle, 500);
    }
});

// Auto-hide header on scroll down, show on scroll up
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scroll down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add transition to header
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        header {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});






// Project Details Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal element
    const modal = document.getElementById('projectModal');
    
    // Get the close button
    const closeBtn = document.querySelector('.close-modal');
    
    // When the user clicks on the close button, close the modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto'; // Enable scrolling again
    }
    
    // When the user clicks anywhere outside of the modal content, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Enable scrolling again
        }
    }
});

// Function to show project details
function showProjectDetails(projectId) {
    const modal = document.getElementById('projectModal');
    const projectDetailsContent = document.getElementById('projectDetailsContent');
    
    // Project details content
    const projectDetails = {
        'project1': {
            icon: 'fa-camera-alt',
            title: 'AI-Powered Online Proctoring System',
            date: 'December 2024 - March 2025',
            description: `
                <p>An advanced online proctoring system that uses artificial intelligence to enable secure and reliable remote examinations. This system incorporates multiple AI technologies to detect and prevent academic dishonesty.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>Face Recognition:</strong> Verifies student identity throughout the examination</li>
                    <li><strong>Liveness Detection:</strong> Ensures a real person is taking the exam, not a photo or video</li>
                    <li><strong>Real-time Monitoring:</strong> Tracks eye movements, facial expressions, and body posture</li>
                    <li><strong>Object Detection:</strong> Identifies unauthorized objects in the examination environment</li>
                    <li><strong>Browser Activity Monitoring:</strong> Prevents access to unauthorized websites or applications</li>
                    <li><strong>Audio Analysis:</strong> Detects suspicious sounds or conversations</li>
                    <li><strong>Automated Reporting:</strong> Generates comprehensive reports of potential violations</li>
                </ul>
                
                <h3>Technical Implementation</h3>
                <p>The system was built using a microservices architecture with Flask for the backend API. Computer vision capabilities were implemented using OpenCV and YOLOv5 for object detection. A MySQL database stores examination data, student profiles, and monitoring results.</p>
                
                <p>The frontend dashboard provides real-time monitoring capabilities for proctors and analytics for educational institutions to review examination integrity.</p>
            `,
            tech: ['Python', 'Flask', 'MySQL', 'OpenCV', 'YOLOv5', 'JavaScript', 'WebRTC', 'TensorFlow'],
            links: [
                {
                    text: 'View GitHub Repository',
                    url: 'https://github.com/rifakm2000/-Artificial-Intelligence-based-Online-Exam-Proctoring-System.git',
                    icon: 'fab fa-github'
                }
            ]
        },
        'project2': {
            icon: 'fa-ambulance',
            title: 'JeevanRaksha – Ambulance Management System',
            date: 'November 2022 - March 2023',
            description: `
                <p>JeevanRaksha is a comprehensive ambulance management system designed to streamline emergency medical services and save lives through rapid response and efficient coordination.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>Real-time Ambulance Booking:</strong> Allows victims or bystanders to quickly request emergency services</li>
                    <li><strong>GPS Tracking:</strong> Real-time location tracking of ambulances to find the nearest available unit</li>
                    <li><strong>Hospital Integration:</strong> Automatic alerts to hospitals about incoming patients and their condition</li>
                    <li><strong>Blood Bank Management:</strong> Real-time inventory of blood supplies across registered hospitals</li>
                    <li><strong>Medical History Access:</strong> Secure access to patient medical records for EMTs</li>
                    <li><strong>Route Optimization:</strong> Identifies the fastest route to the victim and then to the hospital</li>
                </ul>
                
                <h3>Technical Implementation</h3>
                <p>The system consists of an Android mobile application for users and ambulance drivers, and a web-based dashboard for hospitals and administrators. The backend was built with Python and utilizes SQLyog for database management.</p>
                
                <p>The application implements Google Maps API for location services and route optimization, and uses Firebase for real-time notifications and updates.</p>
            `,
            tech: ['Android', 'Python', 'SQLyog', 'Google Maps API', 'Firebase', 'Java'],
            links: [
                {
                    text: 'View Project Documentation',
                    url: '#',
                    icon: 'fas fa-file-alt'
                }
            ]
        }
    };
    
    // Get the details for the selected project
    const details = projectDetails[projectId];
    
    // Create the content HTML
    const content = `
        <div class="project-detail-header">
            <i class="fas ${details.icon}"></i>
            <div class="project-detail-title">
                <h2>${details.title}</h2>
                <p>${details.date}</p>
            </div>
        </div>
        
        <div class="project-detail-content">
            ${details.description}
        </div>
        
        <div class="project-detail-tech">
            ${details.tech.map(item => `<span>${item}</span>`).join('')}
        </div>
        
        <div class="project-detail-links">
            ${details.links.map(link => `
                <a href="${link.url}" target="_blank">
                    <i class="${link.icon}"></i> ${link.text}
                </a>
            `).join('')}
        </div>
    `;
    
    // Update the modal content
    projectDetailsContent.innerHTML = content;
    
    // Display the modal
    modal.style.display = "block";
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind the modal
}