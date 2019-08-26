// get account information
fetch(`${document.api.users_url}/myAccount`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then((e) => {
      document.getElementById('avatar').src = e.data.details.avatar;
      document.getElementById('nav-avatar').src = e.data.details.avatar;
      if (!e.data.details.avatar) document.getElementById('nav-avatar').src = `./assets/img/user.svg`
      if (e.status === 200) {
        document.getElementById('logged-out').classList.add('d-none');
        document.getElementById('logged-in').classList.remove('d-none');
      } else {
        document.getElementById('logged-out').classList.remove('d-none');
        document.getElementById('logged-in').classList.add('d-none');
      }
});
  