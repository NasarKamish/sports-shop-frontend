// // // // // // POP CONTENT // // // // // //

let content = document.querySelector(".content");

function popContent() {
  fetch("https://fathomless-wildwood-85481.herokuapp.com/get-products/").then(
    (request) => {
      request.json().then((obj) => {
        data = obj.data;
        // console.log(data);
        content.innerHTML = ``;
        content.innerHTML += `
        <div class="filter">
          <button onclick="filterItems('All')" class="btn All">All</button>
          <button onclick="filterItems('Clothing')" class="btn Clothing">Clothing</button>
          <button onclick="filterItems('Equipment')" class="btn Equipment">Equipment</button>
          <button onclick="filterItems('Accessories')" class="btn Accessories">Accessories</button>
        </div>
      `;
        data.forEach((product) => {
          // console.log(product);
          content.innerHTML += `<div class="item">
        <h2 class="name">${product[1]}</h2>
        <p class="category"><span class="info">Category:</span> ${product[5]}</p>
        <p class="description"><span class="info">Description:</span> ${product[4]}</p>
        <p class="date"><span class="info">Date:</span> ${product[3]}</p>
        <p class="price"><span class="info">Price:</span> R ${product[2]}</p>
        <div class="buttons">
        <button onclick="showView(${product[0]})" class="view btn">View</button>
        <button onclick="showEdit(${product[0]})" class="edit btn">Edit</button>
        <button onclick="deleteProduct(${product[0]})" class="delete btn">Del</button>
        </div>
        </div>`;
        });
        document.querySelectorAll(`.btn`)[0].classList.toggle("show");
      });
    }
  );
}

// // // // // // POP VIEW // // // // // //

function popView(id) {
  fetch(
    `https://fathomless-wildwood-85481.herokuapp.com/get-product/${id}/`
  ).then((request) => {
    request.json().then((obj) => {
      data = obj.data;
      // console.log(data);
      let view = document.querySelector(".view-item");
      view.innerHTML = `<div class="item">
          <div class="item">
            <h2 class="name">${data[1]}</h2>
            <p class="category">Category: ${data[5]}</p>
            <p class="description">Description: ${data[4]}</p>
            <p class="date">Date: ${data[3]}</p>
            <p class="price">R ${data[2]}</p>
            <div class="buy">
              <label for="quantity">Quantity:</label>
              <input 
                type="number"
                class="buy-quantity"
                name="quantity"
                min="1"
                max="100"
                value="1"
              />
              <button onclick="addCart(${data[0]})" class="buy-btn">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="comments">
          </div>
        </div>
        <button onclick="showView(-1)" class="close">X</button>`;
    });
    popComment(id);
  });
}

// // // // // // POP EDIT // // // // // //

function popEdit(id) {
  fetch(
    `https://fathomless-wildwood-85481.herokuapp.com/get-product/${id}/`
  ).then((request) => {
    request.json().then((obj) => {
      data = obj.data;
      let edit = document.querySelector(".edit-item");
      edit.innerHTML = `<h2 class="name">${data[1]}</h2>
        <form>

          <!-- product_name -->
          <div class="product-div">
            <label class="edit-info" for="product_name"> Product Name: </label>
            <input
              class="edit-input"
              type="text"
              name="product_name"
              required
              placeholder="Product Name"
              value = "${data[1]}"
            />
          </div>

          <!-- product_price -->
          <div class="product-div">
            <label class="edit-info" for="product_price"> Product Price: </label>
            <input
              class="edit-input"
              type="text"
              name="product_price"
              required
              placeholder="Product Price"
              value = "${data[2]}"
            />
          </div>

          <!-- description -->
          <div class="product-div">
            <label class="edit-info" for="description"> Discription: </label>
            <input
              class="edit-input"
              type="text"
              name="description"
              required
              placeholder="description"
              value="${data[4]}"
            />
          </div>

          <!-- category -->
          <div class="product-div">
            <label class="edit-info" for="category"> Category: </label>
            <select name="category" class="edit-input">
              <option value="Clothing">Clothing</option>
              <option value="Equipment">Equipment</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <button type="button" onclick="editProduct(${data[0]})" class="edit-btn">EDIT</button>
          <button type="button" onclick="showEdit(-1)" class="close">X</button>`;
    });
  });
}

