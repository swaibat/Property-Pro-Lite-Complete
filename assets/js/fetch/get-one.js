    fetch(`http://localhost:3000/api/v2/property/${JSON.parse(location.href.split('=')[1])}`)
        .then((response) => response.json())
        .then((e) => {
            if (e.status === 403) location.replace("index.html")
            if (e.status === 404) document.getElementById('holder').innerHTML = data.error;
            const ad = e.data[0];
            document.querySelector('#left-details').innerHTML=`
            <div class="img-holder">
            <img src="${ad.imageurl[0]}" alt="product">
        </div>
        <div id='related' class="footer-related"></div>
        <div class="d-flex margin-1 padding-2">
            <img class="circle agent-img" src="./assets/img/user.svg" height="70" width="70" alt="user">
            <div class="flex-y padding-x-2">
                <b>Contact agent</b>
                <p class="margin-l-3">${ad.owner.firstname}<span class="margin-l-3">${ad.owner.lastname}</span></p>
                <p class="margin-l-3"><b><i class="pro-phone-lite"></i></b> ${ad.owner.phonenumber} <b><i class="pro-envelop-lite margin-l-2 margin-r-1"></i></b> ${ad.owner.email} </p>
            </div>
        </div>
            `;
            document.querySelector('#right-details').innerHTML =`
            <h1 class="margin-1">${ad.type} in ${ad.city}</h1>
                <div class="d-flex">
                    <p><b>Ad id :</b> ${ad.id}</p>
                    <p class="margin-l-3"><b>Location :</b> ${ad.address}</p>
                    <p class="margin-l-3"> <b>State :</b> ${ad.state}</p>
                </div>
                <h2>$${ad.price}</h2>
                <p class="text-center">Lorem ipsum dolor sit amet, no mea aperiri invenire, nisl dolore mollis ad sed, ei sonet singulis persequeris sea.</p>
            `;
            let imgs = '';

            ad.imageurl.forEach((img) => {  
                imgs += `<img class="footer-img shadow" src="${img}" alt="product">`
                });

                document.getElementById('related').innerHTML = imgs;
        });
    