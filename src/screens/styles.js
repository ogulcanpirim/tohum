import { StyleSheet, Dimensions, Platform, ColorPropType } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default StyleSheet.create({

   welcomeRegisterButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#26931e',
      width: screenWidth / 2.3
   },

   welcomeSignInButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#4a4b4a',
      width: screenWidth / 2.3
   },

   welcomeScreenView: {
      height: screenHeight * (Platform.OS == "ios" ? 0.83 : 0.90),
      backgroundColor: '#c2edda',
      marginBottom: screenHeight / 100,
      justifyContent: 'center',
   },

   welcomeLogoTitle: {
      fontSize: 48,
      fontFamily: 'Comfortaa-Regular',
      fontWeight: '400',
      textAlign: 'center',
      justifyContent: 'center',
   },

   screenHeader: {
      fontSize: 36,
      marginLeft: screenWidth / 20,
      marginTop: screenHeight / 100,
      fontFamily: 'Comfortaa-Regular',
   },

   screenHeaderWithLogo: {
      fontFamily: 'Comfortaa-Regular',
      fontSize: 36,
      padding: screenWidth / 20,
   },

   logoTitle: {
      fontFamily: 'Comfortaa-Regular',
   },

   searchBarContainer: {
      marginTop: screenHeight / 100,
      marginLeft: 15,
      marginRight: 15,
      height: screenHeight / 18,
      justifyContent: 'center',
      marginBottom: 15
   },

   searchBarText: {
      flex: 1,
      borderColor: '#cad1d7',
      borderWidth: 2,
      borderRadius: 8,
      padding: 10,
   },

   searchBarIcon: {
      position: 'absolute',
      right: '5%',
   },
   textStyle: {
      fontSize: 36,
      marginTop: 107,
      marginLeft: 15,
      marginBottom: 33,
      fontFamily: 'Comfortaa-Regular',
   },

   accountInfoText: {
      padding: screenWidth / 20,
      fontSize: 14,
   },
   agreementText: {
      fontWeight: 'bold',
      textDecorationLine: 'underline',
   },

   inputFirst: {
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      height: screenHeight / 15,
      borderColor: '#000000',
      borderWidth: 2,
      padding: 10,
   },
   inputs: {
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      height: screenHeight / 15,
      borderColor: '#000000',
      borderWidth: 2,
      marginTop: screenHeight / 50,
      padding: 10,
   },
   registerButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#26931e',
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,

   },
   signinButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#4a4b4a',
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      marginTop: 16,
   },

   forgotPasswordText: {
      marginTop: 16,
      marginLeft: screenWidth / 25,
      fontSize: 14,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
   },
   exitButton: {
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#FF0000',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 16,
   },
   buttonText: {
      alignSelf: 'center',
      color: 'white',
      fontWeight: 'bold',
   },

   returnButton: {
      marginLeft: screenWidth / 20,
      marginTop: screenHeight / 100,
   },
   passwordButton: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      height: 52,
      borderRadius: 8,
      backgroundColor: '#1d6d17',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 16,
   },
   createFormButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#39be37',
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      marginTop: 16,
   },
   createFormInput: {
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      height: screenHeight / 5,
      borderColor: '#000000',
      borderWidth: 2,
      marginTop: screenHeight / 50,
      paddingTop: screenHeight / 50,
      padding: 10,
   },
   addFormButton: {
      marginRight: screenWidth / 20,
      marginTop: screenHeight / 75,
   },
   signOutButton: {
      marginRight: screenWidth / 25,
      marginTop: screenHeight / 100,
   },
   inboxButton: {
      marginTop: screenHeight / 100,
      marginLeft: screenWidth / 3,
   },
   shoppingButton: {
      marginRight: screenWidth / 20,
      marginTop: screenHeight / 75,
   },
   profileContent: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      height: 52,
      borderRadius: 8,
      borderWidth: 1,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 16,
   },
   profileText: {
      alignSelf: 'center',
   },
   profileTextVariable: {
      marginTop: screenHeight / 100,
      marginBottom: screenHeight / 100,
      fontSize: screenHeight / 40,
      fontWeight: 'bold',
   },
   profileButtonText: {
      alignSelf: 'center',
      color: '#ffffff'
   },
   iconButtonStyle: {
      alignSelf: 'center',
      justifyContent: 'flex-start',
      marginRight: 15,
      marginLeft: 15,
   },
   badge: {
      position: 'absolute',
      top: -5,
      right: -10,
      backgroundColor: '#ff2222',
      borderRadius: 16,
      paddingHorizontal: 6,
      paddingVertical: 2,
      zIndex: 2,
   },
   badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
   },

   profileName: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: screenHeight / 50,
   },

   profileLine: {
      width: screenWidth / 1.5,
      borderWidth: 1,
      alignSelf: 'center',
      borderColor: '#000000',
      marginTop: screenHeight / 100,
   },

   listViewStyle: {
      padding: 15,
   },

   videoBoxStyle: {
      height: screenHeight / 4,
      borderRadius: 10,
   },

   videoImageStyle: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',

   },
   videoInfoStyle: {
      flex: 1,
      padding: '1%',
      flexDirection: 'row',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOpacity: .2,
      backgroundColor: '#fff',
      shadowOffset: {
         width: 10,
         height: 10,
      },
      alignItems: 'center'

   },

   videoTextContainer: {
      left: 10
   },

   videoHeader: {
      fontSize: 17,
      fontWeight: '500'
   },

   videoPublisher: {
      fontSize: 12,
      color: '#5E72E4',
      fontWeight: '600',
      textAlign: 'left',
   },

   videoLengthContainer: {
      right: 10,
      bottom: 10,
      position: 'absolute',
      height: '10%',
      width: '10%',
      backgroundColor: '#00000099',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
   },

   videoLengthStyle: {
      fontSize: 15,
      color: '#fff',
   },

   marketItemStyle: {
      //may change idk
      backgroundColor: '#26931e33',
   },
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
   },
   modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2
      },
   },
   uploadVideoButton: {
      height: screenHeight / 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#39be37',
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      marginTop: 16,
   },

})