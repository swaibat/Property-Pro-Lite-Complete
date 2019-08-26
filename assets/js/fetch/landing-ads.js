
// latest property
fetch(document.api.ads_url)
  .then(response => response.json())
  .then((e) => {
    if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
    let latest = e.data.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).slice(0,4)
    let ads = '';
    latest.forEach((ad) => {
        ads += document.api.ad(ad);
    });
    document.querySelector('#latest').innerHTML = ads;
  });

// popular advert
  fetch(document.api.ads_url)
  .then(response => response.json())
  .then((e) => {
    if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
    let popular = e.data.sort((a, b) => parseFloat(b.views) - parseFloat(a.views)).slice(0,4)
    let popularAds = '';
    popular.forEach((ad) => {
        popularAds += document.api.ad(ad);
    });
    document.querySelector('#popular').innerHTML = popularAds;
  });

  
