window.addEventListener('load', () => {
    const delFavs = document.querySelectorAll('.del-item');
    for (let i = 0; i < delFavs.length; i++) {
      delFavs[i].addEventListener('click', function () {
        document.querySelector('#fav-counter').textContent--;
        const item = this.parentNode.parentNode;
        item.classList.add('d-none');
        fetch(`${document.api.ads_url}/${item.id}/favourite`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json, text/plain , */*',
            'content-type': 'application/json',
          },
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
      });
    }
});
  