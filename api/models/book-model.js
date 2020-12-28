import { Schema, model } from 'mongoose';

const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
}, {
  // timestamps: true,
  // toJSON: {
  //   transform: (doc, ret, options) => {
  //     ret.id = ret._id;
  //     delete ret._id;
  //     delete ret.__v;
  //     return ret;
  //   }
  // }
});

// exports = module.exports = model('Book', bookModel);
exports = module.exports = model('Book', bookModel);
