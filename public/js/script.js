const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const email = formData.get('email');
  const password = formData.get('password');

  const response = await fetch('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

	if (response.status === 401) {
		alert('Invalid username or password');
	} else if (response.status === 200) {
		window.location.href = '/views/home.html';
	}
	// if (response.ok) {
	// 	const { token } = await response.json();
	// 	document.cookie = `token=${token}`;
	// 	window.location.href = '/views/home.html';
	// } else {
	// 	const error = await response.text();
	// 	alert(error);
	// }
});
