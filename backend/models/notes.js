const mongoose = require("mongoose");
const Notes = mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    user1: {
        type: String,
    },
    googleuser: {
        type: String,
    }
});
module.exports = mongoose.model("notes", Notes)



