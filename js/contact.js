const form = document.getElementById('form');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const popupMessage = document.getElementById('popupMessage');
const closePopup = document.getElementById('closePopup');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Show the pop-up with a loading message
  popupMessage.textContent = "Sending...";
  popup.style.display = "block";
  overlay.style.display = "block";

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        popupMessage.textContent = "Email sent!";
      } else {
        console.error(response);
        popupMessage.textContent = json.message;
      }
    })
    .catch((error) => {
      console.error(error);
      popupMessage.textContent = "Something went wrong!";
    })
    .then(() => {
      form.reset();
    });
});

// Close the pop-up
closePopup.addEventListener('click', () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});