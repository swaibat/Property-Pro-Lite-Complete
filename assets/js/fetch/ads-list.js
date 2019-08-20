fetch('http://localhost:3000/api/v2/property')
  .then(response => response.json())
  .then((e) => {
    if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
    let ads = '';
    e.data.forEach((ad) => {
      ads += `
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
                `;
    });
    document.getElementById('ads').innerHTML = ads;
  });
