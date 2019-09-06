
var i, acc = document.getElementsByClassName("collapsible");
    for (i = 0; i < acc.length; i++) acc[i].addEventListener("click", function() {
        var e = this.nextElementSibling;
        "block" === e.style.display ? e.style.display = "none" : e.style.display = "block"
    });

var para = document.createElement("div");
var atto = document.createAttribute("id");
  atto.value = "flash";
var element = document.querySelector('footer');
element.appendChild(para).setAttributeNode(atto)
document.querySelector('#flash').classList.add("flash")
document.querySelector('#flash').classList.add('d-none')
document.querySelector('#flash').innerHTML=`
<div  class="color"></div>
<span id="flash-txt" class="text"></span>`
window.addEventListener('load', function () {
  document.getElementById("loader").classList.remove("loader");
  });
  
  function toggle() {
    document.getElementById("collapse-menu").classList.toggle("toggle-class")
    }
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        var captionText = document.getElementById("caption");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" current", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " current";
        captionText.innerHTML = dots[slideIndex - 1].alt;
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

function flashMessage(){
  document.querySelector('#flash').classList.remove('d-none');
  setTimeout(flashMessageHide, 2000);
}

function agentRoute(){
  document.querySelector('#flash').classList.remove('d-none');
  setTimeout(agentRoutes, 2000);
}

 function flashMessageHide() {
  document.querySelector('#flash').classList.add('d-none');
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
          att.value = "icon-bin2-pro-lite";
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

function featured() {
  window.scrollTo(0, 450);
}
function popular() {
  window.scrollTo(0, 900);
}

