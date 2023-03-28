
const form = document.getElementById('signup-form');

if (form) {
form.addEventListener('submit', async (event) => {
event.preventDefault();

const { userid, username, password, createdAt, updatedAt, email } = form.elements;

const payload = { userid: userid.value, username: username.value, password: password.value, createdAt: createdAt.value, updatedAt: updatedAt.value, email: email.value };

const response = await fetch('/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

if (response.ok) {
    
    window.location.href = '/home';
  } else {
    const data = await response.json();
    alert(data.message);
    // window.location.href = '/views/home.html';
  }

});
} else {
console.log('Form not found');
}


  