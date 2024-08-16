const appWrapper = document.querySelector(".app-wrapper");

let productsData = [];
let productPerPage = 4;
let numberOfPages;
let currentPage = 1;
// Initialise app and make api call

(async function () {
  let data = await fetch("https://dummyjson.com/products");
  data = await data.json();

  productsData = data.products;

  if (productsData.length % productPerPage == 0) {
    numberOfPages = productsData.length / productPerPage;
  } else {
    numberOfPages = Math.floor(productsData.length / productPerPage) + 1;
  }

  // call the function to build the first page
  buildPage(currentPage - 1);

  // Function to build the pagination section
  buildPagination(numberOfPages);
})();

function buildPage(pageNumber) {
  appWrapper.innerHTML = "";
  if (currentPage >= 0 && currentPage <= numberOfPages) {
    for (
      let i = pageNumber * productPerPage;
      i < pageNumber * productPerPage + productPerPage &&
      i < productsData.length;
      i++
    ) {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <div class="product-image">
              <img src="${productsData[i].thumbnail}" alt="">
              </div>
              <h1 class="title">${productsData[i].title}</h1>
              <p class="brand">${productsData[i].brand}</p>
              <P class="price">$ ${productsData[i].price}</P>
        `;
      appWrapper.append(productCard);
    }
  }
}

function buildPagination(numberOfPages) {
  const paginationWrapper = document.querySelector(".pagination-wrapper");

  paginationWrapper.innerHTML = `<button class="prev-page-btn">
    Prev
  </button>

  <div class="pages-wrapper">
    
  </div>

  <button class="next-page-btn">
    Next
  </button>`;

  const pagesWrapper = document.querySelector(".pages-wrapper");
  // Next and prev btn functinality

  const nextBtn = document.querySelector(".next-page-btn");
  const prevBtn = document.querySelector(".prev-page-btn");

  for (let i = 1; i <= numberOfPages; i++) {
    const page = document.createElement("div");
    page.classList.add("page");
    page.innerText = i;
    pagesWrapper.append(page);
    page.addEventListener("click", (e) => {
      currentPage = i;
      buildPage(i - 1);
    
    
      
      if (i == numberOfPages) {
        nextBtn.style.display = "none";
      } else {
        nextBtn.style.display = "block";
      }
      
      if(i == 1){
        prevBtn.style.display = "none";
      }else{
        prevBtn.style.display = "block";
      }

    });
  }

  nextBtn.addEventListener('click',(e)=>{
    prevBtn.style.display = "block";
    currentPage++ ;
    if(currentPage == numberOfPages){
        buildPage(currentPage - 1);  
        nextBtn.style.display = "none";  
    }else if(currentPage < numberOfPages){
        buildPage(currentPage - 1);  
    }else{
        nextBtn.style.display = "none";  
    }
  })
 
  prevBtn.addEventListener('click',(e)=>{
    nextBtn.style.display = "block";
    currentPage-- ;
    if(currentPage == 1){
        buildPage(currentPage - 1);  
        prevBtn.style.display = "none";  
    }else if(currentPage > 0){
        buildPage(currentPage - 1);  
    }else{
        prevBtn.style.display = "none";  
    }
  })

}
