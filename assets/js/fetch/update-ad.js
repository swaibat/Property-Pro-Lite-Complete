document.getElementById('createProperty').addEventListener('submit', createProperty);
        
function createProperty(e) {
  e.preventDefault();
    const price = JSON.parse(document.getElementById('price').value);
    const address = document.getElementById('autocomplete').value;
    const city = document.querySelector('#locality').value;
    const state = document.getElementById('administrative_area_level_1').value;
    const type = document.querySelector('#type').value;
    const imageUrl = document.getElementById('photo-upload').value;
  fetch(`http://localhost:3000/api/v2/property/${JSON.parse(location.href.split('=')[1])}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain , */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      price,
      address,
      city,
      state,
      type,
      imageUrl
    }),
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
document.onreadystatechange = function getproperty() {
fetch(`http://localhost:3000/api/v2/property/${JSON.parse(location.href.split('=')[1])}`)
.then((response) => response.json())
.then((e) => {
  if (e.status === 403) location.replace("index.html")
  if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
  const ad = e.property;
  document.getElementById('price').value =`${ad.price}`;
  document.getElementById('autocomplete').value=`${ad.address}`;
  document.querySelector('#locality').value=`${ad.city}`;
  document.getElementById('administrative_area_level_1').value=`${ad.state}`;
  document.querySelector('#type').value=`${ad.type}`;
  document.getElementById('photo-upload').value=`${e.property.imageUrl}`;
});
}      