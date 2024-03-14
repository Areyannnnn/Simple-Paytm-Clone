const mongoose = require("mongoose");

mongoose.connect("")

// Define schemas
const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

// Define models
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

// Export models
module.exports = { User, Account };
