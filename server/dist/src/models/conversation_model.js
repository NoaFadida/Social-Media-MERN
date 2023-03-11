"use strict";
const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema({
    members: {
        type: [String],
    },
}, { timestamps: true });
module.exports = mongoose.model("Conversation", ConversationSchema);
//# sourceMappingURL=conversation_model.js.map