const mongoose = require('mongoose');
const schema = mongoose.Schema;

var postSchema = new schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [{
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        content: { type: String, require: true }
    }],
    tags: [String],
    state: {
        type: String,
        enum: ['draft', 'published', 'private']
    },
    content : {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);