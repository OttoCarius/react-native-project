import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import {
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";


const initialState = {
  photoUri: "",
  photoTitle: "",
  photoLocation: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);

  const locationRef = useRef();

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocationCoords(coords);
    })();
  }, []);

  const getLocation = async () => {
    const photoPlace = await Location.reverseGeocodeAsync(locationCoords);
    const placeLocation = {
      ...locationCoords,
      place: `${photoPlace[0].region}, ${photoPlace[0].country}`,
    };
    handlerChangeText(placeLocation, "photoLocation");
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    getLocation();
    setState((prevState) => ({ ...prevState, photoUri: photo.uri }));
    if (state.photoLocation && state.photoTitle) {
      setIsDisabled(false);
    }
  };

  const handlerChangeText = (value, inputName) => {
    setState((prevState) => ({ ...prevState, [inputName]: value }));
    if (inputName === "photoTitle") {
      if (state.photoLocation && state.photoUri && value) {
        setIsDisabled(false);
      }
    } else {
      if (state.photoTitle && state.photoUri) {
        setIsDisabled(false);
      }
    }
    if (!value) {
      setIsDisabled(true);
    }
  };

  const onFormSubmit = async () => {
    setState(initialState);
    setIsDisabled(true);
    Keyboard.dismiss();
    const post = {
      title: state.photoTitle,
      photo: state.photoUri,
      location: state.photoLocation,
    };
    navigation.navigate("PostsScreen", { post });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView>
          {state.photoUri ? (
            <View>
              <View
                style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}
              >
                <Image
                  source={{ uri: state.photoUri }}
                  style={{
                    width: windowWidth - 16 * 2,
                    height: 240,
                  }}
                />
                <TouchableOpacity
                  style={styles.photoBtn}
                  activeOpacity={0.7}
                  onPress={() => {
                    setState((prevState) => ({
                      ...prevState,
                      photoUri: null,
                    }));
                    setIsDisabled(true);
                  }}
                >
                  <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Редактировать фото</Text>
            </View>
          ) : (
            <View>
              <View
                style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}
              >
                <Camera style={styles.camera} ref={setCamera}>
                  <TouchableOpacity
                    style={styles.cameraBtn}
                    activeOpacity={0.7}
                    onPress={takePhoto}
                  >
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color="#BDBDBD"
                    />
                  </TouchableOpacity>
                </Camera>
              </View>
              <Text style={styles.text}>Загрузите фото</Text>
            </View>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Название..."
                value={state.photoTitle}
                onSubmitEditing={() => {
                  locationRef.current.focus();
                }}
                onChangeText={(value) => {
                  handlerChangeText(value, "photoTitle");
                }}
              />

              <View style={styles.locationIcon}>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </View>
              <TextInput
                ref={locationRef}
                style={{
                  ...styles.input,
                  paddingLeft: 32,
                }}
                placeholder="Местность..."
                value={state.photoLocation?.place}
                onChangeText={(value) => {
                  handlerChangeText(value, "photoLocation");
                }}
              />
            </View>
            <View style={styles.screenContainer}>
              {!isKeyboardShown && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    ...styles.appButtonContainer,
                    backgroundColor: isDisabled ? "#F6F6F6" : "#FF6C00",
                  }}
                  onPress={() => {
                    onFormSubmit();
                  }}
                  disabled={isDisabled}
                >
                  <Text
                    style={{
                      ...styles.ConfirmBtn,
                      color: isDisabled ? "#BDBDBD" : "#FFFFFF",
                    }}
                  >
                    Опубликовать
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
          <View style={styles.deliteWrap}>
            <TouchableOpacity style={styles.deliteBtn} activeOpacity={0.8}>
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  imgHolder: {
    justifyContent: "center",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    marginTop: 32,
  },
  photoBtn: {
    position: "absolute",
    bottom: 240 / 2 - 30,
    left: 320 / 2,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 240 / 2 - 30,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  text: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
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
  },
  locationIcon: {
    position: "absolute",
    bottom: 16,
  },
  screenContainer: {
    justifyContent: "center",
  },
  appButtonContainer: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
  },
  ConfirmBtn: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  deliteWrap: {
    alignItems: "center",
    marginTop: 55,
  },
  deliteBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

export default CreatePostsScreen
