document.onreadystatechange = function getproperty() {
    fetch(`http://localhost:3000/api/v2/property?type=${location.href.split('=')[1]}`)
        .then((response) => response.json())
        .then((e) => {
            if (e.status === 403) location.replace("index.html")
            console.log(e.status)
            if (e.status === 404) document.getElementById('ads').innerHTML = `<h2>${e.error}</h2>`;

            let ads = '';

            e.data.forEach((ad) => {  
                ads += `
                <div class="card">
                    <div class="card-body">
                        <span class="white shadow price-tag">$${ad.price}</span>
                        <a class="bg-imgs" href="oneAd.html"><img src="${ad.imageurl[0]}" alt="${ad.type}" style="width:100%"></a>
                    </div>
                    <div class="card-foot flex-y">
                        <div class="ad-hero">
                            <span class="sm-font"><i class="pro-eye-lite margin-l-3 red-txt margin-r-1"></i>${ad.views} views</span>
                            <span class="sm-font"><i class="pro-location-lite margin-l-3 margin-r-1"></i>${ad.city}</span>
                        </div>
                        <div class="d-flex padding-2">
                            <p>${ad.type}</p>
                            <a href="oneAd.html?id=${ad.id}" class="margin-l-auto orange-txt">Details</a>
                        </div>
                    </div>
                </div>
                    `
                });
            document.getElementById('ads').innerHTML = ads;
        });
    }      