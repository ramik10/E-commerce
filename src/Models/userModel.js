import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
})



const User = mongoose.models.shopers || mongoose.model('shopers', userSchema);

export default User;