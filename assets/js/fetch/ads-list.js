fetch(document.api.ads_url)
  .then(response => response.json())
  .then((e) => {
    if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
    let latest = e.data.sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).slice(0,4)
    let ads = '';
    latest.forEach((ad) => {
        ads += document.api.ad(ad);
    });
    document.querySelector('#all-ads').innerHTML = ads;
  });

window.addEventListener('load', function () {
    const favs = document.querySelectorAll(".fav-btn")

    for(var i = 0; i < favs.length; i++){
        favs[i].addEventListener("click", function() {
        fetch(`${document.api.ads_url}/${this.id}/favourite`,{
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              Accept: 'application/json, text/plain , */*',
              'content-type': 'application/json',
            },
          })
          .then(response => response.json())
          .then((data) => {
            if (data.status !== 200) {
              
              const counter = document.querySelector('#fav-counter');
              // errorMe();
              // document.querySelector('.color').classList.add('red');
              // document.getElementById('flash-txt').innerHTML = data.error || data.message;
              const flyingImgs = document.querySelector('.b-flying-img');
              flyingImgs.classList.remove('d-none');
              setTimeout(() => {
                // favImg.src = img
                // love.classList.add('invisible')
                // favImg.classList.remove('invisible')
                // el.parentNode.removeChild(flyingImg);
                flyingImgs.classList.remove('d-none');
                counter.textContent ++
            }, 1000);
            }
          });
      })
    }
});