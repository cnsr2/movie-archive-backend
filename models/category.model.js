const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    data: {
        type: [Object]
    },
    lang: {
        type: String
    }
});
const CategoryModel = model("Category", CategorySchema);

module.exports = CategoryModel;
