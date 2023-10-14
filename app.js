var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var findCustomersRouter = require('./routes/findCustomers');
var findCustomerRouter = require('./routes/findCustomer');
var editCustomerRouter = require('./routes/editCustomer');
var deleteCustomerRouter = require('./routes/deleteCustomer');
var createProductRouter = require('./routes/createProduct');
var findProductsRouter = require('./routes/findProducts');
var findProductRouter = require('./routes/findProduct');
var editProductRouter = require('./routes/editProduct');
var deleteProductRouter = require('./routes/deleteProduct');
var crearFacturaRouter = require('./routes/crearFactura');
var listarFacturasRouter = require('./routes/listarFacturas');
var descargarFacturaRouter = require('./routes/descargarFactura');
var correoFacturaRouter = require('./routes/correoFactura');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/findCustomers', findCustomersRouter);
app.use('/findCustomer', findCustomerRouter);
app.use('/editCustomer', editCustomerRouter);
app.use('/deleteCustomer', deleteCustomerRouter);
app.use('/createProduct', createProductRouter);
app.use('/findProducts', findProductsRouter);
app.use('/findProduct', findProductRouter);
app.use('/editProduct', editProductRouter);
app.use('/deleteProduct', deleteProductRouter);
app.use('/crearFactura', crearFacturaRouter);
app.use('/listarFacturas', listarFacturasRouter);
app.use('/descargarFactura', descargarFacturaRouter);
app.use('/correoFactura', correoFacturaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
