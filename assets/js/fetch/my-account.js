
// window.addEventListener('load', function () {
//   const favs = document.querySelectorAll(".fav-btn")
//   for(var i = 0; i < favs.length; i++){
//       favs[i].addEventListener("click", function() {
//       fetch(`${document.api.ads_url}/${this.id}/favourite`,{
//           headers: {
//             authorization: `Bearer ${localStorage.getItem('token')}`,
//             Accept: 'application/json, text/plain , */*',
//               'content-type': 'application/json',
//           }
//         })
//         .then(response => response.json())
//         .then((data) => {
//           if (data.status === 200) {
//             flashMessage();
//             document.querySelector('.color').classList.add('green');
//             document.querySelector('#signup').classList.remove('visible');
//             document.getElementById('flash-txt').innerHTML = data.error || data.message;
//           } else {
//             errorMe();
//             document.querySelector('.color').classList.add('red');
//             document.getElementById('flash-txt').innerHTML = data.error || data.message;
//           }
//         });
//     })
//   }
// });
// remove item from favourite











