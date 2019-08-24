document.api = {};
document.api.ads_url ='http://localhost:3000/api/v2/property';
document.api.users_url ='http://localhost:3000/api/v2/users';
document.api.ad = (ad)=> {
    return `
        <div class="card">
            <div class="card-body">
                <span class="white shadow price-tag">$${ad.price}</span>
                <a  href="oneAd.html?id=${ad.id}"><img class="card-img" src="${ad.imageurl[0]}" alt="${ad.type}"></a>
            </div>
            <div class="card-foot flex-y">
                <div class="ad-hero bg-imgs">
                    <span class ="img-size">
                        <span class="sm-font">${ad.imageurl.length}<i class="pro-camera-lite margin-l-1"></i></span>
                    </span>
                    <span class="sm-font"><i class="pro-eye-lite red-txt margin-r-1"></i>${ad.views} views</span>
                    <span id="city" class="sm-font margin-r-2"><i class="pro-map-placeholder-dark-symbol-lite margin-r-1"></i>${ad.city}</span>
                </div>
                <div class="card-footer justify-btn flex-y-center">
                    <p id="type">${ad.type}</p>
                    <span>
                        <a id="${ad.id}" class="fav-btn btn orange-txt"><i class="pro-like-lite"></i></a>
                        <a href="oneAd.html?id=${ad.id}" class="btn orange-txt"><i class="pro-earth-lite"></i></a>
                    </span>     
                </div>
            </div>
        </div>
    `;
}
