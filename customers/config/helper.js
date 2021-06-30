const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connection
mongoose.connect('mongodb://localhost:27017/customerservice', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
.then(() => console.log("customerservice db connected"))
.catch((err) => console.log(err));

module.exports = {
    mongoose
}