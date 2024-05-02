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

// stripe api
// const button = document.querySelector("button");
// button.addEventListener("click", () => {
//   fetch("http://localhost:3000/create-checkout-session", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       items: [{ id: 1, quantity: 1 }],
//     }),
//   })
//     .then((res) => {
//       if (res.ok) return res.json();
//       return res.json().then((json) => Promise.reject(json));
//     })
//     .then(({ url }) => {
//       window.location = url;
//     })
//     .catch((e) => {
//       console.error(e.error);
//     });
// });

//database
document.addEventListener("DOMContentLoaded", function() {
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;

      try {
        const response = await fetch("/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        });
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    });
  } else {
    console.error("Form element not found.");
  }
});
