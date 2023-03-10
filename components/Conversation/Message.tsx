import { FC } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MESSAGE } from "./Conversation";

const Message: FC<{ message: MESSAGE; userId: string }> = ({
  message,
  userId,
}) => {
  const { senderId, text } = message;
  const isUser = userId === senderId;

  return (
    <View style={[styles.container, isUser ? styles.rtl : styles.ltr]}>
      <View
        style={[
          styles.subContainer,
          isUser ? styles.senderBackground : styles.recieverBackground,
        ]}
      >
        <Text style={[isUser ? styles.textAlignRight : styles.textAlignLeft]}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  subContainer: {
    padding: 20,
    borderRadius: 50,
    width: 300,
  },
  senderBackground: {
    backgroundColor: "#d3f8e2",
  },
  recieverBackground: {
    backgroundColor: "white",
  },
  rtl: {
    direction: "rtl",
  },
  ltr: {
    direction: "ltr",
  },
  textAlignRight: {
    textAlign: "left",
  },
  textAlignLeft: {
    textAlign: "left",
  },
});

export default Message;
