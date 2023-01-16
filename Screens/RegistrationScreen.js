import React, {useState} from 'react';
import { StyleSheet, TextInput, ImageBackground, Text, View, TouchableOpacity, Image, Keyboard,KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions} from 'react-native';
// import AddPhoto from "./../image/add.svg";

const initialState = {
  login: "",
  email: "",
  password: "",
}

function RegistrationScreen() {
const [isShowKeyboard, setIsShowKeyboard] = useState(false);
const [state, setState] = useState(initialState);

const windowDimensions = Dimensions.get("window").width - 8 * 2;

const keyboardHide = () => {
  Keyboard.dismiss();
  setIsShowKeyboard(false);
};

const submitForm = () => {
  keyboardHide();
  setState(initialState);
  console.log(state);
};

  return (
    <>
    <TouchableWithoutFeedback onPress={() => {keyboardHide()}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
    <ImageBackground style={styles.image} source={require('./../image/img-bg.jpg')}>
    <View style={styles.form}>
      <View style={styles.photoBlock}>
      <TouchableOpacity
          style={styles.avatarBtn}
          activeOpacity={0.7}
          accessibilityLabel="add avatar"
          onPress={() => console.log('add avatar')}>
        <Image
          style={styles.addPhoto}
        source={require("./../image/add.png")}/>
      </TouchableOpacity>
        <Image style={styles.userPhoto}  source={require('./../image/ava.jpg')} />
      </View>
     <Text style={styles.titleText}>Регистрация</Text>
   <TextInput style={styles.input} placeholder="Логин" onFocus={()=> {setIsShowKeyboard(true)}} value={state.login}
   onChangeText={(value) => setState((prevState)=> ({...prevState, login: value}))}/>
   <TextInput style={styles.input} placeholder="Адрес электронной почты" onFocus={()=> {setIsShowKeyboard(true)}} value={state.email}
   onChangeText={(value) => setState((prevState)=> ({...prevState, email: value}))}/>
   <TextInput style={styles.input} placeholder="Пароль" secureTextEntry={true} onFocus={()=> {setIsShowKeyboard(true)}} value={state.password}
   onChangeText={(value) => setState((prevState)=> ({...prevState, password: value}))}/>
   <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={()=> {submitForm()}}>
        <Text style={styles.btnText}>Зарегистрироваться</Text>
      </TouchableOpacity>
      <Text style={styles.acountText}>Уже есть аккаунт? Войти</Text>
   </View>
   </ImageBackground>
   </KeyboardAvoidingView>
   </TouchableWithoutFeedback>
   </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
    form:{
         backgroundColor: "#FFFFFF",
         width: "100%",
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        position: "relative",
    },
    titleText:{
      fontFamily: "Roboto-Medium",
        fontSize: 30,
        lineHeight: 35,
        letterSpacing: 0.01,
        alignItems: "center",
        color: "#212121",
        textAlign: "center",
        marginBottom: 33,
        marginTop: 92,
    },
    input: {
      fontFamily: "Roboto-Regular",
      paddingVertical: 16,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      marginHorizontal: 16,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 16,
      colorText: "#BDBDBD",
    },
    button:{
        backgroundColor: "#FF6C00",
        padding: 10,
        marginTop: 43,
        paddingVertical: 16,
        alignItems: "center",
        borderRadius: 100,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    btnText:{
      fontFamily: "Roboto-Regular",
        color:"#FFFFFF",
        textAlign: "center",
        paddingVertical: 6,
        fontSize: 16,
        lineHeight: 19,
    },
    acountText:{
      fontFamily: "Roboto-Regular",
        color: "#1B4371",
        marginBottom: 78,
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
    },
    photoBlock:{
      position: "absolute",
      right: "50%",
      top: 0,
      transform: [{ translateX: 60 }, { translateY: -60 }],
      width: 120,
      height: 120,
      backgroundColor: "#F6F6F6",
      borderRadius: 16,
    },
    userPhoto:{
      borderRadius: 16,
      width: 120,
      height: 120,
    },
    avatarBtn:{
      position: "absolute",
      bottom: 10,
      right: -15,
      width: 25,
      height: 25,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: "transparent",

    },
    addPhoto:{
      width: 22,
    height: 22,
    borderRadius: 50,

    },
  });
  

export default RegistrationScreen
