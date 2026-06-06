document.addEventListener('DOMContentLoaded', () => {
    
    /* ================= 1. Dark/Light Mode Core Switch ================= */
    const toggleButton = document.querySelector("#dark-mode-toggle");
    const bodyElement = document.querySelector("body");

    toggleButton.addEventListener("click", () => {
        bodyElement.classList.toggle("dark-mode");
        
        if (bodyElement.classList.contains("dark-mode")) {
            toggleButton.textContent = "Switch to Light Mode";
            console.log("Dark mode activated");
        } else {
            toggleButton.textContent = "Switch to Dark Mode";
            console.log("Light mode activated");
        }
    });

    /* ================= 2. Image Hobby Gallery Loop ================= */
    const hobbyImages = [
        "https://i.ibb.co/v4bcxR4z/IMG-1204.avif", // Keeping initial profile image as part of loop alternative
        "https://res.cloudinary.com/dcua3egsn/image/upload/f_auto,q_auto/SWVN1357_z4uew0",
        "https://res.cloudinary.com/dcua3egsn/image/upload/f_auto,q_auto/BOOG9390_1_wt1fxm",
        "https://res.cloudinary.com/dcua3egsn/image/upload/f_auto,q_auto/kids-playing-soccer-football_riq7nq"
    ];

    let currentIndex = 0;
    const galleryImg = document.getElementById("gallery-img");
    const nextBtn = document.getElementById("next-btn");

    if (nextBtn && galleryImg) {
        nextBtn.addEventListener("click", () => {
            currentIndex = currentIndex + 1;

            if (currentIndex >= hobbyImages.length) {
                currentIndex = 0; 
            }

            galleryImg.src = hobbyImages[currentIndex];
            console.log("Current Gallery Index:", currentIndex);
        });
    }

    /* ================= 3. Interactive Link Comment Showcase ================= */
    const commentForm = document.getElementById('comment-form');
    const commentsBox = document.getElementById('comments-box');

    if (commentForm && commentsBox) {
        commentForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Form inputs capture
            const name = document.getElementById('viewer-name').value.trim();
            const url = document.getElementById('viewer-url').value.trim();
            const message = document.getElementById('viewer-message').value.trim();

            // Remove empty list notification placeholder text
            const initialPlaceholder = commentsBox.querySelector('.no-comments');
            if (initialPlaceholder) {
                initialPlaceholder.remove();
            }

            // Create submission element node
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('user-comment');

            commentDiv.innerHTML = `
                <p><strong>${escapeHTML(name)}</strong> shared a project link:</p>
                <p><a href="${escapeHTML(url)}" target="_blank">${escapeHTML(url)}</a></p>
                ${message ? `<p style="margin-top: 6px; opacity: 0.85; font-style: italic;">"${escapeHTML(message)}"</p>` : ''}
            `;

            // Insert comment at top of feed
            commentsBox.prepend(commentDiv);

            // Clear data entry inputs
            commentForm.reset();
        });
    }

    // Protection mapping helper function to prevent script injections (XSS mitigation)
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});