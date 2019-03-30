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
    //// create elements and text nodes
    ////// divs and sections
    const newSProductContainer = document.createElement("section");
    const newSProductInfo = document.createElement("section");
    const newDivMoreInfo = document.createElement("div");
    const newDivSizeAbv = document.createElement("div");
    const newDivLine = document.createElement("div");

    ////// headings
    const newEVar = document.createElement("h2");
    const newVar = document.createTextNode(item.varietal.toUpperCase());
    const newEVintageApp = document.createElement("h3");
    const newVintageApp = document.createTextNode(
      `${item.vintage} ${item.appellation}`
    );

    ////// paragraphs
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

    ////// font awesome icon elements with class
    const newIconOpen = document.createElement("i");
    newIconOpen.classList = "fas fa-chevron-down";
    const newIconClose = document.createElement("i");
    newIconClose.classList = "fas fa-chevron-up";

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

    //// add class to elements
    newSProductContainer.classList =
      "product-container md-col-4 sm-col-6 xs-col-12";
    newSProductInfo.className = "product-info-container";
    newDivMoreInfo.className = "more-info-container";
    newDivSizeAbv.className = "size-abv-container";
    newEVar.className = "varietal";
    newEVintageApp.className = "vintage-app";
    newEPrice.className = "price";
    newEProductId.className = "product-id";
    newDivLine.classList = "vertical-line closed open";

    //// append elements to parents
    ////// children of product-container
    newSProductContainer.append(newSProductInfo);

    ////// children of
    newSProductInfo.append(
      newImgBottle,
      newEVar,
      newEVintageApp,
      newEPrice,
      newIconOpen,
      newDivMoreInfo
    );

    ////// children of more-info-container
    newDivMoreInfo.append(newDivSizeAbv, newEProductId);

    ////// children of size-abv-container
    newDivSizeAbv.append(newESize, newEAbv);

    //// append to wines container section
    parent.append(newSProductContainer, newDivLine);
  });
}

// TODO: open/close icon logic

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
