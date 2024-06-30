import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-big-calendar';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarScreen({navigation, route}) {
  const [meetings, setMeetings] = useState([]);
  const [clientName, setClientName] = useState('');
  const [team, setTeam] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [events, setEvents] = useState([]);
  const [showMonthCalendar, setShowMonthCalendar] = useState(false);
  const [calendarMode, setCalendarMode] = useState('week');
  const [selectedDate, setSelectedDate] = useState(moment());

  

  useEffect(() => {
    // Get the current user
    const user = auth().currentUser;
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Clients')
      .onSnapshot(querySnapshot => {
        const clients = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
        });
        console.log('user', user);

        setTeam(clients);
      });

    return () => unsubscribe();
  }, []);

  console.log('teams', team);

  useEffect(() => {
    // Get the current user

    console.log('it rannn 1');
    const user = auth().currentUser;

    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Meetings')
      .onSnapshot(querySnapshot => {
        const meetings = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id, // required for FlatList
          };
        });

        setMeetings(meetings);
        const newData = meetings?.flatMap(item => {
          let clientsText = '';
          if (Array.isArray(item.clients) && item.clients.length > 0) {
            const clientNames = item.clients.map(client => client.name);
            if (clientNames.length > 2) {
              clientsText = `${clientNames[0]}, ${clientNames[1]}...`;
            } else {
              clientsText = clientNames.join(', ');
            }
          }
          console.log('clienttext', clientsText);
          console.log('clienttext', item.clients);

          return [
            {
              title: clientsText,
              start: moment(convertTimeToISO(item.date, item?.time)),
              end: moment(convertTimeToISO(item.date, item?.finishTime)),
              key: item?.key,
              clients: item.clients,
              meetingTitle: item.title,
              creator: item.creator,
            },
          ];
        });
        setEvents(newData);
      });

    return () => unsubscribe();
  }, []);

  console.log('meetings', meetings);
  console.log('eventss', events);

  const convertTimeToISO = (dateString, time) => {
    const date = moment(dateString).format('YYYY-MM-DD');
    const combinedDateTimeString = `${date} ${time}`;
    const parsedDateTime = moment(combinedDateTimeString, 'YYYY-MM-DD hh:mm A');
    const isoFormat = parsedDateTime.format('YYYY-MM-DDTHH:mm:ss');

    return isoFormat;
  };



  const event = [
    {
      title: 'Meeting',
      start: moment('2024-06-10T01:00:00'),
      end: moment('2024-06-10T03:15:00'),
    },
    {
      title: 'Coffee break',
      start: moment('2024-06-10T06:00:00'),
      end: moment('2024-06-10T06:30:00'),
    },
  ];

  const handleCellPress = value => {
    const parsedDate = moment(value);
    const date = parsedDate.format('YYYY-MM-DD');
    const startTime = parsedDate.format('hh:mm A');
    const endTime = parsedDate.add(1, 'hour').format('hh:mm A');

    console.log('date', date, 'time', startTime, 'endtime', endTime);
    navigation.replace('CreateMeetings', {
      date: date,
      startTime: startTime,
      finishTime: endTime,
    });
  };

  const handleEventPress = event => {
    console.log('eventpress', event);
    const date = moment(event.start).format('YYYY-MM-DD');
    const startTime = moment(event.start).format('hh:mm A');
    const endTime = moment(event.end).format('hh:mm A');
    console.log('date', date, 'start', startTime, 'end', endTime);
    const meeting = {
      date: date,
      time: startTime,
      finishTime: endTime,
      clients: event.clients,
      key: event.key,
      title: event.meetingTitle,
      creator: event.creator,
    };
    navigation.navigate('MeetingDetails', {
      meeting,
    });
  };

  const handleSwipe = month => {
    console.log('props', moment(month).format(''));
    const newMonth = moment(month).format('MMMM');
    if (newMonth !== currentMonth) {
      setCurrentMonth(newMonth);
      console.log('Updated current month to:', newMonth);
    } else {
      console.log('Current month remains:', currentMonth);
    }
  };

  const handleMonthPress = () => {
    setCurrentMonth(moment().format('MMMM'));
    setShowMonthCalendar(!showMonthCalendar);
  };

  const handleMonthCalendarDateSelect = date => {
    setSelectedDate(date);
    setShowMonthCalendar(false);
    setCalendarMode('week');
  };

  return (
    <SafeAreaView style={{flex: 1, paddingTop: 10, backgroundColor: 'white'}}>
      <View style={styles.headerView}>
        
        <Text style={styles.headerTitle}>Calendar</Text>
        <View style={styles.monthSelector}>
          <TouchableOpacity
            style={styles.monthButton}
            onPress={handleMonthPress}>
            <Text style={styles.monthButtonText}>{currentMonth}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showMonthCalendar && (
        <View style={styles.monthCalendarContainer}>
          <Calendar
            events={[]}
            height={300}
            showAdjacentMonths={false}
            mode={'month'}
            bodyContainerStyle={styles.monthBodyContainerStyle}
            onPressCell={handleMonthCalendarDateSelect}
            onSwipeEnd={handleSwipe}
            headerContainerStyle={styles.monthHeaderContainerStyle}
            weekContainerStyle={styles.weekContainerStyle}
            dateCellStyle={styles.dateCellStyle}
          />
        </View>
      )}
      <View style={{flex: 1}}>
        <Calendar
          events={events}
          height={600}
          ampm={true}
          date={selectedDate}
          onPressEvent={handleEventPress}
          swipeEnabled={true}
          onPressCell={handleCellPress}
          calendarContainerStyle={styles.containerStyle}
          bodyContainerStyle={styles.bodyContainerStyle}
          mode={calendarMode}
          headerContainerStyle={styles.headerContainerStyle}
          showWeekNumber={true}
          onSwipeEnd={handleSwipe}
          weekNumberPrefix="Week"
          allDayEventCellStyle={styles.allDayEventCellStyle}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {},
  headerContainerStyle: {
    // backgroundColor: 'white',
    height: 70,
  },
  headerView: {
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    color: 'black',
    fontSize: 24,
  },
  bodyContainerStyle: {
    // backgroundColor: 'white',
  },
  monthButtonText: {
    fontSize: 16,
    color: 'gray',
  },
  monthCalendarContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  monthBodyContainerStyle: {
    // backgroundColor: 'white',
    // borderRadius: 10,
    // padding: 5,
  },
  monthHeaderContainerStyle: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  weekContainerStyle: {
    backgroundColor: '#e0e0e0',
  },
});