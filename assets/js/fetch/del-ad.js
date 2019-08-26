
// delete a property
function delProperty() {
  fetch(`${document.api.ads_url}/${ JSON.parse(location.href.split('=')[1])}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json, text/plain , */*',
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 200) {
        flashMessage();
        document.querySelector('.color').classList.add('green');
        document.querySelector('#signup').classList.remove('visible');
        document.getElementById('flash-txt').innerHTML = data.message;
      } else {
        errorMe();
        document.querySelector('.color').classList.add('red');
        document.getElementById('flash-txt').innerHTML = data.error || data.message;
      }
    });
}

// mark property sold
function patchProperty() {
  fetch(`${document.api.ads_url}/${JSON.parse(location.href.split('=')[1])}/sold`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json, text/plain , */*',
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 200) {
        flashMessage();
        document.querySelector('.color').classList.add('green');
        document.querySelector('#signup').classList.remove('visible');
        document.getElementById('flash-txt').innerHTML = data.error || data.message;
      } else {
        errorMe();
        document.querySelector('.color').classList.add('red');
        document.getElementById('flash-txt').innerHTML = data.error || data.message;
      }
    });
}

