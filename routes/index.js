var express = require('express');
var router = express.Router();
var Product = require('./../models/product');
var csrf = require('csurf'); 
var Cart = require('./../models/cart');


/* GET home page. */
router.get('/shop/', function(req, res, next) {
  Product.find(function(err, docs) {
    var productChuncks = []; 
    var chunkSize = 3; 
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChuncks.push(docs.slice(i, i + chunkSize));
    }
    res.render('index', { title: 'Educanimour', products : productChuncks, shopping_pressed: false});
  }); 
});


router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id; 
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}}); 
  
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart; 
    console.log(req.session.cart);
    res.redirect('/shop/')
  });

});

router.get('/add/:id', function(req, res, next) {
  var productId = req.params.id; 
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}}); 
  
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/shopping-cart/');
    }
    cart.add(product, product.id);
    req.session.cart = cart; 
    console.log(req.session.cart);
    res.redirect('/shopping-cart/')
  });

});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id; 
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}}); 
  
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/shopping-cart/');
    }
    cart.remove(product, product.id);
    req.session.cart = cart; 
    for (var k in req.session.cart.items){
         if (req.session.cart.items[k].qty <= 0) {
            delete req.session.cart.items[k]; 
         };
    }

    res.redirect('/shopping-cart/')
  });

});



router.get('/shopping-cart/', function(req, res, next) {
    Product.find(function(err, docs) {
    var productChuncks = []; 
    var chunkSize = 3; 
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChuncks.push(docs.slice(i, i + chunkSize));
    }
    if (!req.session.cart) {
      return res.render('index', {title: 'Educanimour', products : productChuncks, productsModal: null, shopping_pressed: true});
    }


    var cart = new Cart(req.session.cart);
    res.render('index', {title: 'Educanimour', products : productChuncks, productsModal: cart.generateArray(), totalPrice: cart.totalPrice, shopping_pressed:true});
    }); 
});

router.get('/shopping-summary/', function(req, res, next) {
    if (!req.session.cart) {
      return res.render('cart-summary', {products : null});
    }
    var cart = new Cart(req.session.cart);
    res.render('cart-summary', {products: cart.generateArray(), totalPrice: cart.totalPrice, productsString : JSON.stringify(cart.generateArray())});
}); 


router.get('/order-finish', function(req, res, next) {
  res.render('order-finish'); 
});

router.get('/', function(req, res, next) {
  res.render('homepage/index');
});

module.exports = router;
