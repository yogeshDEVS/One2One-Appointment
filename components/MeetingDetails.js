import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useRoute, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SendSMS from 'react-native-sms';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const MeetingDetails = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {meeting} = route.params;
  console.log('meeting', meeting);
  const [smsBody, setSmsBody] = useState(
    `Reminder: Your appointment with ${meeting.creator} on ${new Date(
      meeting.date,
    ).toDateString()} at ${
      meeting.time
    } has been successfully booked. The End time of meeting is ${
      meeting.finishTime
    }. To reschedule please call ${meeting.creator}. (Sent via One2One app)`,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState(meeting.time);
  const [finishTime, setFinishTime] = useState(meeting.finishTime);
  const [date, setDate] = useState(new Date(meeting.date));
  //   const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  //   const [showFinishTimePicker, setShowFinishTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
    console.log('itsss cliceddd');
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleStartTimeConfirm = time => {
    setStartTime(moment(time).format('hh:mm A'));
    hideStartTimePicker();
  };
  const [isFinishTimePickerVisible, setFinishTimePickerVisible] =
    useState(false);
  const showFinishTimePicker = () => {
    setFinishTimePickerVisible(true);
    console.log('itsss cliceddd');
  };

  const hideFinishTimePicker = () => {
    setFinishTimePickerVisible(false);
  };

  const handleFinishTimeConfirm = time => {
    setFinishTime(moment(time).format('hh:mm A'));
    hideFinishTimePicker();
  };
  //   console.log('date', new Date(), moment());
  const handleDeleteMeeting = () => {
    const user = auth().currentUser;

    firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Meetings')
      .doc(meeting.key)
      .delete()
      .then(() => {
        console.log('Meeting successfully deleted!');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error removing meeting: ', error);
      });
  };

//   const handleSendSms = () => {
//     const allClientMobileNumbers = meeting.clients.map(client => client.mobile);

//     SendSMS.send(
//       {
//         body: smsBody,
//         recipients: allClientMobileNumbers,
//         successTypes: ['sent', 'queued'],
//         allowAndroidSendWithoutReadPermission: true,
//       },
//       (completed, cancelled, error) => {
//         if (completed) {
//           Alert.alert(
//             'Success',
//             'Reminder SMS sent successfully to all clients!',
//           );
//         } else {
//           Alert.alert('Error', 'Failed to send reminder SMS to clients.');
//           if (error) {
//             console.log('Error details: ', error);
//           }
//         }
//       },
//     );
//   };

// const handleSendSms = () => {
//     const allClientMobileNumbers = meeting.clients.map(client => client.mobile);

//     if (Platform.OS === 'android') {
//       SendSMS.send(
//         {
//           body: smsBody,
//           recipients: allClientMobileNumbers,
//           successTypes: ['sent', 'queued'],
//           allowAndroidSendWithoutReadPermission: true,
//         },
//         (completed, cancelled, error) => {
//           if (completed) {
//             Alert.alert(
//               'Success',
//               'Reminder SMS sent successfully to all clients!',
//             );
//           } else {
//             Alert.alert('Error', 'Failed to send reminder SMS to clients.');
//             if (error) {
//               console.log('Error details: ', error);
//             }
//           }
//         },
//       );
//     } else if (Platform.OS === 'ios') {
//       allClientMobileNumbers.forEach(number => {
//         SendSMS.send(
//           {
//             body: smsBody,
//             recipients: [number],
//             successTypes: ['sent', 'queued'],
//             allowAndroidSendWithoutReadPermission: true,
//           },
//           (completed, cancelled, error) => {
//             if (completed) {
//               console.log(`SMS sent to ${number} successfully!`);
//             } else {
//               console.log(`Failed to send SMS to ${number}.`);
//               if (error) {
//                 console.log('Error details: ', error);
//               }
//             }
//           },
//         );
//       });
//       Alert.alert(
//         'Success',
//         'Reminder SMS sent successfully to all clients!',
//       );
//     }
//   };

const handleSendSms = () => {
    const allClientMobileNumbers = meeting.clients.map(client => client.mobile);

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      SendSMS.send({
        body: smsBody,
        recipients: allClientMobileNumbers,
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      }, (completed, cancelled, error) => {
        if (completed) {
          Alert.alert('Success', 'Reminder SMS sent successfully to all clients!');
        } else if (cancelled) {
          Alert.alert('Cancelled', 'SMS sending cancelled.');
        } else if (error) {
          console.error('Error sending SMS:', error);
          Alert.alert('Error', 'Failed to send reminder SMS to clients.');
        }
      });
    } else {
      Alert.alert('Error', 'SMS sending is not supported on this platform.');
    }
  };

  console.log('finsihtime', finishTime);
  //   console.log('datee', date.getTime());

  const handleSaveChanges = async () => {
    try {
      const user = auth().currentUser;
      console.log('chlaaa');
      console.log('date', date);
      await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Meetings')
        .doc(meeting.key)
        .update({
          date: moment(date).format('YYYY-MM-DD'),
          time: startTime,
          finishTime: finishTime,
        });

      console.log(
        'statTime',
        startTime,
        'finishtime',
        finishTime,
        'date',
        date,
      );
      // Alert.alert('Success', 'Meeting details updated successfully!');
      navigation.goBack();
      //   navigation.navigate('Calendar', {
      //     updatedMeeting: {
      //       ...meeting,
      //       date,
      //       time: startTime,
      //       finishTime: finishTime,
      //     },
      //   });
    } catch (error) {
      console.error('Error updating meeting: ', error);
      Alert.alert('Error', 'Failed to update meeting details.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setDate(selectedDate || date);
      console.log('Selected date:', selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.backView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            
          </TouchableOpacity>
          <Text style={styles.title}>Meeting Details</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.label}>Creator:</Text>
          <Text style={styles.text}>{meeting.creator}</Text>

          <Text style={styles.label}>Title:</Text>
          <Text style={styles.text}>{meeting.title}</Text>

          <Text style={styles.label}>Date:</Text>

          <Text style={styles.text}>
            {/* {new Date(meeting.date).toDateString()} */}
            {moment(meeting.date).format('dddd ll')}
          </Text>

          <Text style={styles.label}>Start Time:</Text>
          {isEditing ? (
            <>
              <TouchableOpacity onPress={showStartTimePicker}>
                <Text style={styles.text}>{startTime}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.text}>{meeting.time}</Text>
          )}

          <Text style={styles.label}>Finish Time:</Text>
          {isEditing ? (
            <>
              <TouchableOpacity onPress={showFinishTimePicker}>
                <Text style={styles.text}>{finishTime}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.text}>{meeting.finishTime}</Text>
          )}

          <Text style={styles.label}>Description:</Text>
          <Text style={styles.text}>{meeting.description}</Text>

          <Text style={styles.label}>Clients:</Text>
          <Text style={styles.text}>
            {meeting.clients.map(client => client.name).join(', ')}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditing(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDeleteMeeting}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.sendButton]}
                onPress={handleSendSms}>
                <Text style={styles.buttonText}>Send SMS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => setIsEditing(true)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={handleStartTimeConfirm}
          onCancel={hideStartTimePicker}
          // is24Hour={true}
        />
        <DateTimePickerModal
          isVisible={isFinishTimePickerVisible}
          mode="time"
          onConfirm={handleFinishTimeConfirm}
          onCancel={hideFinishTimePicker}
          // is24Hour={true}
        />
      </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    paddingVertical: 20,
  },
  backView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 14,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    // marginBottom: 20,
    color: '#343a40',
  },
  details: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#212529',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: '#6c757d',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  sendButton: {
    backgroundColor: '#007bff',
  },
  editButton: {
    backgroundColor: '#28a745',
  },
  saveButton: {
    backgroundColor: '#17a2b8',
  },
  cancelButton: {
    backgroundColor: '#ffc107',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  img: {
    height: 20,
    width: 20,
  },
});

export default MeetingDetails;