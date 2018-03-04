const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
module.exports = mongoose.connect('mongodb://localhost/mymoney');

//adding custom mongoose error messages
mongoose.Error.messages.Number.max = "The value '{VALUE}' is greater than the '{MAX}', please correct it."