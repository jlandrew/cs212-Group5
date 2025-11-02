// Dark mode button
const btn = document.getElementById('btn');

// Dark mode event listener
btn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
})


// guest login button
const guestbtn = document.getElementById('guestbtn');

// guest-login event listner
guestbtn.addEventListener('click', function () {
    window.location.href = 'to-do.html';
})