// // // // // // POP REGISTER // // // // // //

function popRegister() {
  let register = document.querySelector(".register");
  register.innerHTML = `<form
  class="register-form"
>
  <h3 class="register-head">Register</h3>

  <!-- first_name -->
  <div class="register-div">
    <label class="register-info" for="first_name"> Your Name: </label>
    <input
      class="register-input"
      type="text"
      name="first_name"
      required
      placeholder="Your Name"
    />
  </div>

  <!-- last_name -->
  <div class="register-div">
    <label class="register-info" for="last_name"> Your Surname: </label>
    <input
      class="register-input"
      type="text"
      name="last_name"
      required
      placeholder="Your Surname"
    />
  </div>

  <!-- Email -->
  <div class="register-div">
    <label class="register-info" for="Email"> Your Email: </label>
    <input
      class="register-input"
      type="text"
      name="Email"
      required
      placeholder="Your Email"
    />
  </div>

  <!-- username -->
  <div class="register-div">
    <label class="register-info" for="username">Your Username: </label>
    <input
      class="register-input"
      type="text"
      name="username"
      required
      placeholder="Your Username"
    />
  </div>

  <!-- password -->
  <div class="register-div">
    <label class="register-info" for="password">Your Password: </label>
    <input
      class="register-input"
      type="password"
      name="password"
      required
      placeholder="Your Password"
    />
  </div>

  <!-- buttons -->
  <div class="buttons">
    <button onclick="popLogin()" type="button" class="register-change btn">Login</button>
    <button onclick="addRegister()" type="button" class="register-submit btn">Register</button>
  </div>
</form>
<button onclick="showRegister()" class="close">X</button>`;
}

// // // // // // POP LOGIN // // // // // //

function popLogin() {
  let register = document.querySelector(".register");
  register.innerHTML = `<form
  class="login-form"
>
  <h3 class="login-head">Login</h3>

  <!-- username -->
  <div class="login-div">
    <label class="login-info" for="username">Your Username: </label>
    <input
      class="login-input"
      type="text"
      name="username"
      required
      placeholder="Your Username"
    />
  </div>

  <!-- password -->
  <div class="login-div">
    <label class="login-info" for="password">Your Password: </label>
    <input
      class="login-input"
      type="password"
      name="password"
      required
      placeholder="Your Password"
    />
  </div>

  <!-- buttons -->
  <div class="buttons">
    <button onclick="popRegister()" type="button" class="register-change btn">Register</button>
    <button onclick="login()" type="button" class="register-submit btn">Login</button>
  </div>
</form>
<button onclick="showRegister('Close')" class="close">X</button>`;
}

// // // // // // POP ADD ITEM // // // // // //

function popAdd() {
  let addContainer = document.querySelector(".add-item");
  addContainer.innerHTML = `
  <button onclick="showAdd()" class="close" type="button">X</button>
  <form class="product-form">
  <h3 class="register-head">Add Product</h3>

  <!-- product_name -->
  <div class="product-div">
    <label class="item-info" for="product_name"> Product Name: </label>
    <input
      class="item-input"
      type="text"
      name="product_name"
      required
      placeholder="Product Name"
    />
  </div>

  <!-- product_price -->
  <div class="product-div">
    <label class="item-info" for="product_price"> Product Price: </label>
    <input
      class="item-input"
      type="text"
      name="product_price"
      required
      placeholder="Product Price"
    />
  </div>

  <!-- description -->
  <div class="product-div">
    <label class="item-info" for="description"> Discription: </label>
    <input
      class="item-input"
      type="text"
      name="description"
      required
      placeholder="description"
    />
  </div>

  <!-- category -->
  <div class="product-div">
    <label class="item-info" for="category"> Category: </label>
    <select name="category" class="item-input">
      <option value="Clothing">Clothing</option>
      <option value="Equipment">Equipment</option>
      <option value="Accessories">Accessories</option>
    </select>
  </div>

  <button onclick="addItem()" type="button">Submit</button>
</form>`;
}

// // // // // // POP COMMENTS // // // // // //

