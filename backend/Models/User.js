import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true // This will automatically convert email to lowercase
  },
  password: {
    type: String,
    required: true,
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['employer', 'job_seeker'],
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  location: { 
    type: String, 
    default: '' 
  },
  profileImage: {
    type: String,
    default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  },
  companyName: String,
  companyDescription: String,
  website: String,
  skills: [String],
  experience: String,
  education: String,
  phone: String
}, {
  timestamps: true
});

// REMOVED pre-save hook to prevent double hashing
// since you're manually hashing in the registration route

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;