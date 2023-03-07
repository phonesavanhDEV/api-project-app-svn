// const loginForm = document.getElementById('login-form');

// loginForm.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const formData = new FormData(event.target);
//   const email = formData.get('email');
//   const password = formData.get('password');

//   const response = await fetch('/users/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, password }),
//   });

	
// 	const data = await response.json();
// 	if (response.status === 401) {
// 	  alert(data.error);
// 	} else if (response.status === 200) {
// 	  window.location.href = '/views/home.html';
// 	}
// });


const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }

    const data = await response.json();

    if (response.status === 401) {
      alert(data.error);
    } else if (response.status === 200) {
      window.location.href = '/views/home.html';
    }
  } catch (error) {
    console.error(error);
  }
});

