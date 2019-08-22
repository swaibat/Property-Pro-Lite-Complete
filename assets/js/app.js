(function(w, d) {
  function LetterAvatar(name, size) {
      name = name || '';
      size = size || 60;

      var colours = ['#556080'],
          nameSplit = String(name).toUpperCase().split(' '),
          initials, charIndex, colourIndex, canvas, context, dataURI;

      if (nameSplit.length == 1) {
          initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
      } else {
          initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
      }

      if (w.devicePixelRatio) {
          size = (size * w.devicePixelRatio);
      }

      charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
      colourIndex = charIndex % 20;
      canvas = d.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      context = canvas.getContext("2d");

      context.fillStyle = colours[colourIndex - 1];
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = Math.round(canvas.width / 2) + "px Arial";
      context.textAlign = "center";
      context.fillStyle = "#FFF";
      context.fillText(initials, size / 2, size / 1.5);
      dataURI = canvas.toDataURL();
      canvas = null;
      return dataURI;
  }
  LetterAvatar.transform = function() {
      Array.prototype.forEach.call(d.querySelectorAll('img[alt]'), function(img, name) {
          name = img.getAttribute('alt');
          img.src = LetterAvatar(name, img.getAttribute('width'));
          img.removeAttribute('alt');
          img.setAttribute('alt', name);
      });
  };
  // AMD support
  if (typeof define === 'function' && define.amd) {
      define(function() {
          return LetterAvatar;
      });
      // CommonJS and Node.js module support.
  } else if (typeof exports !== 'undefined') {
      if (typeof module != 'undefined' && module.exports) {
          exports = module.exports = LetterAvatar;
      }
      exports.LetterAvatar = LetterAvatar;
  } else {
      window.LetterAvatar = LetterAvatar;
      d.addEventListener('DOMContentLoaded', function(event) {
          LetterAvatar.transform();
      });
  }
})(window, document);

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
document.querySelector('#flash').classList.add('flash')
document.querySelector('#flash').classList.add('d-none')
document.querySelector('#flash').innerHTML=`
<div  class="color"></div>
<span id="flash-txt" class="text"></span>`
window.addEventListener('load', function () {
  });
  document.getElementById("loader").classList.remove("loader");
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

function agentAccess(){
  document.querySelector('#flash').classList.remove('d-none');
  setTimeout(agentRoutes, 2000);
}

 function agentRoutes() {
  document.querySelector('#flash').classList.add('d-none');
  // location.replace("dashboard.html")
}

function userRoutes() {
  document.querySelector('#flash').classList.add('d-none');
  // location.replace("adsList.html")
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

