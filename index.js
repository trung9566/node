var fs = require('fs');

fs.readFile('./users.txt', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
    return;
  }
 
var users = JSON.parse(data);
  fs.readFile('./products.txt', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const products = JSON.parse(data);
    const productsWithUsers = convertToProductsUsers(users, products);
    const usersWithProducts = convertToUsersProducts(users, products);
    writeDataToFile(productsWithUsers, 'ketqua1.txt');
    writeDataToFile(usersWithProducts, 'ketqua2.txt');
  });
});


let users = [];
let products = [];

function readFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

readFile('users.js').then(function(dataUsers) {
  users = JSON.parse(dataUsers);  
  return readFile('products.txt');
}).then(function(dataProducts) {
  products = JSON.parse(dataProducts);

  const productsWithUsers = convertToProductsUsers(users, products);
  const usersWithProducts = convertToUsersProducts(users, products);

  writeDataToFile(productsWithUsers, 'ketqua1.txt');
  
  writeDataToFile(usersWithProducts, 'ketqua2.txt');
}).catch(function(err) {
  console.log(err);
})

// bai1
function convertToProductsUsers(users, products) {
  let stockUsers = {};
  const cloneUsers = [...users];
  const newProducts = products.map(function(product) {
    const cloneProduct = {...product};
    if (!stockUsers[cloneProduct.userId]) {
      cloneProduct.user = cloneUsers.find(function(user, index) {
        if (user.id === cloneProduct.userId) {
          stockUsers[user.id] = user;
          
          cloneUsers.splice(index, 1);  
          return true;
        }
      });
    } else {
      cloneProduct.user = stockUsers[cloneProduct.userId];
    }
    return cloneProduct;
  });
  return newProducts;
}

// bai2
function convertToUsersProducts(users, products) {
  const cloneProducts = [...products];
  let newUsers = [];

  for (const user of users) {
    let tempIndex = [];
    const tempUser = {...user};
    tempUser.products = cloneProducts.filter(function(product, index) {
      if (product.userId === tempUser.id) {
        tempIndex.push(index);
        return true;
      }
      
      return false;
    });
    let count = 0;
    for (let index of tempIndex) {
      cloneProducts.splice(index - count, 1);
      count++;
    }
    newUsers.push(tempUser);
  }
  return newUsers;
}



function writeDataToFile(data, fileName) {
  fs.writeFile(fileName, JSON.stringify(data, null, 2), 'utf8', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log( fileName + ' successfully!');
    }
  })
}
