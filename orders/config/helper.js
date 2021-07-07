const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connection
mongoose.connect('mongodb://mongo:27017/orderservice', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(() => console.log("orderservice db connected"))
.catch((err) => console.log(err));

module.exports = {
    mongoose
}