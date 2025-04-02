document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("membershipModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const closeModal = document.getElementById("closeModal");
  const learnMoreButtons = document.querySelectorAll(".membership-card button");

  const membershipInfo = {
      "Non Profit Membership Level": {
          title: "Nonprofit Membership (Free)",
          description: "Designed for registered nonprofits. Enjoy networking events, a free directory listing, and community workshop invitations."
      },
      "Bronze Membership Level": {
          title: "Bronze Membership ($150/year)",
          description: "Great for small businesses. Get directory listing with website link, discounted event access, and monthly industry updates."
      },
      "Silver Membership Level": {
          title: "Silver Membership ($300/year)",
          description: "For growing businesses. Includes all Bronze benefits plus priority directory placement, social media promotions, and free event access."
      },
      "Gold Membership Level": {
          title: "Gold Membership ($600/year)",
          description: "For maximum visibility. Premium directory placement, event sponsorship, business consultation, and guest speaker opportunities."
      }
  };

  learnMoreButtons.forEach(button => {
      button.addEventListener("click", (event) => {
          const membershipType = event.target.previousElementSibling.textContent;
          const { title, description } = membershipInfo[membershipType];

          modalTitle.textContent = title;
          modalDescription.textContent = description;

          modal.showModal();
      });
  });

  closeModal.addEventListener("click", () => {
      modal.close();
  });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("timestamp").value = new Date().toISOString();
});

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".membership-card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});
