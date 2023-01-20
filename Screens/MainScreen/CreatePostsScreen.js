import React, {useState, useEffect} from 'react'
import {Text, TextInput, View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView,} from 'react-native';
import { MaterialIcons, Feather } from "@expo/vector-icons";


function CreatePostsScreen() {
  
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
    <View>
        <View style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}>
          <View style={styles.camera}>
         <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.7}>
          <MaterialIcons
           name="camera-alt"
            size={24}
          color="#BDBDBD"/>
      </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.text}>Загрузите фото</Text>
    </View>

    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Название..."
              />
              <View style={styles.locationIcon}>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </View>
              <TextInput
                style={{
                  ...styles.input,
                  paddingLeft: 32,
                }}
                placeholder="Местность..."/>
            </View>
            <View style={styles.screenContainer}>
              {!isKeyboardShown && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    ...styles.appButtonContainer,
                    backgroundColor: isDisabled ? "#F6F6F6" : "#FF6C00",
                  }}>
                  <Text
                    style={{
                      ...styles.appButtonText,
                      color: isDisabled ? "#BDBDBD" : "#FFFFFF",
                    }}
                  >
                    Опубликовать
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>

  </View>
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container:{
       flex: 1,
    // alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  imgHolder:{ 
    marginHorizontal:16,
    justifyContent: "center",
  height: 240,
  backgroundColor: "#F6F6F6",
  borderColor: "#E8E8E8",
  marginTop: 32,
},
camera:{
  position: "absolute",
    left: 320 / 2,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
},
  cameraBtn:{
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text:{
    marginHorizontal:16,
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input:{
    fontFamily: "Roboto-Regular",
    marginTop: 16,
    paddingTop: 0,
    paddingBottom: 0,
    height: 56,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginHorizontal:16,
  },
  locationIcon:{
    marginHorizontal:16,
    position: "absolute",
    bottom: 16,
  },
  screenContainer:{
    justifyContent: "center",
  },
  appButtonContainer:{
    marginHorizontal:16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
  },
  appButtonText:{
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },

})

export default CreatePostsScreen
