// // // // // // DELETE PRODUCT // // // // // //

function deleteProduct(id) {
  if (window.localStorage.getItem("Person_id")) {
    let delConfirm = confirm("Are you sure you want to delete this product?");
    if (delConfirm) {
      fetch(
        `https://fathomless-wildwood-85481.herokuapp.com/delete-product/${id}/`
      );
      window.location.reload();
    }
  } else {
    alert("Please register.");
    showRegister("Register");
  }
}
// // // // // // LOG OUT // // // // // //

function logout() {
  if (window.localStorage.getItem("Person_id")) {
    let logout_confirm = confirm("Are you sure you want to Log out?");
    if (logout_confirm) {
      window.localStorage.removeItem("Person_id");
      window.localStorage.removeItem("cartArray");
      window.localStorage.removeItem("TotalPrice");
      alert("You have successfully loged out.");
      // reset everything
    }
  } else {
    alert("Please register to log out.");
    showRegister("Register");
  }
}

// // // // // // CLEAR CART // // // // // //

function clearCart() {
  let clearcart_confirm = confirm("Are you sure you want to clear your cart?");
  if (clearcart_confirm) {
    window.localStorage.removeItem("cartArray");
    showCart("Clear");
  }
}
