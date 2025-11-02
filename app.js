// Dark mode button
const btn = document.getElementById('btn');

// Dark mode event listener
btn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
})

// event listener for task animations
document.addEventListener("DOMContentLoaded", () => {
   const elements = document.querySelectorAll(".fade-in-element");

   // add show animation when content is loaded
   elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("show");
        }, 200 * index);
   });
});

// guest login button
const guestbtn = document.getElementById('guestbtn');

// guest-login event listner
guestbtn.addEventListener('click', function () {
    window.location.href = 'to-do.html';
})

