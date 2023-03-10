import { FC } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MESSAGE } from "./Conversation";
import Message from "./Message";

const Messages: FC<{ messages: MESSAGE[]; userId: string }> = ({
  messages,
  userId,
}) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message?._id}
        renderItem={({ item }) => <Message userId={userId} message={item} />}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Messages;
