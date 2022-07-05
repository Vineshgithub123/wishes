const mongoose = require('mongoose')

const wish = new mongoose.Schema({
    Name : String,
    FName:String,
    Email: String
})
const wishdata = mongoose.model('wishdata',wish)

module.exports= {
    wishdata
}