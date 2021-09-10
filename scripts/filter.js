// // // // // // FILTER ITEMS // // // // // //

function filterItems(category) {
  fetch("https://fathomless-wildwood-85481.herokuapp.com/get-products/").then(
    (request) => {
      request.json().then((obj) => {
        data = obj.data;
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
          if (category == "All") {
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
          } else {
            if (category == product[5]) {
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
            }
          }
        });

        if (category == "All") {
          document.querySelectorAll(`.btn`)[0].classList.toggle("show");
        } else if (category == "Clothing") {
          document.querySelectorAll(`.btn`)[1].classList.toggle("show");
        } else if (category == "Equipment") {
          document.querySelectorAll(`.btn`)[2].classList.toggle("show");
        } else if (category == "Accessories") {
          document.querySelectorAll(`.btn`)[3].classList.toggle("show");
        }
      });
    }
  );
}
