fetch(document.api.ads_url)
  .then(response => response.json())
  .then((e) => {
    if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
    let latest = e.data.sort((a, b) => parseFloat(a.id) - parseFloat(b.id))
    let ads = '';
    latest.forEach((ad) => {
        popularAds += document.api.ad(ad);
    });
    document.getElementById('all-ads').innerHTML = ads;
});
