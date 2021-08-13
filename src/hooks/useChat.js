import useDatabase from "./useDatabase";
import useUser from "./useUser";

const useChat = () => {
  const { data, collectionByRef, firebase } = useDatabase({
    ref: "messages",
  });
  const { user } = useUser();

  const sendMessage = (newData) => {
    collectionByRef.add({
      text: newData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      displayName: user.username,
      photoURL: user.avatar,
    });
  };

  return {
    data,
    sendMessage,
  };
};

export default useChat;
