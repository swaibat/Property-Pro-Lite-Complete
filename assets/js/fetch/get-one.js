fetch(`http://localhost:3000/api/v2/property/${JSON.parse(location.href.split('=')[1])}`)
        .then((response) => response.json())
        .then((e) => {
            // if (e.status === 403) location.replace("index.html")
            if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
            const ad = e.data[0];
            document.querySelector('#details').innerHTML =`
                    <h1 class="margin-1 margin-t-n1">${e.data[0].type} in ${e.data[0].city}</h1>
                        <div class="justify-btn">
                            <p><b>Ad id :</b> ${e.data[0].id} </p>
                            <p class="margin-l-3"><i class="pro-alarm-lite margin-r-2"></i>${e.data[0].owner.createdon.split('T')[0]}</p>
                            <p class="margin-l-3"><i class="pro-eye-lite margin-r-2"></i>${e.data[0].views} views</p>
                        </div>
                        <p class="margin-l-3"><i class="pro-map-placeholder-dark-symbol-lite margin-r-2"></i>${e.data[0].address}</p>
                    <h2>$150</h2>
                `
            document.querySelector('#agent').innerHTML =`
            <div class="flex-center">
                <img class="circle" src="${e.data[0].owner.avatar}" height="85" width="85" alt="user">
                <span  class="status green"></span>
            </div>
            <h3 class="align-center teal-txt margin-b-2">${e.data[0].owner.firstname} ${e.data[0].owner.lastname}</h3>
            <table>
                <tbody>
                    <tr>
                        <td class="left"><i class="pro-phone-lite margin-r-2"></i>${e.data[0].owner.phonenumber}</td>
                    </tr>
                    <tr>
                        <td  class="left"><i class="pro-envelop-lite margin-r-2"></i><span id="ownerEmail">${e.data[0].owner.email}</span></td>
                    </tr>
                    <tr>
                        <td class="left"><i class="pro-map-placeholder-dark-symbol-lite margin-r-2"></i>${e.data[0].owner.address}</td>
                    </tr>
                    <tr>
                        <td class="left">Reg Date: ${e.data[0].owner.createdon.split('T')[0]}</td>
                    </tr>
                    <tr>
                        <td class="left">Reg: 1/2/2019</td>
                    </tr>
                </tbody>
            </table>
            <button class="btn blue align-center">start chat</button>
                 `;
            let imgs = '';
            let others = '';

            for (let i = 0; i < ad.imageurl.length; i++) {
                imgs += `
                <div class="mySlides">
                    <div class="numbertext">${1+i} / ${ad.imageurl.length}</div>
                    <img src="${ad.imageurl[i]}">
                </div>
                    `
                others += `
                <img class="demo cursor" src="${ad.imageurl[i]}" onclick="currentSlide(${1+i})">`  
            }

                document.querySelector('#slider').innerHTML = imgs;
                document.querySelector('#related').innerHTML = others;
                var geocoder = new google.maps.Geocoder();
    var address = e.data[0].address;

    geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();

    var latLang = new google.maps.LatLng(latitude, longitude);

        function initMap() {
        var mapProp = {
            center: latLang,
            zoom: 13,
        };
        
        var map = new google.maps.Map(document.getElementById('map'), mapProp);
        
        var marker = new google.maps.Marker({
            position: latLang,
            map: map,
            title: ''
        });
        }

        initMap();
        } 
    }); 
        });
    




        fetch('http://localhost:3000/api/v2/property')
        .then((response) => response.json())
        .then((e) => {
            // if (e.status === 403) location.replace("index.html")
            if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
            
            const agentAds = e.data.filter(ad => ad.owner.email === document.querySelector('#ownerEmail').innerHTML)
            let adsByAgent = '';
            agentAds.forEach((ad) => {  
            adsByAgent += `
            <div class="card">
                <div class="card-body">
                    <span class="white shadow price-tag">$${ad.price}</span>
                    <a  href="oneAd.html?id=${ad.id}"><img src="${ad.imageurl[0]}" alt="${ad.type}"></a>
                </div>
                <div class="card-foot flex-y">
                    <div class="ad-hero bg-imgs">
                        <span class ="img-size">
                            <span class="sm-font">${ad.imageurl.length}<i class="pro-camera-lite margin-l-1"></i></span>
                        </span>
                        <span class="sm-font"><i class="pro-eye-lite red-txt margin-r-1"></i>${ad.views} views</span>
                        <span class="sm-font margin-r-2"><i class="pro-map-placeholder-dark-symbol-lite margin-r-1"></i>${ad.city}</span>
                    </div>
                    <div class="d-flex padding-2">
                        <p>${ad.type}</p>
                        <a href="oneAd.html?id=${ad.id}" class="margin-l-auto orange-txt">Details</a>
                    </div>
                </div>
            </div>
                `
            });
            document.getElementById('agentAds').innerHTML = adsByAgent;
        });

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


