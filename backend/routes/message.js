const express = require("express");
const {
    getMyMessages,
    getMyConversations,
    sendMessage
} = require("../controllers/messageController");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/my/conversations").get(isAuthenticated, getMyConversations);
router.route("/conversations/:id").get(isAuthenticated, getMyMessages);
router.route("/message/send").post(isAuthenticated,sendMessage);

module.exports = router;
