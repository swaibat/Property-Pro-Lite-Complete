function delProperty() {
    fetch(`http://localhost:3000/api/v2/property/${JSON.parse(location.href.split('=')[1])}`, {
      method: 'DELETE',
            headers: {
              Accept: 'application/json, text/plain , */*',
              'content-type': 'application/json',
            },
          })
            .then(response => response.json())
            .then((data) => {
              if (data.status === 200) {
              agentAccess();
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
  function patchProperty() {
    fetch(`http://localhost:3000/api/v2/property/${JSON.parse(location.href.split('=')[1])}/sold`, {
      method: 'PATCH',
            headers: {
              Accept: 'application/json, text/plain , */*',
              'content-type': 'application/json',
            },
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
    document.onreadystatechange = function getproperty() {
      fetch(`http://localhost:3000/api/v2/property/${JSON.parse(location.href.split('=')[1])}`)
          .then((response) => response.json())
          .then((e) => {
              if (e.status === 403) location.replace("index.html")
              if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
              const ad = e.property;
              document.querySelector('#left-details').innerHTML=`
                  <img class="margin-t-n1"  src="https://res.cloudinary.com/dbe1sfmr4/image/upload/v1562085590/house2_ret4vf.jpg" alt="product">
                      <div class="footer-related">
                              <img class="footer-img shadow" src="./assets/img/ads/house1/interior1.jpg" alt="product">
                              <img class="footer-img shadow" src="./assets/img/ads/house1/interior2.jpg" alt="product">
                              <img class="footer-img shadow" src="./assets/img/ads/house1/interior3.jpg" alt="product">
                              <img class="footer-img shadow" src="./assets/img/ads/house1/interior4.jpg" alt="product">
                      </div>
                      <div class="d-flex margin-1 padding-2">
                          <img class="circle agent-img" src="./assets/img/user.svg" height="70" width="70" alt="user">
                          <div class="flex-y padding-x-2">
                              <b>Contact agent</b>
                              <p class="margin-l-3"><b><i class="icon-phone-pro-lite"></i></b> ${ad.ownerphonenumber} <b class="margin-l-3">email:</b> ${ad.owneremail} </p>
                          </div>
                      </div>
              `;
              document.querySelector('#right-details').innerHTML =`
              <h1 class="margin-1">${ad.type} in ${ad.city}</h1>
                  <div class="d-flex">
                      <p><b>Ad id :</b> ${ad.id}</p>
                      <p class="margin-l-3"><b>Location :</b> ${ad.address}</p>
                      <p class="margin-l-3"> <b>State :</b> ${ad.state}</p>
                  </div>
                  <h2>$${ad.price}</h2>
                  <p class="text-center">Lorem ipsum dolor sit amet, no mea aperiri invenire, nisl dolore mollis ad sed, ei sonet singulis persequeris sea.</p>
              `;
              document.querySelector('#btns').innerHTML =`
                  <a href="editad.html?id=${JSON.parse(location.href.split('=')[1])}" class="btn btn-gradient "><i class="icon-pencil-pro-lite margin-r-1"></i>Edit</a>
                  <a onclick="patchProperty()" class="btn orange margin-l-3 "><i class="icon-checkmark-pro-lite margin-r-1"></i>sold</a>
                  <a onclick="delProperty()" class="btn red margin-l-auto"><i class="icon-bin2-pro-lite margin-r-1"></i>Delete</a>`
          });
      }