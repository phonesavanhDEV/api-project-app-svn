// const form = document.getElementById('signup-form');
// form.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const userid = document.getElementById('userid').value;
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;
//   const createdAt = document.getElementById('createdAt').value;
//   const updatedAt = document.getElementById('updatedAt').value;
//   const email = document.getElementById('email').value;
  
//   const response = await fetch('/users/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ userid, username, password, createdAt, updatedAt, email }),
//   });
//   const data = await response.json();
//   if (response.ok) {
//     document.body.innerHTML = `
//       <h1>Success!</h1>
//       <p>${data.message}</p>
//       <p>Token: ${data.token}</p>
//     `;
//   } else {
//     alert(data.message);
//   }
// });

// const form = document.getElementById('signup-form');

// const API_URL = '/users/register';

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const { userid, username, password,createdAt,updatedAt, email } = form.elements;

//   const payload = { userid, username, password, createdAt, updatedAt, email };

//   const response = await fetch(API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });



//     if (response.status === 401) {
//         alert('Invalid username or password');
//     } else if (response.status === 200) {
//         window.location.href = '/views/home.html';
//     }
// });


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
    window.location.href = '/views/home.html';
  } else {
    const data = await response.json();
    alert(data.message);
    // window.location.href = '/views/home.html';
  }

});
} else {
console.log('Form not found');
}


  