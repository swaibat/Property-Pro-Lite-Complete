// authentication
document.getElementById('createUser').addEventListener('submit', createUser);
document.getElementById('userSignin').addEventListener('submit', userSignin);

// user signup
function createUser(e) {
  e.preventDefault();
  const firstname = document.getElementById('firstName').value;
  const lastname = document.getElementById('lastName').value;
  const email = document.querySelector('.email').value;
  const isagent = JSON.parse(document.getElementById('isAgent').value);
  const password = document.querySelector('.password').value;
  const phonenumber = document.getElementById('phoneNumber').value;
  const address = document.getElementById('address').value;
  fetch(`${document.api.users_url}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain , */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      email,
      isAgent: isagent,
      password,
      phoneNumber: phonenumber,
      address,
    }),
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 201) {
        localStorage.setItem('token', data.data.token);
        document.querySelector('.color').classList.add('green');
        document.querySelector('#signup').classList.remove('visible');
        document.getElementById('flash-txt').innerHTML = data.message;
        location.reload()
        if (data.data.isAgent === true) {
          agentRoute();
        } else {
          userAccess();
        }
      } else {
        errorMe();
        document.querySelector('.color').classList.add('red');
        document.getElementById('flash-txt').innerHTML = data.error || data.message;
      }
    });
}

// user signin
function userSignin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.querySelector('#password').value;
  fetch(`${document.api.users_url}/auth/signin`, {
method: 'POST',
headers: {
  Accept: 'application/json, text/plain , */*',
  'content-type': 'application/json',
},
body: JSON.stringify({
  email,
  password,
}),
})
    .then(response => response.json())
    .then((data) => {
      if (data.status === 200) {
        localStorage.setItem('token', data.data.token);
        document.querySelector('.color').classList.add('green');
        document.querySelector('#signup').classList.remove('visible');
        document.getElementById('flash-txt').innerHTML = data.message;
        location.reload()
        if (JSON.parse(data.data.isAgent) === true) {
          flashMessage();
        } else {
          userAccess();
        }
      } else {
        errorMe();
        document.querySelector('.color').classList.add('red');
        document.getElementById('flash-txt').innerHTML = data.error || data.message;
      }
    });
}
