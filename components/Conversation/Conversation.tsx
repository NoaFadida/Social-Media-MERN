import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { FC, useState, useEffect, useRef } from "react";

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  TextInput,
  Button,
} from "react-native";
import ChatApi from "../../api/ChatApi";
import ConversationModel from "../../model/ConversationModel";
import Messages from "./Messages";
export type MESSAGE = {
  conversationId: string;
  senderId: string;
  text: string;
  _id: string;
};

const Conversation: FC<{ route?: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [conversationId, setConversationId] = useState<string>("");
  const [description, setDescription] = useState("");
  const [messages, setMessages] = useState([]);
  const senderId = route.params.senderId;

  const receiver = {
    id: route.params.user.id,
    name: route.params.user.name,
  };
  const messageInput: any = useRef();

  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener("focus", async () => {
  //       const sender = await AsyncStorage.getItem("id");
  //       console.log("sender", sender);
  //       if (sender) {
  //         setSenderId(sender);
  //       }
  //     });
  //     return unsubscribe;
  //   }, []);

  useEffect(() => {
    const getConversationFunc = async () => {
      try {
        if (senderId && receiver.id) {
          const conversation = await ConversationModel.getConversation(
            senderId,
            receiver.id
          );
          if (conversation) {
            setConversationId(String(conversation));
            const fetchMsg: any = await ChatApi.getConversationrMessages(
              conversation
            );
            setMessages(fetchMsg.data);
          }
        }
      } catch (err) {
        console.log("fail getting user by ID ");
      }
    };
    getConversationFunc();
  }, []);

  //   useEffect(() => {
  //     const fetchConversationMsg = async () => {
  //       try {
  //         const fetchMsg: any = await ChatApi.getConversationrMessages(
  //           conversationId
  //         );
  //         setMessages(fetchMsg.data);
  //       } catch (err) {
  //         console.log("fail adding message ");
  //       }
  //     };
  //     fetchConversationMsg();
  //   }, []);

  const addNewMsg = async () => {
    const message: any = {
      conversationId,
      senderId,
      text: description,
    };
    try {
      await ChatApi.addNewMsg(message);
    } catch (err) {
      console.log("fail adding message ");
    }
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.messages}>
        {messages && <Messages userId={senderId} messages={messages} />}
      </View>
      <View style={styles.textContainer}>
        <TextInput
          ref={messageInput}
          style={styles.Textarea}
          placeholder="Write Something..."
          value={description}
          onChangeText={setDescription}
        ></TextInput>
        <View style={styles.send}>
          <Button title="Send" onPress={addNewMsg} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
  messages: {
    flex: 9,
  },
  textContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  Textarea: {
    flex: 8,
    height: 100,
    borderRadius: 20,
    backgroundColor: "pink",
    padding: 10,
  },
  send: {
    flex: 2,
  },
});

export default Conversation;
