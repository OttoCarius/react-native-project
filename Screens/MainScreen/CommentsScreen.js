import { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const CommentsScreen = ({ route }) => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.uri);
    }
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <Image source={{ uri: photo }} style={styles.photo} />

          <View>
            <TextInput
              style={styles.input}
              placeholder={"Комментировать..."}
              placeholderTextColor={"#BDBDBD"}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.inputBtn}>
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  photo: {
    height: 240,
    marginBottom: 32,
  },
  input: {
    height: 50,
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingRight: 50,
  },
  inputBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});


export default CommentsScreen;
