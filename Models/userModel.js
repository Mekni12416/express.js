const mongoose = require("mongoose");
const bcrypt = require("bcrypt");



const userSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: String,
    pasword: String,
    role: { type: String, enum: ["admin", "client", "formateur"] },
    image_user: { type: String, required: false, default: "client.png" },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
  },
  { timestamps: true  }
);

userSchema.post("save", async function (req, res, next) {
  console.log("new user was created & saved succecfully");
  next();
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const user = this;
    user.pasword = await bcrypt.hash(user.pasword, salt);
    user.CreateAt = new Date();
    user.UpdateAt = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.statics.login = async function (email, pasword) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(pasword, user.pasword);
    if (auth) {
      return user;
    }
    throw new Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
 