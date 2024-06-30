import React,{useEffect, useState, } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, ActivityIndicator, Modal, ScrollView } from 'react-native';
import {PlatformPayButton, PlatformPay, StripeProvider, usePlatformPay, isPlatformPaySupported} from '@stripe/stripe-react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native'; 
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import messaging from '@react-native-firebase/messaging';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';


import PhoneInput from 'react-native-phone-input';


// async function getToken() {
//   const token = await messaging().getToken();
//   console.log('FCM token:', token);
//   return token;
// }
async function getToken() {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('FCM token:', token);
  return token;
}



const firebaseConfig = {
  apiKey: "AIzaSyCom1ZXGJmMqBvQdZSAyeu9kUQaWKT6MwU",
  authDomain: "diarylatest-88632.firebaseapp.com",
  databaseURL: "https://diarylatest-88632.firebaseio.com",
  projectId: "diarylatest-88632",
  storageBucket: "diarylatest-88632.appspot.com",

  appId: "1:866393106718:android:c01dccdc7a4bc0782ec10f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const { width, height } = Dimensions.get('window');


const API_URL = 'https://04kz46j0-4002.inc1.devtunnels.ms'

const SignupScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [loading, setLoading] = useState(false);

  async function onAppleButtonPress() {
    try {
      // Performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
  
      // Get current authentication state for user
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // Create a Firebase credential with the token
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  
        // Sign in with the credential
        const firebaseUserCredential = await auth().signInWithCredential(appleCredential);
        const { user } = firebaseUserCredential;
  
        // Check if the user already exists in Firestore using the email
        const userDoc = await firestore().collection('users').where('email', '==', user.email).get();
  
        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          const customerId = userData.customerId;
  
          if (customerId) {
            // User exists and has a customerId, so navigate to Home
            await AsyncStorage.setItem('userLoggedIn', 'true');
            navigation.navigate('Home');
            return;
          } else {
            // User exists but does not have a customerId, clean up Firestore
            await firestore().collection('users').doc(userDoc.docs[0].id).delete();
          }
        }
  
        // If user does not exist, proceed with signup
        const response = await fetch(`${API_URL}/create-customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }),
        });
  
        if (!response.ok) {
          console.error('Response:', response);
          throw new Error('Network response was not ok');
        }
  
        const data = await response.text();
        let customerId;
        try {
          const json = JSON.parse(data);
          customerId = json.customerId;
        } catch (err) {
          console.error('Failed to parse JSON:', err);
          return;
        }
  
        if (!customerId) {
          console.error('No customer ID returned');
          return;
        }
  
        await AsyncStorage.setItem('customerId', customerId);
        await firestore().collection('users').doc(firebaseUserCredential.user.uid).set({
          firstName: appleAuthRequestResponse.fullName?.givenName || '',
          lastName: appleAuthRequestResponse.fullName?.familyName || '',
          email: user.email,
          profile_picture: '',
          customerId: customerId,
        }).then(async () => {
          console.log('User added to Firestore');
          await AsyncStorage.setItem('userLoggedIn', 'true');
          navigation.navigate('PaymentScreen');
        });
      } else {
        console.log('User is not authenticated');
      }
    } catch (error) {
      console.log('Error during sign-in:', error);
    }
  }

  const {
    isPlatformPaySupported,
    confirmPlatformPayPayment,
  } = usePlatformPay();



 
   
  const createSubscription = async () => {
    const response = await fetch(`${API_URL}/create-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, // use the user's email
      }),
    });
    const { subscription, client_secret } = await response.json();
  
    return { subscription, client_secret };
  };
  

  // const pay = async () => {
  //   try {
  //     const { subscription, client_secret } = await createSubscription();
  //     if (!subscription || !client_secret) {
  //       console.error('No subscription or client secret returned');
  //       return;
  //     }
  
  //     const { error, setupIntent: confirmedSetupIntent } = await confirmPlatformPayPayment(
  //       client_secret,
  //       {
  //         applePay: {
  //           cartItems: [
  //             {
  //               label: 'One2one Subscription',
  //               amount: '0.00', // Charge 0 GBP at this stage
  //               paymentType: PlatformPay.PaymentType.Immediate,
  //             },
  //             {
  //               label: 'Total',
  //               amount: '0.00', // Charge 0 GBP at this stage
  //               paymentType: PlatformPay.PaymentType.Immediate,
  //             },
  //           ],
  //           merchantCountryCode: 'GB',
  //           currencyCode: 'GBP',
  //           requiredShippingAddressFields: [
  //             PlatformPay.ContactField.PostalAddress,
  //           ],
  //           requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
  //         },
  //       }
  //     );
  
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       Alert.alert('Success', 'Check the logs for setup intent details.');
  //       console.log(JSON.stringify(confirmedSetupIntent, null, 2));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [modalVisible, setModalVisible] = useState(false);

  




let cardDetails = {};

const handleCardChange = (details) => {
  console.log('cardDetails', details);
  cardDetails = details;
};




const {stripe} = useStripe();
const [stripeReady, setStripeReady] = useState(false);


