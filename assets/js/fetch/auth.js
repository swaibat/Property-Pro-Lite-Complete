
const authUrl = 'http://localhost:3000/api/v2/users/auth';
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
  fetch(`${authUrl}/signup`, {
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
        document.querySelector('.color').classList.add('green');
        document.querySelector('#signup').classList.remove('visible');
        document.getElementById('flash-txt').innerHTML = data.message;
        if (data.data.isAgent === true) {
          agentAccess();
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
  fetch(`${authUrl}/signin`, {
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
      localStorage.setItem('token', data.data.token);
      if (data.status === 200) {
        document.querySelector('.color').classList.add('green');
        document.querySelector('#signup').classList.remove('visible');
        document.getElementById('flash-txt').innerHTML = data.message;
        if (JSON.parse(data.data.isAgent) === true) {
          agentAccess();
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
