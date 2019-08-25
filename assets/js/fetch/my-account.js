
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
//             agentAccess();
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

// const favId = document.querySelectorAll(".del-item").parentNode;
window.addEventListener('load', function () {
  const delFavs = document.querySelectorAll(".del-item")
for(var i = 0; i < delFavs.length; i++){
  delFavs[i].addEventListener("click", function() {
    document.querySelector('#fav-counter').textContent --;
    const item = this.parentNode.parentNode
    item.classList.add('d-none')
    fetch(`${document.api.ads_url}/${item.id}/favourite`,{
       method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json, text/plain , */*',
            'content-type': 'application/json',
        }
      })
      .then(response => response.json())
      .then((data) => {
        if (data.status === 200) {
          document.querySelector('.color').classList.add('green');
          document.querySelector('#signup').classList.remove('visible');
          document.getElementById('flash-txt').innerHTML = data.error || data.message;
        } else {
          document.querySelector('.color').classList.add('red');
          document.getElementById('flash-txt').innerHTML = data.error || data.message;
        }
      });
  })
}
})
// get account information
fetch(`${document.api.users_url}/myAccount`, {
  method: 'GET',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})
  .then(response => response.json())
  .then((e) => {
    if (e.status === 404) document.getElementById('ads').innerHTML = data.error;
    // if (location.href.toString().match(/index|adsList|oneAd/g)) {
    //   if (e.message === 'my account') {
    //     document.getElementById('logged-out').classList.add('d-none');
    //     document.getElementById('logged-in').classList.remove('d-none');
    //   } else {
    //     document.getElementById('logged-out').classList.remove('d-none');
    //     document.getElementById('logged-in').classList.add('d-none');
    //   }
    // }
    document.querySelector('#fav-counter').innerHTML = e.data.details.favourite.length;
    let oneFav;
    if(e.data.details.favourite < 1){
      oneFav =`<p class ="align-center">No items found</p>`
    }else{
      
    e.data.details.favourite.forEach(favOne => {
      oneFav +=`
      <li id="${favOne.id}" class="fav-item">
          <img  src="${favOne.imageurl[0]}">
          <div class="flex-y  align-center">
              <p class="margin-1">${favOne.type}</p>
              <small>$${favOne.price}</small>
              <span  class="badge del-item">x</span>
          </div>
      </li>
      `
    });
  }
    document.querySelector('#favorite-list').innerHTML = oneFav;
    // if (!e.data.details.avatar) favOne.imageurl[0] = `./assets/img/user.svg`
    document.getElementById('avatar').src = e.data.details.avatar;
    document.getElementById('nav-avatar').src = e.data.details.avatar;
    let ads = '';
    let allViews = 0;
    const soldAds = e.data.myAds.filter(ad => ad.status === 'sold').length;
    const activeAds = e.data.myAds.filter(ad => ad.status === 'available').length;
    e.data.myAds.forEach((ad) => {
      allViews += ad.views;
      ads += `
    <tr class="margin-t-3 white">
        <td data-title="image :">
        <a href="product.html?id=${ad.id}">
            <img class="ad-img shadow" src="${ad.imageurl[0]}" alt="${ad.type}">
        </a></td>
        <td class="subheading">${ad.type}</td>
        <td data-title="price :">$${ad.price}</td>
        <td data-title="status :">
        <a id="status" class="btn small-btn ${ad.status}">${ad.status}</a>
        </td>
        <td data-title="operation :"><a href="product.html?id=${ad.id}" class="btn pin-btn blue"><i class="pro-pencil-lite"></i></a><a href="product.html?id=${ad.id}" class="btn pin-btn red"><i class="pro-bin2-lite"></i></a></td>
    </tr>
        `;
    });
    document.getElementById('ads').innerHTML = ads;
    document.querySelector('.views').innerHTML = allViews;
    document.querySelector('#all-ads').innerHTML = e.data.myAds.length;
    document.querySelector('#sold-ads').innerHTML = soldAds;
    document.querySelector('#active-ads').innerHTML = activeAds;
  });
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
      if (data.status === 200) {
        agentAccess();
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

// add property to favourite


