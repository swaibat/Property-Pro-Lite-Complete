document.getElementById('createProperty').addEventListener('submit', createProperty);

function createProperty(e) {
  e.preventDefault();
  var formData = new FormData();

    var photos = document.querySelector('input[type="file"][multiple]');
    formData.append('price', JSON.parse(document.getElementById('price').value))
    formData.append('address', document.getElementById('autocomplete').value)
    formData.append('city', document.querySelector('#locality').value)
    formData.append('state', document.getElementById('administrative_area_level_1').value)
    formData.append('type', document.querySelector('#type').value);

    for (var i = 0; i < photos.files.length; i++) {
      formData.append('imageUrl', photos.files[i]);
    }

    fetch('http://localhost:3000/api/v2/property', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 201) {
      userAccess();
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