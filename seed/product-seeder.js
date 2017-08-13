var Product = require('./../models/product');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping-cart'); 


var products = [new Product({
    imagePath: "./../images/dog.png",
    title : "dog",
    description: "Awesome Dog!!!", 
    price : 10
}),
new Product({
    imagePath: "./../images/dog.png",
    title : "dog",
    description: "Awesome Dog!!!", 
    price : 10
}),
new Product({
    imagePath: "./../images/dog.png",
    title : "dog",
    description: "Awesome Dog!!!", 
    price : 10
}),
new Product({
    imagePath: "./../images/dog.png",
    title : "dog",
    description: "Awesome Dog!!!", 
    price : 10
}),
new Product({
    imagePath: "./../images/dog.png",
    title : "dog",
    description: "Awesome Dog!!!", 
    price : 10
})
]; 

var done = 0; 
for (var i = 0; i < products.length; ++i) {
    console.log("dasd");
    // saves models to database (inside products collection)
    products[i].save(function(err, res) {
        done++; 
        if (done === products.length) {
            exit(); 
        }
    }); 
}

function exit() {
    mongoose.disconnect();
}


