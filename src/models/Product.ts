import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }, 
    quantity: {
      type: Number,
      required: true
    },
    img: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    Featured: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// Define the Product model
const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default ProductModel;
