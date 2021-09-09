// // // // // // EDIT PRODUCT // // // // // //

function editProduct(id) {
  let json_dict = {};
  let inputs = document.querySelectorAll(".edit-input");
  if (inputs[0].value == "" || inputs[1].value == "") {
    alert("Please enter the new details.");
  } else {
    json_dict = {
      product_name: inputs[0].value,
      product_price: inputs[1].value,
      description: inputs[2].value,
      category: inputs[3].value,
    };

    fetch(
      `https://fathomless-wildwood-85481.herokuapp.com/edit-product/${parseInt(
        id
      )}/`,
      {
        method: "PUT",
        body: JSON.stringify(json_dict),
        Headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    window.location.reload();
  }
}

// // // // // // EDIT CART QUANTITY // // // // // //

function editCartEdit(id) {
  let cartArray = [];
  let quantitycontainer = document.querySelector(".edit-quantity");
  if (window.localStorage.getItem("cartArray")) {
    cartArray = JSON.parse(window.localStorage.getItem("cartArray"));
    cartArray.forEach((cartProduct) => {
      if (cartProduct.id == id) {
        cartProduct.quantity = String(quantitycontainer.value);
      }
    });
  }
  window.localStorage.setItem("cartArray", JSON.stringify(cartArray));
  alert("Item has been Successfully Edited.");
  popCart("Show");
  showCartEdit(-1);
}

// // // // // // EDIT CART // // // // // //

function editCart(id, json_dict) {
  fetch(
    `https://fathomless-wildwood-85481.herokuapp.com/edit-cart-progress/${parseInt(
      id
    )}/`,
    {
      method: "PUT",
      body: JSON.stringify(json_dict),
      Headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