// const handleSignup = async () => {
//   if (termsAccepted) {
//     setLoading(true); // Start loading
//     try {
//       const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//       console.log('User account created & signed in!');
//       setLoading(false); // Stop loading
//       await AsyncStorage.setItem('userLoggedIn', 'true'); // Add this line

//       // Parse and format the phone number
//       const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'IN'); // replace 'IN' with the user's country code
//       const formattedPhoneNumber = parsedPhoneNumber ? parsedPhoneNumber.formatInternational() : '';

//       // Create a new customer in Stripe
//       const response = await fetch(`${API_URL}/create-customer`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//         }),
//       });

//       if (!response.ok) {
//         console.error('Response:', response);
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.text();

//       let customerId;
//       try {
//         const json = JSON.parse(data);
//         customerId = json.customerId;
//       } catch (err) {
//         console.error('Failed to parse JSON:', err);
//         return;
//       }

//       if (!customerId) {
//         console.error('No customer ID returned');
//         return;
//       }

//       // Store the customer ID in AsyncStorage
//       await AsyncStorage.setItem('customerId', customerId);

//       // Store the customer ID in Firestore
//       await firestore().collection('users').doc(userCredential.user.uid).set({
//         firstName: firstName,
//         lastName: lastName,
//         phoneNumber: formattedPhoneNumber, // store the formatted phone number
//         signupDate: firebase.firestore.FieldValue.serverTimestamp(),
//         customerId: customerId, // store the customer ID
//       });
//       console.log('User added to Firestore');
//       navigation.navigate('PaymentScreen')
//     } catch (error) {
//       setLoading(false); // Stop loading
//       let errorMessage = '';
//       if (error.code === 'auth/email-already-in-use') {
//         errorMessage = 'That email address is already in use!';
//       } else if (error.code === 'auth/invalid-email') {
//         errorMessage = 'That email address is invalid!';
//       } else {
//         errorMessage = error.message;
//       }
//       Alert.alert(
//         'Signup Error',
//         errorMessage,
//         [
//           {text: 'OK', onPress: () => console.log('OK Pressed')}
//         ],
//         {cancelable: false}
//       );
//     }
//   } else {
//     Alert.alert(
//       'Terms and Conditions',
//       'Please accept the terms and conditions to proceed.',
//       [
//         {text: 'OK', onPress: () => console.log('OK Pressed')}
//       ],
//       {cancelable: false}
//     );
//   }
// };

