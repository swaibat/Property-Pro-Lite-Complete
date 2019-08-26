fetch(`${document.api.users_url}/myAccount`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(response => response.json())
    .then((e) => {
      let oneFav;
      if (e.data.details.favourite < 1) {
        oneFav = '<p class ="align-center">No items found</p>';
      } else {
        e.data.details.favourite.forEach((favOne) => {
          oneFav += `
          <li id="${favOne.id}" class="fav-item">
              <img  src="${favOne.imageurl[0]}">
              <div class="flex-y  align-center">
                  <p class="margin-1">${favOne.type}</p>
                  <small>$${favOne.price}</small>
                  <span  class="badge del-item">x</span>
              </div>
          </li>
          `;
        });
      }
      // get favourite list
      document.querySelector('#favorite-list').innerHTML = oneFav;
});
  