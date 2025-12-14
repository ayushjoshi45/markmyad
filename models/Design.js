import mongoose from "mongoose";

const DesignSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shoeId: {
      type: String,
      required: true,
    },

    colors: {
      upper: String,
      sole: String,
      logo: String,
    },

    material: {
      type: String,
      enum: ["canvas", "leather"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Design ||
  mongoose.model("Design", DesignSchema);
