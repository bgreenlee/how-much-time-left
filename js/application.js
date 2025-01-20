function updateTimeLeft() {
    // Find all elements with class "time-left"
    const timeElements = document.querySelectorAll('.time-left');

    timeElements.forEach(element => {
        // Get target date from data attribute
        const targetDate = new Date(element.dataset.target);
        const now = new Date();

        // Calculate time difference in milliseconds
        let diff = targetDate - now;

        // If the target date is in the past, show 0s
        if (diff < 0) {
            element.textContent = '0 days, 0 hours, 0 minutes, and 0 seconds';
            return;
        }

        // Convert to days, hours, minutes, seconds
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);

        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);

        const seconds = Math.floor(diff / 1000);

        // Update element text
        element.innerHTML = `${days} days<br>${hours} hours<br>${minutes} minutes<br>${seconds} seconds`;
    });
}

// Update immediately and then every second
updateTimeLeft();
setInterval(updateTimeLeft, 1000);