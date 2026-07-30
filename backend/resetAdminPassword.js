const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const Admin = require('./models/adminModel');
    const newPassword = '735508561moh';
    const hashed = await bcrypt.hash(newPassword, 10);
    const result = await Admin.updateOne(
        { email: 'mohammedalgalalalgalal@gmail.com' },
        { $set: { password: hashed } }
    );
    console.log('Password updated:', result.modifiedCount, 'document(s) modified');
    mongoose.disconnect();
}).catch(err => { console.error(err); process.exit(1); });
