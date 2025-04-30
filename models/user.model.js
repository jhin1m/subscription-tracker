import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   name: { 
      type: String, 
      required: [true, 'User name is required'],
      trim: true,
      minlength: [3, 'User name must be at least 3 characters long'],
      maxlength: [30, 'User name must be less than 30 characters long'],
   },
   email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      match: [
         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
         'Please use a valid email address'
      ],
      trim: true,
      lowercase: true,
      minlength: [5, 'User email must be at least 5 characters long'],
      maxlength: [50, 'User email must be less than 50 characters long'],
   },
   password: {
      type: String,
      required: [true, 'User password is required'],
      minlength: [6, 'User password must be at least 6 characters long'],
   }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
   
   