function popComment(id) {
  let userinfo = {};
  if (id !== -1) {
    fetch("https://fathomless-wildwood-85481.herokuapp.com/get-comments/").then(
      (request) => {
        request.json().then((obj) => {
          data = obj.data;
          let commentsContainer = document.querySelector(".comments");
          commentsContainer.innerHTML = ``;
          commentsContainer.innerHTML += `<form
        class="comment-form"
      >
        <h3 class="comment-head">Comment</h3>
        <hr class="comment-line" />
  
        <!-- comment -->
        <div class="comment-div">
          <label class="comment-info" for="comment"> comment: </label>
          <input
            class="comment-input"
            type="text"
            name="comment"
            required
            placeholder="Your Comment"
          />
        </div>
  
        <!-- stars -->
        <div class="comment-div">
          <label class="comment-info" for="stars"> stars: </label>
          <input
            class="comment-input"
            type="number"
            name="stars"
            required
            min="0" 
            max="5" 
            step="1" 
            value="3"
          />
        </div>
        <button onclick="addComment(${id})" type="button" class="register-submit btn">
          Create Comment
        </button>
        </form>
        <div class="comment-container">
        </div>`;
          data.forEach((personComment) => {
            if (personComment[5] === id) {
              fetch(
                `https://fathomless-wildwood-85481.herokuapp.com/get-user/${personComment[1]}/`
              ).then((request) => {
                request.json().then((obj) => {
                  data = obj.data;
                  userinfo = data;
                  let commentContainer =
                    document.querySelector(".comment-container");
                  commentContainer.innerHTML += `<div class="comment-div">
                  <p class="name">${userinfo[0][4]}</p>
                  <div class="person-comment">
                  <p class="comment">${personComment[2]}</p>
                  <p class="rating-${personComment[0]}">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                  </p>
                  </div>
                  </div>`;

                  let stars = document.querySelector(
                    `.rating-${personComment[0]}`
                  ).children;
                  for (let i = 0; i <= parseInt(personComment[3] - 1); i++) {
                    stars[i].style.color = "yellow";
                  }
                });
              });
            }
          });
        });
      }
    );
  }
}

// // // // // // POP CART // // // // // //

function popCart(type) {
  let totalPrice = 0;
  if (type === "Show") {
    window.localStorage.setItem("TotalPrice", 0);
    let cartContainer = document.querySelector(".items-container");
    cartContainer.innerHTML = `<button onclick="showCart()" class="close">X</button>`;
    let cartItems = JSON.parse(window.localStorage.getItem("cartArray"));
    cartItems.forEach((cartItem) => {
      fetch(
        `https://fathomless-wildwood-85481.herokuapp.com/get-product/${cartItem.id}/`
      ).then((request) => {
        request.json().then((obj) => {
          data = obj.data;
          let currentPrice = String(
            parseInt(data[2]) * parseInt(cartItem.quantity)
          );
          totalPrice = totalPrice + parseInt(currentPrice);
          window.localStorage.setItem("TotalPrice", totalPrice);
          cartContainer.innerHTML += `
              <div class="cart-item">
                <h3 class="cart-item-name">${data[1]}</h3>
                <p class="cart-item-o-price">Original price:R ${data[2]}</p>
                <p class="cart-item-quantity">Quantity: ${cartItem.quantity}</p>
                <p class="cart-item-price">Total price for this item: R ${currentPrice}</p>
                <button onclick="showCartEdit(${data[0]})" class="cart-edit-btn">Edit</button>
              </div>`;
          let totalContainer = document.querySelector(".total-container");
          totalContainer.innerHTML = `<div class="total">Altogether the Total Price: R ${totalPrice}</div>
          <div class="cart-buttons">
          <button onclick="addBuy()" class="cart-buy">Buy Cart</button>
          <button onclick="clearCart()" class="cart-clear">Clear Cart</button>
          </div>
          `;
        });
      });
    });
  }
}

// // // // // // POP CART EDIT // // // // // //

