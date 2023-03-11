// import express from "express";
// const router = express.Router();
// import Request from "../common/Request";
// import Message from "../controllers/message";
// import Conversation from "../controllers/conversation";
// router.post("/", async (req, res) => {
//   try {
//     const conversationId = await Conversation.getConversation(
//       Request.fromRestRequest(req)
//     );
//     const response = await Message.addNewMessage(
//       Request.fromRestRequest(req),
//       conversationId
//     );
//     response.sendRestResponse(res);
//   } catch (err) {
//     res.status(400).send({
//       status: "fail",
//       message: err.message,
//     });
//   }
// });
// //new conversation
// router.post("/", async (req, res) => {
//   try {
//     const { senderId, receiverId } = req?.body;
//     let isExist = await Conversation.findOne({
//       members: [senderId, receiverId],
//     });
//     if (!isExist)
//       isExist = await Conversation.findOne({
//         members: [receiverId, senderId],
//       });
//     if (!isExist) {
//       const newConversation = await new Conversation({
//         members: [senderId, receiverId],
//       });
//       const savedConversation = await newConversation.save();
//       res.status(200).json(savedConversation);
//     } else {
//       res
//         .status(201)
//         .json("you already have open conversation with this friend!");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
// //get user conversations
// // router.get("/:userId", async (req, res) => {
// //   try {
// //     const conversation = await Conversation.find({
// //       members: { $in: [req.params.userId] },
// //     });
// //     res.status(200).json(conversation);
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });
// export = router;
//# sourceMappingURL=conversation_route.js.map