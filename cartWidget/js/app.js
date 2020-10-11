var ShoppingCart = (function($) {
  "use strict";
  
  // Cache necesarry DOM Elements
  var productsEl = document.querySelector(".products"),
      cartEl =     document.querySelector(".shopping-cart-list"),
	  cartDet =     document.querySelector(".header-items"),
      productQuantityEl = document.querySelector(".product-quantity"),
      emptyCartEl = document.querySelector(".empty-cart-btn"),
      cartCheckoutEl = document.querySelector(".checkout"),
      totalPriceEl = document.querySelector(".price");

   var products = [
    {
      id: 0,
      name: "Samsung Series 4",
      imageUrl: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: 13999,
	  display:22500,
	  discount:37
    },
    {
      id: 1,
      name: "Samsung Super 6",
      imageUrl: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: 35999,
	  display:66900,
	  discount:46
    },
    {
      id: 2,
      name: "Samsung The Frame",
      imageUrl: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: 84999,
	  display:133900,
	  discount:36
    },
    {
      id: 3,
      name: "Thomson B9 Pro",
      imageUrl: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: 9999,
	  display:16999,
	  discount:41
    },
    {
      id: 4,
      name: "LG Ultra HD",
      imageUrl: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: 39990,
	  display:79990,
	  discount:50
    },
    {
      id: 5,
      name: "Vu Ready LED TV",
      imageUrl: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: 7999,
	  display:17793,
	  discount:52
    },
	{
      id: 6,
      name: "Koryo Android TV",
      imageUrl: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: 55999,
	  display:199990,
	  discount:71
    },
	{
      id: 7,
      name: "Micromax LED Smart",
      imageUrl: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
      price: 9999,
	  display:27990,
	  discount:64
    }
  ],
      productsInCart = [];
  
  // Pretty much self explanatory function.
  var generateProductList = function() {
    products.forEach(function(item) {
     var productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `<div class="product-image">
	                           <div class="see-more">${item.discount} % off </div>
                                <img src="${item.imageUrl}" alt="${item.name}">
                             </div>
                             <div class="product-name"><span></span> ${item.name}</div>
                             <div class="product-add-to-cart">
							 <span style="text-decoration: line-through;">$${item.display}&nbsp;</span> $${item.price}
                               <a href="#0" class="button add-to-cart" data-id=${item.id}>Add to Cart</a>
                             </div>
                          </div>
`;
                             
productsEl.appendChild(productEl);
    });
  }
  
  var generateCartList = function() {
    
    cartEl.innerHTML = "";
	cartDet.innerHTML = "";
	var div =  document.createElement("div");
    cartEl.innerHTML = `<table><tr> <td> Items(`+productsInCart.length+`) </td> <td> &nbsp;&nbsp;&nbsp;&nbsp;Qty</td> <td>&nbsp;&nbsp;&nbsp;&nbsp;Price</td></tr></table>`;
    productsInCart.forEach(function(item) {
	   div.innerHTML=`<div class="see-more">${item.product.name} is added to cart</div>`;									
      var li = document.createElement("table");
      li.innerHTML = `<table> 
	   <td></td><td> ${item.product.name} </td> <td>${item.quantity} </td><td> $${item.product.display * item.quantity}</td><td><a href="#0" class="delete-to-cart" data-id=${item.product.id}>X</a></td></tr></table>`;
      cartEl.appendChild(li);
    });
    cartDet.appendChild(div);
    productQuantityEl.innerHTML = productsInCart.length;
    
    generateCartButtons()
  }
  
  
  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  var generateCartButtons = function() {
	  totalPriceEl.innerHTML="";
	  var divTotal =  document.createElement("div");
	  var orderTotal = (calculateTotalPrice() - discountedTotalPrice());
    if(productsInCart.length > 0) {
      emptyCartEl.style.display = "block";
      cartCheckoutEl.style.display = "block"
	  divTotal.innerHTML =`Total :<br>Items(`+productsInCart.length+`) :$`+calculateTotalPrice()+`<br>Discount : $`+discountedTotalPrice()+`<br>Type Discount: $0<br> Order Total  : $`+orderTotal;
	 // divTotal2.innerHTML = ``;

	  totalPriceEl.appendChild(divTotal);
    } else {
      emptyCartEl.style.display = "none";
      cartCheckoutEl.style.display = "none";
    }
  }
  
  // Setting up listeners for click event on all products and Empty Cart button as well
  var setupListeners = function() {
    productsEl.addEventListener("click", function(event) {
      var el = event.target;
      if(el.classList.contains("add-to-cart")) {
       var elId = el.dataset.id;
       addToCart(elId);
      }
    });
	   cartEl.addEventListener("click", function(event) {
         var el = event.target;
	    if(el.classList.contains("delete-to-cart")) {
       var elId = el.dataset.id;
       removeCart(elId);
      }
    });

    emptyCartEl.addEventListener("click", function(event) {
      if(confirm("Are you sure?")) {
        productsInCart = [];
      }
      generateCartList();
    });
  }
  
  // Adds new items or updates existing one in productsInCart array
  var addToCart = function(id) {
    var obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({product: obj, quantity: 1});
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  }
  
    var removeCart = function(id) {
		
    var obj = products[id];
    if(productsInCart.length === 0 || productFound(obj.id) === undefined) {
    } else {
      productsInCart.forEach(function(item) {
        if(item.product.id === obj.id) {
			productsInCart.pop({product: obj, quantity: item.quantity});
        }
      });
    }
    generateCartList();
  }
  
  // This function checks if project is already in productsInCart array
  var productFound = function(productId) {
    return productsInCart.find(function(item) {
      return item.product.id === productId;
    });
  }

  var discountedTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + ((item.product.display-item.product.price) *  item.quantity);
    }, 0);
  }
  
  var calculateTotalPrice = function() {
    return productsInCart.reduce(function(total, item) {
      return total + (item.product.display *  item.quantity);
    }, 0);
  }
  
  // This functon starts the whole application
  var init = function() {
    generateProductList();
    setupListeners();
  }
  
  // Exposes just init function to public, everything else is private
  return {
    init: init
  };
  
})($);

ShoppingCart.init();