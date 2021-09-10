// // // // // // ADD USER // // // // // //

function addRegister() {
  let register_inputs = document.querySelectorAll(".register-input");
  register_valid = true;
  register_inputs.forEach((register_input) => {
    if (!register_input.value) {
      register_valid = false;
    }
  });

  if (register_valid) {
    json_dict = {
      first_name: register_inputs[0].value,
      last_name: register_inputs[1].value,
      Email: register_inputs[2].value,
      username: register_inputs[3].value,
      password: register_inputs[4].value,
    };
    let registerVal = true;

    fetch(
      `https://fathomless-wildwood-85481.herokuapp.com/user-registration/`,
      {
        method: "POST",
        body: JSON.stringify(json_dict),
        Headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    ).catch((registerVal = false));

    if (registerVal) {
      // popLogin();
      alert("Please re-enter your details to continue.");
    } else {
      alert("Register did not work");
    }

    // alert("You have successfully registered.");

    // fetch(`https://fathomless-wildwood-85481.herokuapp.com/get-users/`).then((request) => {
    //   request.json().then((obj) => {
    //     console.log(obj.data);
    //     obj.data.forEach((person) => {
    //       if (
    //         person[4] === json_dict["username"] &&
    //         person[5] === json_dict["password"]
    //       ) {
    //         window.localStorage.setItem("Person_id", person[0]);
    //         alert("You have successfully registered");
    //         showRegister("Close");
    //       }
    //     });
    //   });
    // });
  } else {
    alert("Please enter in all your details please.");
  }
}

// // // // // // ADD ITEM // // // // // //

function addItem() {
  let item_inputs = document.querySelectorAll(".item-input");
  let add_valid = true;
  item_inputs.forEach((item_input) => {
    if (!item_input.value) {
      add_valid = false;
    }
  });
  if (add_valid) {
    if (parseInt(item_inputs[1].value)) {
      json_dict = {
        product_name: item_inputs[0].value,
        product_price: item_inputs[1].value,
        discription: item_inputs[2].value,
        category: item_inputs[3].value,
      };

      fetch(`https://fathomless-wildwood-85481.herokuapp.com/create-product/`, {
        method: "POST",
        body: JSON.stringify(json_dict),
        Headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      window.location.reload();
    } else {
      alert("Please enter a number in the price.");
    }
  } else {
    alert("Please fill in all inputs.");
  }
}

// // // // // // LOGIN // // // // // //

function login() {
  let login_inputs = document.querySelectorAll(".login-input");
  let add_valid = true;
  login_inputs.forEach((login_input) => {
    if (!login_input.value) {
      add_valid = false;
    }
  });
  if (add_valid) {
    json_dict = {
      username: login_inputs[0].value,
      password: login_inputs[1].value,
    };

    fetch(`https://fathomless-wildwood-85481.herokuapp.com/get-users/`).then(
      (request) => {
        request.json().then((obj) => {
          user_valid = false;
          obj.data.forEach((person) => {
            if (
              person[4] === json_dict["username"] &&
              person[5] === json_dict["password"]
            ) {
              user_valid = true;
              window.localStorage.setItem("Person_id", person[0]);
              alert("You have logged in successfully");
              showRegister("Close");
            }
          });
          if (!user_valid) {
            alert("Please enter correct details.");
          }
        });
      }
    );
  } else {
    alert("Please enter all details.");
  }
}

// // // // // // ADD COMMENT // // // // // //

function addComment(id) {
  let comment_inputs = document.querySelectorAll(".comment-input");
  let comment_valid = true;
  comment_inputs.forEach((comment_input) => {
    if (!comment_input.value) {
      comment_valid = false;
    }
  });
  if (comment_valid) {
    json_dict = {
      user_id: window.localStorage.getItem("Person_id"),
      comment: comment_inputs[0].value,
      stars: comment_inputs[1].value,
      product_id: String(id),
    };

    fetch(`https://fathomless-wildwood-85481.herokuapp.com/create-comment/`, {
      method: "POST",
      body: JSON.stringify(json_dict),
      Headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setTimeout(console.log(""), 5000);
    alert("Comment made successfully.");
    popComment(id);
  } else {
    alert("Please enter ur comment to create comment.");
  }
}

// // // // // // ADD TO CART // // // // // //

function addCart(id) {
  let cartArray = [];
  let quantity = document.querySelector(".buy-quantity");
  let matchedProducts = false;
  if (window.localStorage.getItem("cartArray")) {
    cartArray = JSON.parse(window.localStorage.getItem("cartArray"));
    cartArray.forEach((cartProduct) => {
      if (cartProduct.id == id) {
        matchedProducts = true;
        cartProduct.quantity = String(
          parseInt(cartProduct.quantity) + parseInt(quantity.value)
        );
      }
    });
  } else {
    window.localStorage["cartArray"] = new Array();
  }
  cartDict = {
    id: id,
    quantity: quantity.value,
  };
  if (!matchedProducts) {
    cartArray.push(cartDict);
  }
  window.localStorage.setItem("cartArray", JSON.stringify(cartArray));
  alert("Item has been Successfully added to your cart.");
}

// // // // // // ADD BUY // // // // // //

function addBuy() {
  cart_dict = {
    total_price: window.localStorage.getItem("TotalPrice"),
    progress: "in_progress",
    user_id: window.localStorage.getItem("Person_id"),
  };

  fetch(`https://fathomless-wildwood-85481.herokuapp.com/create-cart/`, {
    method: "POST",
    body: JSON.stringify(cart_dict),
    Headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  let cart_id = "";
  setTimeout(console.log(""), 5000);

  fetch(`https://fathomless-wildwood-85481.herokuapp.com/get-cart/`).then(
    (request) => {
      request.json().then((obj) => {
        data = obj.data;
        data.forEach((product) => {
          if (product[3] == window.localStorage.getItem("Person_id")) {
            if (product[4] == "in_progress") {
              cart_id = product[0];
              let cartItems = [];
              cartItems = JSON.parse(window.localStorage.getItem("cartArray"));
              cartItems.forEach((cartItem) => {
                fetch(
                  `https://fathomless-wildwood-85481.herokuapp.com/get-product/${cartItem.id}/`
                ).then((request) => {
                  request.json().then((obj) => {
                    data = obj.data;
                    let currentPrice = String(
                      parseInt(data[2]) * parseInt(cartItem.quantity)
                    );

                    item_dict = {
                      quantity: cartItem.quantity,
                      price: currentPrice,
                      cart_id: String(cart_id),
                      product_id: String(cartItem.id),
                    };

                    fetch(
                      `https://fathomless-wildwood-85481.herokuapp.com/create-item/`,
                      {
                        method: "POST",
                        body: JSON.stringify(item_dict),
                        Headers: {
                          "Content-type": "application/json; charset=UTF-8",
                        },
                      }
                    );
                  });
                });
              });
              cart_dict = {
                progress: "Complete",
              };
              editCart(String(product[0]), cart_dict);

              window.localStorage.removeItem("cartArray");
              window.localStorage.removeItem("TotalPrice");
              showCart("Clear");
              alert("Thank you for buying from us, please come again.");
            }
          }
        });
      });
    }
  );
}

// // // // // // // SEEING IF CART AND ITEMS AND USERS WORK // // // // // //

// fetch(`https://fathomless-wildwood-85481.herokuapp.com/get-cart/`).then((request) => {
//   request.json().then((obj) => {
//     data = obj.data;
//     console.log(data);
//   });
// });

// fetch(`https://fathomless-wildwood-85481.herokuapp.com/get-items/`).then((request) => {
//   request.json().then((obj) => {
//     data = obj.data;
//     console.log(data);
//   });
// });

// fetch(`https://fathomless-wildwood-85481.herokuapp.com/get-users/`).then(
//   (request) => {
//     request.json().then((obj) => {
//       data = obj.data;
//       console.log(data);
//     });
//   }
// );
