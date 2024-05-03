function openNavMenu() {
  const mobileListOfLinks = document.getElementById("mobileListOfLinks");
  mobileListOfLinks.style.display = "block";
}

function closeNavMenu() {
  const mobileListOfLinks = document.getElementById("mobileListOfLinks");
  mobileListOfLinks.style.display = "none";
}

function filterClass(element) {
  const allElements = document.querySelectorAll(".h3InsideClass");
  allElements.forEach((el) => {
    el.classList.remove("mainClass");
  });
  element.classList.add("mainClass");
}

// Stripe Api
const button = document.querySelector("#submitToPayment");
button.addEventListener("click", () => {
  fetch("http://localhost:3000/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [{ id: 1, quantity: 1 }],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
});

//database
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const age = document.getElementById("age").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const address = document.getElementById("address").value;
      const city = document.getElementById("city").value;
      const state = document.getElementById("state").value;
      const zip = document.getElementById("zip").value;
      const country = document.getElementById("country").value;
      const formData = { firstName, lastName, age, phone, email, address, city, state, zip, country };
      try {
        const response = await fetch("http://localhost:3000/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log("Response data:", responseData);
        } else {
          throw new Error(`Network response error: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  } else {
    console.error("Form element not found.");
  }
});