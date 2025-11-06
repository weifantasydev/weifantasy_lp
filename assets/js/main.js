// Wei Fantasy Online - Main JavaScript

// ... (Your Intersection Observer, Smooth Scroll, and Navigation Logic here) ...

document.addEventListener("DOMContentLoaded", function () {
	const faders = document.querySelectorAll(".fade-in-section");

	const appearOptions = {
		threshold: 0.15,
		rootMargin: "0px 0px -50px 0px",
	};

	const appearOnScroll = new IntersectionObserver(function (
		entries,
		appearOnScroll
	) {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				return;
			} else {
				entry.target.classList.add("is-visible");
				appearOnScroll.unobserve(entry.target);
			}
		});
	},
	appearOptions);

	faders.forEach((fader) => {
		appearOnScroll.observe(fader);
	});

	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});

	// Add active class to current page in navigation
	const currentPage =
		window.location.pathname.split("/").pop() || "index.html";
	document.querySelectorAll(".nav-links a").forEach((link) => {
		if (link.getAttribute("href") === currentPage) {
			link.classList.add("active");
		}
	});

	// --- COUNTDOWN TIMER INITIALIZATION ---

	// Set up the countdown when the DOM is fully loaded
	// This is the correct target date: November 17, 2025 at 00:00:00 (local time)
	// Month is 0-indexed, so 10 = November
	const targetDate = new Date(2025, 10, 17, 0, 0, 0).getTime();

	function updateCountdown() {
		const now = new Date().getTime();
		const distance = targetDate - now;

		// Get countdown elements
		const daysEl = document.getElementById("days");
		const hoursEl = document.getElementById("hours");
		const minutesEl = document.getElementById("minutes");
		const secondsEl = document.getElementById("seconds");

		// Critical Check: Ensure all elements are present before proceeding
		if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
			clearInterval(window.countdownInterval);
			console.error("Countdown elements not found. Stopping timer.");
			return;
		}

		if (distance < 0) {
			// Countdown has ended
			daysEl.textContent = "00";
			hoursEl.textContent = "00";
			minutesEl.textContent = "00";
			secondsEl.textContent = "00";
			clearInterval(window.countdownInterval);
			return;
		}

		// Calculate time units
		const oneSecond = 1000;
		const oneMinute = oneSecond * 60;
		const oneHour = oneMinute * 60;
		const oneDay = oneHour * 24;

		const days = Math.floor(distance / oneDay);
		const hours = Math.floor((distance % oneDay) / oneHour);
		const minutes = Math.floor((distance % oneHour) / oneMinute);
		const seconds = Math.floor((distance % oneMinute) / oneSecond);

		// Update DOM elements with zero-padding
		daysEl.textContent = String(days).padStart(2, "0");
		hoursEl.textContent = String(hours).padStart(2, "0");
		minutesEl.textContent = String(minutes).padStart(2, "0");
		secondsEl.textContent = String(seconds).padStart(2, "0");
	}

	// Call the function once immediately to show the initial time.
	updateCountdown();

	// Start the interval to update the timer every second.
	window.countdownInterval = setInterval(updateCountdown, 1000);

	// --- END OF COUNTDOWN TIMER INITIALIZATION ---
});

// ... (Your Mobile Menu Functions here) ...

// Mobile menu toggle
function toggleMobileMenu() {
	const navLinks = document.querySelector(".nav-links");
	const hamburger = document.querySelector(".hamburger");
	navLinks.classList.toggle("mobile-active");
	hamburger.classList.toggle("active");
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
	const nav = document.querySelector("nav");
	const navLinks = document.querySelector(".nav-links");
	const hamburger = document.querySelector(".hamburger");

	if (navLinks && hamburger) {
		if (
			!nav.contains(event.target) &&
			navLinks.classList.contains("mobile-active")
		) {
			navLinks.classList.remove("mobile-active");
			hamburger.classList.remove("active");
		}
	}
});

// Close mobile menu when a link is clicked
document.addEventListener("DOMContentLoaded", function () {
	const navLinks = document.querySelectorAll(".nav-links a");
	navLinks.forEach((link) => {
		link.addEventListener("click", function () {
			const navLinksMenu = document.querySelector(".nav-links");
			const hamburger = document.querySelector(".hamburger");
			if (
				navLinksMenu &&
				navLinksMenu.classList.contains("mobile-active")
			) {
				navLinksMenu.classList.remove("mobile-active");
				hamburger.classList.remove("active");
			}
		});
	});
});
