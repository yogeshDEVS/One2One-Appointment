import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// Get the screen's width and height
const { width, height } = Dimensions.get('window');

const UserDetailsScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  setLoading(true);
  console.log('UserDetailsScreen: ', name); // Add this line
  // Save the user details in Firestore
  await firestore()
    .collection('formuser')
    .add({
      name: name,
      email: email,
      phone: phone,
    })
    .then(() => {
      setLoading(false);
      // Navigate to the DrivingTestScreen
      navigation.navigate('DrivingTest', { name: name, email: email });
    });
};


  return (
    <View style={styles.container}>
<View style={styles.header}>
        <Text style={styles.headerTitle}>Enter below details to access Driving Forms</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setName} value={name} placeholder='Enter Name'/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder='Enter Email' />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setPhone} value={phone} placeholder='Enter Phone Number' />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="darkblue" /> // Show loader when loading
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: width * 0.04,
    marginBottom: height * 0.01,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: width * 0.0414,
    alignSelf:'center',
   fontWeight:"700",
    color:'#434343'
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    height: 40,
    borderColor: '#ddd',
    
    marginBottom: 16,
    borderRadius: 5,
    backgroundColor: '#fff',
   
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    height: '100%',
    paddingLeft: 8,
    color:'black'
  },
  button: {
    padding: height * 0.015,
    borderRadius: 5,
    marginBottom: height * 0.04,
    borderWidth: 2,
    borderColor: '#00008B',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: height * 0.002 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems:'center'
  },
  buttonText: {
    color: '#00008B',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserDetailsScreen;