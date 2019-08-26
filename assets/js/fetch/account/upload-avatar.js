
// patch avatar upload image
function patchProperty() {
    const formData = new FormData();
    const photo = document.getElementById('imageUpload').files[0];
    formData.append('avatar', photo);
    fetch(`${document.api.users_url}/profile/upload`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: '*/*',
      },
      body: formData,
    })
      .then(response => response.json())
      .then((data) => {
        flashMessage() 
        if (data.status === 200) {
          document.querySelector('.color').classList.add('green');
          document.getElementById('flash-txt').innerHTML = data.message;
        } else {
          document.querySelector('.color').classList.add('red');
          document.getElementById('flash-txt').innerHTML = data.error || data.message;
        }
    });
  
}


document.getElementById('imageUpload').addEventListener('change', readURL, true);
document.querySelector('#avatar-space').addEventListener('mouseover', () => {
  document.querySelector('[for="imageUpload"]').classList.remove('d-none');
});

document.querySelector('#avatar-space').addEventListener('mouseout', () => {
  document.querySelector('[for="imageUpload"]').classList.add('d-none');
});

function romoveIcon() {
  document.querySelector('[for="imageUpload"]').classList.add('d-none');
}

function readURL() {
  const file = document.getElementById('imageUpload').files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    document.getElementById('avatar').src = reader.result;
    document.getElementById('nav-avatar').src = reader.result;
    patchProperty();
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
  }
}