import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         unique: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      contactList: [{
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'User'
      }],
   },
   { timestamps: true },
)

const User = mongoose.model('User', userSchema);
export default User;