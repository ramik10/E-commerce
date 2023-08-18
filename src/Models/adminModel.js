import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const Admin = mongoose.models.adminstrators || mongoose.model('adminstrators', adminSchema);

export default Admin;