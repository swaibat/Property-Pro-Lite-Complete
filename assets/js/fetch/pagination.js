

// let current_page = 1;
// const records_per_page = 3;

// const objJson = document.querySelectorAll('.card');

// function prevPage() {
//   if (current_page > 1) {
//     current_page--;
//     changePage(current_page);
//   }
// }

// function nextPage() {
//   if (current_page < numPages()) {
//     current_page++;
//     changePage(current_page);
//   }
// }

// function changePage(page) {
//   const btn_next = document.getElementById('btn_next');
//   const btn_prev = document.getElementById('btn_prev');
//   const listing_table = document.getElementById('all-ads');
//   const page_span = document.getElementById('page');

//   // Validate page
//   if (page < 1) page = 1;
//   if (page > numPages()) page = numPages();
  
//     listing_table.innerHTML = '';
  
//   for (let i = (page - 1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
//     // console.log(objJson[i].firstElementChild.textContent)
//     listing_table.innerHTML += `<div class="card">${objJson[i].innerHTML}</div>`;

//   }

//   page_span.innerHTML = `${page}/${numPages()}`;

//   if (page == 1) {
//     btn_prev.style.visibility = 'hidden';
//   } else {
//     btn_prev.style.visibility = 'visible';
//   }

//   if (page == numPages()) {
//     btn_next.style.visibility = 'hidden';
//   } else {
//     btn_next.style.visibility = 'visible';
//   }
// }

// function numPages() {
//   return Math.ceil(objJson.length / records_per_page);
// }

// window.onload = function () {
//   changePage(1);
// };
// // })