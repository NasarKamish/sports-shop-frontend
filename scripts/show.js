// // // // // // SHOW VIEW // // // // // //

function showView(id) {
  if (window.localStorage.getItem("Person_id")) {
    let view = document.querySelector(".view-item");
    view.classList.toggle("show");
    if (id !== -1) {
      popView(id);
    }
  } else {
    alert("Please register.");
    showRegister("Register");
  }
}

// // // // // // SHOW EDIT // // // // // //

function showEdit(id) {
  if (window.localStorage.getItem("Person_id")) {
    if (id !== -1) {
      popEdit(id);
    }
    let edit = document.querySelector(".edit-item");
    edit.classList.toggle("show");
  } else {
    alert("Please register.");
    showRegister("Register");
  }
}

// // // // // // SHOW REGISTER // // // // // //

function showRegister(type) {
  if (!window.localStorage.getItem("Person_id")) {
    if (type == "Register") {
      popRegister();
    } else if (type == "Login") {
      popLogin();
    }
    let register = document.querySelector(".register");
    register.classList.toggle("show");
  } else if (type === "Close") {
    let register = document.querySelector(".register");
    register.classList.toggle("show");
  } else {
    alert("Please Logout first.");
  }
}

// // // // // // SHOW ADD // // // // // //

function showAdd(type) {
  if (window.localStorage.getItem("Person_id")) {
    if (type === "Add") {
      popAdd();
    }
    let add = document.querySelector(".add-item");
    add.classList.toggle("show");
  } else {
    alert("Please register.");
    // showRegister("Register");
  }
}

// // // // // // SHOW CART // // // // // //

function showCart(type) {
  if (window.localStorage.getItem("Person_id")) {
    if (type == "Clear") {
      let cartContainer = document.querySelector(".cart-container");
      cartContainer.classList.toggle("show");
    } else if (window.localStorage.getItem("cartArray")) {
      let cartContainer = document.querySelector(".cart-container");
      cartContainer.classList.toggle("show");
      popCart(type);
    } else {
      alert("Please add items to your cart.");
    }
  } else {
    alert("Please register.");
  }
}

// // // // // // SHOW CART EDIT // // // // // //

function showCartEdit(id) {
  let cartEditContainer = document.querySelector(".cart-edit");
  cartEditContainer.classList.toggle("show");
  if (id !== -1) {
    popCartEdit(id);
  }
}

// // // // // // SHOW PROFILE // // // // // //

function showProfile(type) {
  if (window.localStorage.getItem("Person_id")) {
    let profile = document.querySelector(".profile");
    profile.classList.toggle("show");
    if (type !== "close") {
      popProfile();
    }
  } else {
    alert("Please register.");
    // showNav(index, 1);
  }
}
