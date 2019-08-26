document.getElementById('createProperty').addEventListener('submit', createProperty);

function createProperty(e) {
    e.preventDefault();
    const price = JSON.parse(document.getElementById('price').value);
    const address = document.getElementById('autocomplete').value;
    const city = document.querySelector('#locality').value;
    const state = document.getElementById('administrative_area_level_1').value;
    const type = document.querySelector('#type').value;
    const imageUrl = document.getElementById('photo-upload').value;
    fetch(`${document.api.ads_url}/${JSON.parse(location.href.split('=')[1])}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: '*/*',
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

// update property
fetch(`${document.api.ads_url}/${JSON.parse(location.href.split('=')[1])}`)
  .then((response) => response.json())
  .then((e) => {
    if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
    const ad = e.property;
    document.getElementById('price').value = `${ad.price}`;
    document.getElementById('autocomplete').value = `${ad.address}`;
    document.querySelector('#locality').value = `${ad.city}`;
    document.getElementById('administrative_area_level_1').value = `${ad.state}`;
    document.querySelector('#type').value = `${ad.type}`;
    document.getElementById('photo-upload').value = `${e.property.imageUrl}`;
});