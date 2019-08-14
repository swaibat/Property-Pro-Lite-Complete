window.addEventListener('load', function () {
  document.getElementById("loader").classList.remove("loader");
  });
  function toggle() {
    document.getElementById("collapse-menu").classList.toggle("toggle-class")
    }
    var i, acc = document.getElementsByClassName("collapsible");
    for (i = 0; i < acc.length; i++) acc[i].addEventListener("click", function() {
        var e = this.nextElementSibling;
        "block" === e.style.display ? e.style.display = "none" : e.style.display = "block"
    });
    
function initMap() {
  // The location of 
  var kampala = {
      lat: 0.347596,
      lng: 32.582520
  };
  // The map, centered at 
  var map = new google.maps.Map(
      document.getElementById('map'), {
          zoom: 9,
          center: kampala
      });
  // The marker, positioned at 
  var marker = new google.maps.Marker({
      position: kampala,
      map: map
  });
}

// delete confirm
function closeDelete(){
  document.querySelector('#delete').classList.remove('visible');
}

// error message
function errorMe(){
  document.querySelector('#flash').classList.remove('d-none');
  setTimeout(errorMsg, 2000);
}
function errorMsg() {
  document.querySelector('#flash').classList.add('d-none');
}

function userAccess(){
  document.querySelector('#flash').classList.remove('d-none');
  setTimeout(userRoutes, 2000);
}

function agentAccess(){
  document.querySelector('#flash').classList.remove('d-none');
  setTimeout(agentRoutes, 2000);
}

 function agentRoutes() {
  document.querySelector('#flash').classList.add('d-none');
  location.replace("dashboard.html")
}

function userRoutes() {
  document.querySelector('#flash').classList.add('d-none');
  location.replace("adsList.html")
} 

function report(){
  document.querySelector('#delete').classList.add('visible');
}

function closeIn(){
  document.querySelector('#signin').classList.remove('visible');
}

function closeUp(){
  document.querySelector('#signup').classList.remove('visible');
}

function signin(){
  document.querySelector('#signin').classList.add('visible');
  
}

function signup(){
  document.querySelector('#signup').classList.add('visible');
  document.querySelector('#signin').classList.remove('visible');
}

// google script
let placeSearch,
  autocomplete;

const componentForm = {
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
};
function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), { types: ['geocode'] });
  autocomplete.setFields(['address_component']);
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();

  for (const component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  for (let i = 0; i < place.address_components.length; i++) {
    const addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      const val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const circle = new google.maps.Circle({ center: geolocation, radius: position.coords.accuracy });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}


// file upload script
let photoUpload = document.getElementById('photo-upload'),
  imgUploadPreview = document.querySelector('.img-upload-preview');

photoUpload.onchange = function () {
  for (let i = 0; i < photoUpload.files.length; i++) {
    
    // check files supported only images jpg - jpeg - gif
    if (/\.(jpe?g|png|gif)$/i.test(photoUpload.files[i].name) === false) {
    	alert('this type is not supported');
    	photoUpload.value = '';
    	break;
    } else {
    	let reader = new FileReader(),
        photoFileDetailsTemplate = ` `;

      reader.onload = function (event) {
        	let previewImage = document.createElement('img'),
        	previewImageBox = document.createElement('div'),
          removeImage = document.createElement('i');
          let att = document.createAttribute("class");
          att.value = "pro-bin2-lite";
          removeImage.setAttributeNode(att);
        	let removeIcon = document.createTextNode(' ');
        	removeImage.appendChild(removeIcon);
        	previewImage.src = reader.result;
        	previewImageBox.appendChild(previewImage);
        	previewImageBox.classList.add('previewImage');
        	previewImageBox.appendChild(removeImage);
        	imgUploadPreview.appendChild(previewImageBox);
        // insert file detailes template
        previewImageBox.insertAdjacentHTML('beforeend', photoFileDetailsTemplate);
        removeImage.addEventListener('click', removeItem);
        // confirm remove item
        function removeItem(e) {
        	if (confirm('Are you sure you want to remove this item?')) {
        		e.target.parentElement.remove();
        		photoUpload.value = '';
        	}
        }
      };
      // read file url
      
	    reader.readAsDataURL(event.target.files[i]);
    }
  }
};

function latest() {
  window.scrollTo(0, 1000);
}
function featured() {
  window.scrollTo(0, 450);
}
function popular() {
  window.scrollTo(0, 900);
}

// authentication
// signup
document.getElementById('createUser').addEventListener('submit', createUser);
// post posts to the server
function createUser(e) {
  e.preventDefault();

  const firstname = document.getElementById('firstName').value;
  const lastname = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const isagent = document.getElementById('isAgent').value;
  const password = document.getElementById('password').value;
  const phonenumber = document.getElementById('phoneNumber').value;
  const address = document.getElementById('address').value;

  fetch('http://localhost:3000/api/v2/users/auth/signup', {
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
        if (data.data.isAgent === true) {
          agentAccess();
          document.querySelector('#signup').classList.remove('visible');
          document.getElementById('flash-txt').innerHTML = data.message;
        } else {
          userAccess();
          document.querySelector('#signup').classList.remove('visible');
          document.getElementById('flash-txt').innerHTML = data.message;
        }
      } else {
        errorMe();
        document.getElementById('flash-txt').innerHTML = data.error || data.message;
      }
    });
}

