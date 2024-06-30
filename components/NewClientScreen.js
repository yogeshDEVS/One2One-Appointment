import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet,  PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { useNavigation } from '@react-navigation/native'; 
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-input';
import { SafeAreaView } from 'react-native-safe-area-context';


const NewClientScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [importedContacts, setImportedContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const phoneRef = useRef(null);

  const handleSave = async () => {
    try {
      // Get the current user
      const user = auth().currentUser;

      // Save the new client to Firestore
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Clients')
        .add({
          name: name,
          mobile: mobile,
        });

      console.log('Client added!', { name, mobile });

      // Navigate back to CreateMeetings screen with the added client
      navigation.navigate('CreateMeetings', { newClient: { name, mobile } });
    } catch (error) {
      console.error('Error adding client: ', error);
      Alert.alert('Error adding client', error.message);
    }
  };

  const importContacts = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const contacts = await Contacts.getAll();
        setImportedContacts(contacts);
        setModalVisible(true);
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatPhoneNumber = (number) => {
    number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    if (!number.startsWith('+44')) {
      number = '+44' + number;
    }
    return number;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>New client</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <TextInput 
        style={styles.input} 
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor='gray'
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile phone number"
        onChangeText={(number) => setMobile(formatPhoneNumber(number))}
        value={mobile}
        placeholderTextColor='gray'
      />

      {/* <TouchableOpacity onPress={importContacts} style={styles.importButton}>
        <Text style={styles.importButtonText}>Import from contacts</Text>
      </TouchableOpacity> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor='gray'
              onChangeText={(text) => setSearchText(text)}
            />
            <FlatList
              data={importedContacts.filter(contact => 
                contact.givenName.toLowerCase().includes(searchText.toLowerCase())
              )}
              keyExtractor={(item) => item.recordID}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setName(item.givenName);
                    setMobile(formatPhoneNumber(item.phoneNumbers[0].number));
                    setModalVisible(false);
                  }}
                  style={styles.contactContainer}
                >
                  <Text style={{color:'black'}}>{item.givenName}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </View>
  );
};



// const NewClientScreen = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [importedContacts, setImportedContacts] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const navigation = useNavigation();
//   const [searchText, setSearchText] = useState('');
//   const [selectedContacts, setSelectedContacts] = useState([]);

//   const [tempMobile, setTempMobile] = useState(''); // Add this line

  

  
//   const phoneRef = useRef(null);

  
//   // const importContacts = async () => {
//   //   try {
//   //     const granted = await PermissionsAndroid.request(
//   //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//   //       {
//   //         title: "Contacts",
//   //         message: "This app would like to view your contacts.",
//   //         buttonPositive: "Allow",
//   //         buttonNegative: "Deny",
//   //       }
//   //     );
//   //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//   //       const contacts = await Contacts.getAll();
//   //       setImportedContacts(contacts);
//   //       setModalVisible(true);
//   //     } else {
//   //       console.log("Contacts permission denied");
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   // const formatPhoneNumber = (number) => {
//   //   // Remove spaces, parentheses, and dashes
//   //   number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    
//   //   // Remove country code if it's included
//   //   if (number.startsWith('+91')) {
//   //     number = number.substring(3); // Remove the '+91' from the start
//   //   }
    
//   //   return number;
//   // };


//   const importContacts = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//         {
//           title: "Contacts",
//           message: "This app would like to view your contacts.",
//           buttonPositive: "Allow",
//           buttonNegative: "Deny",
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         const contacts = await Contacts.getAll();
//         setImportedContacts(contacts);
//         setModalVisible(true);
//       } else {
//         console.log("Contacts permission denied");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };


//   const formatPhoneNumber = (number) => {
//     // Remove spaces, parentheses, and dashes
//     number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    
//     // Add country code if it's not included
//     if (!number.startsWith('+44')) {
//       number = '+44' + number;
//     }
    
//     return number;
//   };
  

//   // const formatPhoneNumber = (number) => {
//   //   // Remove spaces, parentheses, and dashes
//   //   number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    
//   //   // Remove country code if it's included
//   //   if (number.startsWith('+91')) {
//   //     number = number.substring(3); // Remove the '+91' from the start
//   //   }
    
//   //   return number;
//   // };

//   const handleSave = () => {
//     // Get the current user
//     const user = auth().currentUser;

//     // Save the new client to Firestore
//     firestore()
//       .collection('Users')
//       .doc(user.uid)
//       .collection('Clients')
//       .add({
//         name: name,
//         mobile: mobile,
//       })
//       .then(() => {
//         console.log('Client added!');
//         // Navigate to AddClient screen after client is added to Firestore
//         navigation.navigate('AddClient');
//       });
      
//     navigation.goBack();
//   }

  

//   // const formatPhoneNumber = (number) => {
//   //   // Remove spaces, parentheses, and dashes
//   //   number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    
//   //   // Add country code if it's not included
//   //   if (!number.startsWith('+')) {
//   //     number = '+91' + number; // Assuming the country code is +91 (India)
//   //   }
    
//   //   return number;
//   // };

//   // const handleSave = () => {

//   //   // Get the current user
//   //   const user = auth().currentUser;
  
//   //   // Save the new client to Firestore
//   //   firestore()
//   //     .collection('Users')
//   //     .doc(user.uid)
//   //     .collection('Clients')
//   //     .add({
//   //       name: name,
//   //       mobile: mobile,
//   //     })
//   //     .then(() => {
//   //       console.log('Client added!');
//   //       // Navigate to AddClient screen after client is added to Firestore
//   //           navigation.navigate('AddClient');
//   //         });
          
//   //   navigation.goBack();
//   // }

//   // Modify this function
// // const handleSave = () => {
// //   // Get the current user
// //   const user = auth().currentUser;

// //   // Save the new client to Firestore
// //   firestore()
// //     .collection('Users')
// //     .doc(user.uid)
// //     .collection('Clients')
// //     .add({
// //       name: name,
// //       mobile: formatPhoneNumber(tempMobile), // Change this line
// //     })
// //     .then(() => {
// //       console.log('Client added!');
// //       // Navigate to AddClient screen after client is added to Firestore
// //       navigation.navigate('AddClient');
// //     });
    
// //   navigation.goBack();
// // }


//   const onPressFlag = () => {
//     console.log('Flag button pressed!');
//   };
  
  

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>New client</Text>
//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>
//       </View>
      
//       <TextInput 
//         style={styles.input} 
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//         placeholderTextColor='gray'
//       />
//            <TextInput
//         style={styles.input}
//         placeholder="Mobile phone number"
//         onChangeText={(number) => setMobile(formatPhoneNumber(number))}
//         value={mobile}
//         placeholderTextColor='gray'
//       />

//       {/* <TouchableOpacity onPress={importContacts} style={styles.importButton}>
//         <Text style={styles.importButtonText}>Import from contacts</Text>
//       </TouchableOpacity> */}

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//           <TextInput
//               style={styles.searchInput}
//               placeholder="Search..."
//               placeholderTextColor='gray'
//               onChangeText={(text) => setSearchText(text)}
//             />
//           <FlatList
//   data={importedContacts.filter(contact => 
//     contact.givenName.toLowerCase().includes(searchText.toLowerCase())
//   )}
//   keyExtractor={(item) => item.recordID}
//   renderItem={({ item }) => (
//     <TouchableOpacity onPress={() => {setName(item.givenName); setMobile(formatPhoneNumber(item.phoneNumbers[0].number)); setModalVisible(false);}} style={styles.contactContainer}>
//     <Text style={{color:'black'}}>{item.givenName}</Text>
//   </TouchableOpacity>
    
    
//   )}
// />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerText: {
    fontSize: 21,
    color: '#000',
    fontWeight: 'bold',
  },
  searchInput: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color:'black'
  },

  saveButton: {
    backgroundColor: 'darkblue',
    padding: 10,
    borderRadius: 15,
    width: '22%',
    alignItems:'center'
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color:'black'
  },

  importButton: {
    
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,

  },

  importButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  label: {
    margin: 8,
    color:'black'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contactContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default NewClientScreen;

// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet,  PermissionsAndroid } from 'react-native';
// import Contacts from 'react-native-contacts';
// import { useNavigation } from '@react-navigation/native'; 
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import PhoneInput from 'react-native-phone-input';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const NewClientScreen = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [importedContacts, setImportedContacts] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const navigation = useNavigation();
//   const [searchText, setSearchText] = useState('');
//   const [selectedContacts, setSelectedContacts] = useState([]);

//   const [tempMobile, setTempMobile] = useState(''); // Add this line

  
//   const phoneRef = useRef(null);

  
//   // const importContacts = async () => {
//   //   try {
//   //     const granted = await PermissionsAndroid.request(
//   //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//   //       {
//   //         title: "Contacts",
//   //         message: "This app would like to view your contacts.",
//   //         buttonPositive: "Allow",
//   //         buttonNegative: "Deny",
//   //       }
//   //     );
//   //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//   //       const contacts = await Contacts.getAll();
//   //       setImportedContacts(contacts);
//   //       setModalVisible(true);
//   //     } else {
//   //       console.log("Contacts permission denied");
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   // const formatPhoneNumber = (number) => {
//   //   // Remove spaces, parentheses, and dashes
//   //   number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    
//   //   // Remove country code if it's included
//   //   if (number.startsWith('+91')) {
//   //     number = number.substring(3); // Remove the '+91' from the start
//   //   }
    
//   //   return number;
//   // };


//   // const importContacts = async () => {
//   //   try {
//   //     const granted = await PermissionsAndroid.request(
//   //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//   //       {
//   //         title: "Contacts",
//   //         message: "This app would like to view your contacts.",
//   //         buttonPositive: "Allow",
//   //         buttonNegative: "Deny",
//   //       }
//   //     );
//   //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//   //       const contacts = await Contacts.getAll();
//   //       setImportedContacts(contacts);
//   //       setModalVisible(true);
//   //     } else {
//   //       console.log("Contacts permission denied");
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   const importContacts = async () => {
//     try {
//       const granted = await Contacts.checkPermission();
  
//       if (granted === 'authorized') {
//         const contacts = await Contacts.getAll();
//         setImportedContacts(contacts);
//         setModalVisible(true);
//       } else {
//         Contacts.requestPermission().then(permission => {
//           if (permission === 'authorized') {
//             // user authorized contacts, fetch them
//             Contacts.getAll().then(contacts => {
//               setImportedContacts(contacts);
//               setModalVisible(true);
//             });
//           } else {
//             console.log("Contacts permission denied");
//           }
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
  


//   const formatPhoneNumber = (number) => {
//     // Remove spaces, parentheses, and dashes
//     number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    
//     // Add country code if it's not included
//     if (!number.startsWith('+91')) {
//       number = '+91' + number;
//     }
    
//     return number;
//   };
  

//   // const formatPhoneNumber = (number) => {
//   //   // Remove spaces, parentheses, and dashes
//   //   number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    
//   //   // Remove country code if it's included
//   //   if (number.startsWith('+91')) {
//   //     number = number.substring(3); // Remove the '+91' from the start
//   //   }
    
//   //   return number;
//   // };

//   const handleSave = () => {
//     // Get the current user
//     const user = auth().currentUser;

//     // Save the new client to Firestore
//     firestore()
//       .collection('Users')
//       .doc(user.uid)
//       .collection('Clients')
//       .add({
//         name: name,
//         mobile: mobile,
//       })
//       .then(() => {
//         console.log('Client added!');
//         // Navigate to AddClient screen after client is added to Firestore
//         navigation.navigate('AddClient');
//       });
      
//     navigation.goBack();
//   }

  

//   // const formatPhoneNumber = (number) => {
//   //   // Remove spaces, parentheses, and dashes
//   //   number = number.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
    
//   //   // Add country code if it's not included
//   //   if (!number.startsWith('+')) {
//   //     number = '+91' + number; // Assuming the country code is +91 (India)
//   //   }
    
//   //   return number;
//   // };

//   // const handleSave = () => {

//   //   // Get the current user
//   //   const user = auth().currentUser;
  
//   //   // Save the new client to Firestore
//   //   firestore()
//   //     .collection('Users')
//   //     .doc(user.uid)
//   //     .collection('Clients')
//   //     .add({
//   //       name: name,
//   //       mobile: mobile,
//   //     })
//   //     .then(() => {
//   //       console.log('Client added!');
//   //       // Navigate to AddClient screen after client is added to Firestore
//   //           navigation.navigate('AddClient');
//   //         });
          
//   //   navigation.goBack();
//   // }

//   // Modify this function
// // const handleSave = () => {
// //   // Get the current user
// //   const user = auth().currentUser;

// //   // Save the new client to Firestore
// //   firestore()
// //     .collection('Users')
// //     .doc(user.uid)
// //     .collection('Clients')
// //     .add({
// //       name: name,
// //       mobile: formatPhoneNumber(tempMobile), // Change this line
// //     })
// //     .then(() => {
// //       console.log('Client added!');
// //       // Navigate to AddClient screen after client is added to Firestore
// //       navigation.navigate('AddClient');
// //     });
    
// //   navigation.goBack();
// // }


//   const onPressFlag = () => {
//     console.log('Flag button pressed!');
//   };
  
  

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>New client</Text>
//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>
//       </View>
      
//       <TextInput 
//         style={styles.input} 
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//            <TextInput
//         style={styles.input}
//         placeholder="Mobile phone number"
//         onChangeText={(number) => setMobile(formatPhoneNumber(number))}
//         value={mobile}
//       />

//       <TouchableOpacity onPress={importContacts} style={styles.importButton}>
//         <Text style={styles.importButtonText}>Import from contacts</Text>
//       </TouchableOpacity>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//           <TextInput
//               style={styles.searchInput}
//               placeholder="Search..."
//               onChangeText={(text) => setSearchText(text)}
//             />
//           <FlatList
//   data={importedContacts.filter(contact => 
//     contact.givenName.toLowerCase().includes(searchText.toLowerCase())
//   )}
//   keyExtractor={(item) => item.recordID}
//   renderItem={({ item }) => (
//     <TouchableOpacity onPress={() => {setName(item.givenName); setMobile(formatPhoneNumber(item.phoneNumbers[0].number)); setModalVisible(false);}} style={styles.contactContainer}>
//     <Text>{item.givenName}</Text>
//   </TouchableOpacity>
    
    
//   )}
// />
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
  
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },

//   headerText: {
//     fontSize: 21,
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   searchInput: {
//     width: 200,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     color:'black'
//   },

//   saveButton: {
//     backgroundColor: 'darkblue',
//     padding: 10,
//     borderRadius: 15,
//     width: '22%',
//     alignItems:'center'
//   },

//   saveButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     color:'black'
//   },

//   importButton: {
    
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,

//   },

//   importButtonText: {
//     color: '#000',
//     fontWeight: 'bold',
//   },

//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },

//   label: {
//     margin: 8,
//     color:'black'
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   contactContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
// });

// export default NewClientScreen;