function popCartEdit(id) {
  let cartEditContainer = document.querySelector(".cart-edit");
  cartEditContainer.innerHTML = `
  <button onclick="showCartEdit(-1)" class="close">X</button>
  `;
  let cartArray = [];
  if (window.localStorage.getItem("cartArray")) {
    cartArray = JSON.parse(window.localStorage.getItem("cartArray"));
    cartArray.forEach((cartProduct) => {
      if (cartProduct.id == id) {
        matchedProducts = true;
        fetch(
          `https://fathomless-wildwood-85481.herokuapp.com/get-product/${id}/`
        ).then((request) => {
          request.json().then((obj) => {
            data = obj.data;
            cartEditContainer.innerHTML += `
            <h3>${data[1]}</h3>

            <label for="edit-quantity">Quantity:</label>
            <input 
              type="number"
              class="edit-quantity"
              name="edit-quantity"
              min="1"
              max="100" 
              value="${cartProduct.quantity}"
            />
            <button onclick="editCartEdit(${id})" class="cart-edit-btn-c">Confirm Edit</button>
            `;
          });
        });
      }
    });
  }
}

// // // // // // POP PROFILE // // // // // //

function popProfile() {
  // fetch(`https://fathomless-wildwood-85481.herokuapp.com/get-users/`).then((request) => {
  //   request.json().then((obj) => {
  //     data = obj.data;
  //     console.log(data);
  //   });
  // });

  fetch(
    `https://fathomless-wildwood-85481.herokuapp.com/get-user/${window.localStorage.getItem(
      "Person_id"
    )}/`
  ).then((request) => {
    request.json().then((obj) => {
      data = obj.data;
      userinfo = data[0];
      let profile_info = document.querySelector(".profile-info");
      profile_info.innerHTML = ``;
      profile_info.innerHTML += `
        <h3 class="profile-fullname info"><span class="span-info">Full name:</span> ${userinfo[1]} ${userinfo[2]}</h3>
        <p class="profile-username info"><span class="span-info">Username:</span> ${userinfo[4]}</p>
        <p class="profile-email info"><span class="span-info">Email:</span> ${userinfo[3]}</p>
      `;
    });
  });

  fetch(`https://fathomless-wildwood-85481.herokuapp.com/get-cart/`).then(
    (request) => {
      request.json().then((obj) => {
        data = obj.data;

        let profile_carts = document.querySelector(".profile-carts");
        profile_carts.innerHTML = ``;

        data.forEach((cart) => {
          if (cart[3] == window.localStorage.getItem("Person_id")) {
            profile_carts.innerHTML += `
            <div class="profile-cart cart-${cart[0]}">
              <h3 class="profile-cart-id"><span class="profile-cart-info">Cart id:</span> ${cart[0]}</h3>
              <p class="profile-cart-total"><span class="profile-cart-info">Total Cost:</span> R ${cart[2]}</p>
              <button onclick="popProfileCartItems(${cart[0]})" class="profile-cart-btn btn-${cart[0]}">Show Items</button>
              <div class="profile-cart-item-${cart[0]}"></div>
            </div>
          `;
          }
        });
      });
    }
  );
}

// // // // // // POP PROFILE CART ITEMS // // // // // //

function popProfileCartItems(id) {
  let profile_btn = document.querySelector(`.btn-${id}`);

  if (profile_btn.innerHTML == "Show Items") {
    fetch(`https://fathomless-wildwood-85481.herokuapp.com/get-items/`).then(
      (request) => {
        request.json().then((obj) => {
          data = obj.data;

          let profile_cart = document.querySelector(`.profile-cart-item-${id}`);
          profile_cart.innerHTML = ``;
          data.forEach((item) => {
            if (item[3] == id) {
              fetch(
                `https://fathomless-wildwood-85481.herokuapp.com/get-product/${item[4]}/`
              ).then((request) => {
                request.json().then((obj) => {
                  data = obj.data;
                  profile_cart.innerHTML += `
                    <div class="profile-item">
                      <p class="profile-item-name"><span class="profile-item-info">Name:</span> ${data[1]}</p>
                      <p class="profile-item-quantity"><span class="profile-item-info">Quantity:</span> ${item[1]}</p>
                      <p class="profile-item-cost"><span class="profile-item-info">Total Cost:</span> R ${item[2]}</p>
                    </div>
                  `;
                });
              });
            }
          });
          profile_btn.innerHTML = `Hide Items`;
        });
      }
    );
  } else {
    let profile_cart = document.querySelector(`.profile-cart-item-${id}`);
    profile_cart.innerHTML = ``;
    profile_btn.innerHTML = `Show Items`;
  }
}

popContent();
