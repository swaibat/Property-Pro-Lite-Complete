const addToFav = document.querySelectorAll('.fav-btn');

for (let i = 0; i < addToFav.length; i++) {
  addToFav[i].addEventListener('mouseover', function () {
    const fav = document.querySelector('.fav-img');
    const el = this;
    const item = el.parentNode.parentNode.parentNode.parentNode;
    const favTopOffset = fav.offsetTop - item.offsetTop;
    const favLeftOffset = fav.offsetLeft - item.offsetLeft;
    const style = document.createElement('style');
    const keyFrames = `
        @keyframes anim {
          0% {
            border-radius: 0%;
          }
          100% {
            border-radius: 100%;
            top: ${favTopOffset}px;
            left: ${favLeftOffset}px;
            width: 35px;
            height: 35px;
          }
        }
        `;
    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);
  });
  
  addToFav[i].addEventListener('click', function () {
    const favImg = document.querySelector('.fav-img');
    const love = document.querySelector('#love');
    const el = this;
    const item = el.parentNode.parentNode.parentNode.parentNode;
    const img = item.firstElementChild.lastElementChild.firstElementChild.src;
    const flyingImg = document.createElement('IMG');
    const createSrc = document.createAttribute('src');
    createSrc.value = img;
    flyingImg.setAttributeNode(createSrc);
    flyingImg.classList.add('b-flying-img','d-none');
    const div = flyingImg;
    div.style.animation = 'anim 1s 1';
    el.parentNode.append(flyingImg);
    document.cookie = `fav=${img}`;
    setTimeout(() => {
        favImg.src = img
        love.classList.add('invisible')
        favImg.classList.remove('invisible')
        el.parentNode.removeChild(flyingImg);
    }, 1000);
  });
}