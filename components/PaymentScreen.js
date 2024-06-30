import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { CardField, useStripe, Stripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'https://04kz46j0-4002.inc1.devtunnels.ms'

const PaymentScreen = () => {
  const [cardDetails, setCardDetails] = useState(null);
   // Destructure confirmCardSetup from useStripe
   const navigation = useNavigation();

  const { confirmSetupIntent } = useStripe();

  const handleCardChange = (details) => {
    setCardDetails(details);
  };
  
  
  const handleSubmit = async () => {
    if (!cardDetails?.complete) {
      alert('Please enter complete card details');
      return;
    }
  
    // Get the customer ID from AsyncStorage
    const customerId = await AsyncStorage.getItem('customerId');
  
    // Fetch the setup intent client secret from your backend
    const response = await fetch(`${API_URL}/create-setup-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: customerId, // pass the customer ID
      }),
    });
  
    if (!response.ok) {
      console.error('Failed to create setup intent:', response);
      return;
    }
  
    const data = await response.json();
    const clientSecret = data.clientSecret;
  
    // Confirm the setup intent
    const { error } = await confirmSetupIntent(clientSecret, {
    paymentMethodType: 'Card',
      card: cardDetails, // pass the card details
    });
  
    if (error) {
      console.log('Setup intent confirmation error', error.message);
    } else {
      console.log('Setup intent confirmed!');
      navigation.navigate('Home')
      
    }
  };


  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>
      <Text style={styles.text}>
        We need your card details to start your 30-day free trial. After the trial, a subscription fee of 5 GBP will be deducted from your account monthly. Your information is securely handled by Stripe and won't be shared with any third parties.
      </Text>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={styles.cardField}
        onCardChange={handleCardChange}
      />
      <Button title="Start My Free Trial" onPress={handleSubmit} color="darkblue" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    lineHeight: 24,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default PaymentScreen;