// Run getWine function (AJAX call to php doc) when document loads //
document.body.onload = getWine;

// AJAX call to php file. Successful request returns array of wines "wine". //
function getWine() {
  const request = new XMLHttpRequest();
  request.open("GET", "https://www.vwewebtest.com/wines/array.php", true);

  request.onload = function() {
    if (this.status == 200) {
      const wine = JSON.parse(this.responseText).product_listing;
      sortWine(wine);
      addWine(wine);
    } else console.log("onload error");
  };

  request.onerror = function() {
    console.log("request error");
  };

  request.send();
}

// Sort items by varietal then by price //
function sortWine(wine) {
  wine.sort(compare);
}

function compare(a, b) {
  const wineA = a.varietal.toLowerCase();
  const wineB = b.varietal.toLowerCase();
  const priceA = a.base_price;
  const priceB = b.base_price;

  let comparison = 0;
  // sort by varietal
  if (wineA > wineB) {
    comparison = 1;
  }
  if (wineA < wineB) {
    comparison = -1;
  } else if (wineA === wineB) {
    // if varietal is the same, sort by price
    if (priceA > priceB) {
      comparison = 1;
    } else if (priceA < priceB) {
      comparison = -1;
    }
  }

  return comparison;
}

// Display wines on home page (index.html) //
function addWine(wine) {
  const parent = document.querySelector(".wines-container");
  wine.forEach(item => {
    //// create elements
    ////// product section and h2
    const newSection = document.createElement("section");
    const newEVar = document.createElement("h2");
    const newVar = document.createTextNode(item.varietal);

    ////// paragraphs
    const newEVintageApp = document.createElement("p");
    const newVintageApp = document.createTextNode(
      `${item.vintage} ${item.appellation}`
    );
    const newEPrice = document.createElement("p");
    const newPrice = document.createTextNode(`$${item.base_price}`);
    const newEProductId = document.createElement("p");
    const newProductId = document.createTextNode(
      `Product Id: ${item.product_id}`
    );
    const newESize = document.createElement("p");
    const newSize = document.createTextNode(item.bottle_size);
    const newEAbv = document.createElement("p");
    const newAbv = document.createTextNode(`${item.abv}% ABV`);

    ////// bottle image elements
    const newImgBottle = document.createElement("img");

    //// add text to new elements
    newEVar.appendChild(newVar);
    newEVintageApp.appendChild(newVintageApp);
    newEPrice.appendChild(newPrice);
    newEProductId.appendChild(newProductId);
    newESize.appendChild(newSize);
    newEAbv.appendChild(newAbv);

    //// bottle image src and alt
    newImgBottle.src = item.bottle_shot;
    newImgBottle.alt = `bottle of ${item.vintage} ${item.varietal}`;

    //// append new elements to the new section
    newSection.append(
      newImgBottle,
      newEVar,
      newEVintageApp,
      newEPrice,
      newESize,
      newEAbv,
      newEProductId
    );

    //// add class to elements
    newSection.className = "product-container";

    //// append to parent section
    parent.append(newSection);
  });
}

// TODO: ADD OPEN/CLOSE CHEVRON TO PRODUCT CONTAINER
/* 
<i class="fas fa-chevron-up"></i> 
<i class="fas fa-chevron-down"></i>
*/

// TODO: UPDATE ELEMENTS AND CLASS NAMES, ADD DIV FOR VERTICAL LINE.
//For each:
// div - columns

// --product-container
// ---h2 varietal
// ---h3 vintage and appel
// ---p - price

// ---div - more info
// ----div - size and abv
// -----p - size
// -----p - abv
// ----p - prduct id

// --div - line