const handleSignup = async () => {
  if (termsAccepted) {
    setLoading(true); // Start loading
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      console.log('User account created & signed in!');
      setLoading(false); // Stop loading
      await AsyncStorage.setItem('userLoggedIn', 'true'); // Add this line

      // Create a new customer in Stripe
      const response = await fetch(`${API_URL}/create-customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!response.ok) {
        console.error('Response:', response);
        throw new Error('Network response was not ok');
      }

      const data = await response.text();

      let customerId;
      try {
        const json = JSON.parse(data);
        customerId = json.customerId;
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        return;
      }

      if (!customerId) {
        console.error('No customer ID returned');
        return;
      }

      // Store the customer ID in AsyncStorage
      await AsyncStorage.setItem('customerId', customerId);

      // Store the customer ID in Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        signupDate: firebase.firestore.FieldValue.serverTimestamp(),
        customerId: customerId, // store the customer ID
      });
      console.log('User added to Firestore');
      navigation.navigate('PaymentScreen');
    } catch (error) {
      setLoading(false); // Stop loading
      let errorMessage = '';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!';
      } else {
        errorMessage = error.message;
      }
      Alert.alert(
        'Signup Error',
        errorMessage,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false}
      );
    }
  } else {
    Alert.alert(
      'Terms and Conditions',
      'Please accept the terms and conditions to proceed.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      {cancelable: false}
    );
  }
};




  
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '866393106718-d6jnu20phmnl13re37mldai1f1oin3mf.apps.googleusercontent.com', 
    });
  }, []);


  const handleGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut(); 
      const { idToken, user } = await GoogleSignin.signIn(); // Destructure user directly from userInfo
      // Create a new user on Firebase
      const firebaseUserCredential = await auth().signInWithCredential(
        auth.GoogleAuthProvider.credential(idToken) // Pass idToken directly
      );
      firestore().collection('users').doc(firebaseUserCredential.user.uid).set({
        firstName: user.givenName,
        lastName: '', // Google Sign-In does not provide separate first and last names
        email: user.email,
        profile_picture: user.photo // Save the user's profile picture URL to Firestore
      }).then(async () => { // Add async here
        console.log('User added to Firestore');
        console.log(`User ${user.email} has signed in`);
        await AsyncStorage.setItem('userLoggedIn', 'true'); // Add this line
        navigation.navigate('Home'); // Navigate to Home screen
      });
    } catch (error) {
      console.log('Error during sign-in:', error);
    }
  };
  

  // const handleGoogleSignup = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     await GoogleSignin.signOut();
  //     const { idToken, user } = await GoogleSignin.signIn(); // Destructure user directly from userInfo
  
  //     // Create a new user on Firebase
  //     const firebaseUserCredential = await auth().signInWithCredential(
  //       auth.GoogleAuthProvider.credential(idToken) // Pass idToken directly
  //     );
  
  //     firestore().collection('users').doc(firebaseUserCredential.user.uid).set({
  //       firstName: user.givenName,
  //       lastName: '', // Google Sign-In does not provide separate first and last names
  //       email: user.email,
  //       profile_picture: user.photo // Save the user's profile picture URL to Firestore
  //     }).then(() => {
  //       console.log('User added to Firestore');
  //       console.log(`User ${user.email} has signed in`);
  //       navigation.navigate('Home'); // Navigate to Home screen
  //     });
  //   } catch (error) {
  //     console.log('Error during sign-in:', error);
  //   }
  // };

  // const handleGoogleSignup = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     await GoogleSignin.signOut(); 
  //     const { idToken, user } = await GoogleSignin.signIn(); // Destructure user directly from userInfo
  //     // Create a new user on Firebase
  //     const firebaseUserCredential = await auth().signInWithCredential(
  //       auth.GoogleAuthProvider.credential(idToken) // Pass idToken directly
  //     );
  //     firestore().collection('users').doc(firebaseUserCredential.user.uid).set({
  //       firstName: user.givenName,
  //       lastName: '', // Google Sign-In does not provide separate first and last names
  //       email: user.email,
  //       profile_picture: user.photo // Save the user's profile picture URL to Firestore
  //     }).then(() => {
  //       console.log('User added to Firestore');
  //       console.log(`User ${user.email} has signed in`);
  //       navigation.navigate('Home'); // Navigate to Home screen
  //     });
  //   } catch (error) {
  //     console.log('Error during sign-in:', error);
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.headerTitle}>SIGN UP</Text>
      </View>
      <Text style={styles.greeting}>Welcome to One2One App</Text>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/user.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/user.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/email.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/lock.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
      </View>
     

     
<TouchableOpacity style={styles.submitButton} onPress={handleSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Show loader when loading
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </TouchableOpacity>

     
{/*     
      <Text style={styles.or}>Or </Text> */}
      <View style={styles.socialIcons}>

      {/* <View  style={styles.googleButton}>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => onAppleButtonPress()}
      />
      </View> */}
      
      {/* <TouchableOpacity 
    onPress={handleGoogleSignup} 
    style={styles.googleButton}
  >
    <Image 
      source={require('../assets/google.png')} 
      style={styles.googleIcon} 
    />
    <Text style={styles.googleText}>Continue with Google</Text>
  </TouchableOpacity> */}

     
       
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox value={termsAccepted} onValueChange={setTermsAccepted} />
        <Text style={styles.terms}>Accept all the provided requirements.</Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: width * 0.06,
    marginBottom: height * 0.035,
    marginTop: height * 0.065,
    fontWeight: 'bold',
    alignSelf: 'center',
    color:'#434343'
  },
  headerTitle: {
    fontSize: width * 0.042,
    alignSelf:'center',
    color:'#434343'
  },
  fieldTitle: {
    fontSize: width * 0.04,
    marginBottom: height * 0.005,
    color: '#A9A9A9',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingLeft: width * 0.025,
    marginBottom: height * 0.03,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent:'space-evenly',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  icon: {
    width: width * 0.044,
    height: height * 0.023,
    marginRight: width * 0.025,
  },
  input: {
    flex: 1,
    height: height * 0.057,
    paddingLeft: width * 0.025,
    color:'black'
  },

  submitButton: {
    backgroundColor: 'darkblue',
    padding: height * 0.0125,
    alignItems: 'center',
    marginBottom: height * 0.01,
    borderRadius: 23,
    marginTop: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitText: {
    color: 'white',
    fontSize: width * 0.045,
  },
  terms: {
    fontSize: width * 0.035,
    color: 'black',
    textAlign: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.007,
    marginLeft: width * 0.0245,
  },
  or: {
    fontSize: width * 0.045,
    color: '#000',
    textAlign: 'center',
 
    marginTop: height * 0.0005,
    fontWeight:'bold'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.03,
  },
  icon1: {
    width: width * 0.075,
    height: height * 0.03,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
    marginTop:height * 0.12,
    alignSelf:'center'
  },

  googleButton: {
    flexDirection: 'row', // to align icon and text horizontally
    alignItems: 'center', // to center them vertically
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // transparent background
    borderRadius: 4, // minimalistic border
    borderColor: '#ddd', // border color
    borderWidth: 0, // border width
    elevation: 2.5, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: {width: 0, height: 2}, // for shadow on iOS
    shadowOpacity: 0.25, // for shadow on iOS
    shadowRadius: 3.84, // for shadow on iOS
    padding: 10, // inner spacing
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10, // spacing between icon and text
  },
  googleText: {
    color: '#000', // white text
    fontWeight: 'bold', // bold text
    fontSize: width * 0.049,
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SignupScreen;