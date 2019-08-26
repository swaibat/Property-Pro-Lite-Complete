fetch(`${document.api.users_url}/myAccount`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then((e) => {
      let allViews = 0;
      e.data.myAds.forEach((ad) => {
        allViews += ad.views;
      });
  
      const soldAds = e.data.myAds.filter(ad => ad.status === 'sold').length;
      const activeAds = e.data.myAds.filter(ad => ad.status === 'available').length;
  
      document.querySelector('.views').innerHTML = allViews;
      document.querySelector('#all-ads').innerHTML = e.data.myAds.length;
      document.querySelector('#sold-ads').innerHTML = soldAds;
      document.querySelector('#active-ads').innerHTML = activeAds;
    });
  