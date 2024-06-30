import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const images = [
  require('../instructionimages/first1.png'),
  require('../instructionimages/second1.png'),
  require('../instructionimages/i44.png'),
  require('../instructionimages/i3new1.png'),
  require('../instructionimages/cockpit-checks-11.png'),
  require('../instructionimages/mirrors1new.png'),
  require('../instructionimages/mirrors2new1.png'),
  require('../instructionimages/gearsnew.png'),
  require('../instructionimages/automaticgearsnew.png'),
  require('../instructionimages/pedalsnew.png'),
  require('../instructionimages/pedals-2new.png'),
  require('../instructionimages/pedals-brakenew.png'),
  require('../instructionimages/steeringnew.png'),
  require('../instructionimages/givingsignalsnew.png'),
  require('../instructionimages/MovingOfffnew.png'),
  require('../instructionimages/MovingOff2new1.png'),
  require('../instructionimages/PullingLeftnew.png'),
  require('../instructionimages/PullingLeft2new.png'),
  require('../instructionimages/EmergingLeftnew1.png'),
  require('../instructionimages/EmergingLeft2new.png'),
  require('../instructionimages/EmergingRightnew.png'),
  require('../instructionimages/EmergingRight2new.png'),
  require('../instructionimages/TurningLeftnew.png'),
  require('../instructionimages/TurningLeft2new1.png'),
  require('../instructionimages/TurningRightnew1.png'),
  require('../instructionimages/TurningRight2new1.png'),
  require('../instructionimages/otherjunctionsnew1.png'),
  require('../instructionimages/CrossRoadsnew1.png'),
  require('../instructionimages/OtherCrossroadsnew1.png'),
  require('../instructionimages/TrafficLightsnew1.png'),
  require('../instructionimages/TrafficLights2new1.png'),
  require('../instructionimages/TrafficLights3new1.png'),
  require('../instructionimages/Roundaboutsnew1.png'),
  require('../instructionimages/Roundaboutsleftnew1.png'),
  require('../instructionimages/RoundAheadnew1.png'),
  require('../instructionimages/RoundRightnew1.png'),
  require('../instructionimages/RoundSpiralnew1.png'),
  require('../instructionimages/RoundTrafficnew1.png'),
  require('../instructionimages/MiniRoundnew1.png'),
  require('../instructionimages/MiniRound2new1.png'),
  require('../instructionimages/OneWayStreetnew1.png'),
  require('../instructionimages/OneWayStreet2new1.png'),
  require('../instructionimages/Zebranew1.png'),
  require('../instructionimages/LightControllednew1.png'),
  require('../instructionimages/DualCarrnew1.png'),
  require('../instructionimages/DualCarr2new1.png'),
  require('../instructionimages/Motorwaysnew1.png'),
  require('../instructionimages/ruralnew1.png'),
  require('../instructionimages/TurningRoadsnew1.png'),
  require('../instructionimages/LeftReversenew1.png'),
  require('../instructionimages/PullRightnew1.png'),
  require('../instructionimages/Forwardnew1.png'),
  require('../instructionimages/Reversenew12.png'),
  require('../instructionimages/ParallelPark1.png'),
];

const imageNames = [
  'Basic Procedures- Part-1',
  'Basic Procedures- Part-2',
  'Controls',
  'Cockpit Checks-Part-1',
  'Cockpit Checks-Part-2',
  'Mirrors Part-1',
  'Mirrors Part-2',
  'Gears',
  'Automatic Gears',
  'Pedals-Clutch Part-1',
  'Pedals-Clutch Part-2',
  'Pedals-Accelerator & Brake',
  'Steering & Parking Brake',
  'Giving Signals',
  'Moving Off Part-1',
  'Moving Off Part-2',
  'Pulling Up On The Left Part-1',
  'Pulling Up On The Left Part-2',
  'Emerging Left Part-1',
  'Emerging Left Part-2',
  'Emerging Right Part-1',
  'Emerging Right Part-2',
  'Turning Left Part-1',
  'Turning Left Part-2',
  'Turning Right Part-1',
  'Turning Right Part-2',
  'Other Junctions',
  'Crossroads',
  'Other Crossroads',
  'Traffic Lights Part-1',
  'Traffic Lights Part-2',
  'Traffic Lights Part-3',
  'Roundabouts',
  'Roundabouts- Left',
  'Roundabouts- Ahead',
  'Roundabouts- Right',
  'Roundabouts- Spiral',
  'Roundabouts with Traffic Lights',
  'Mini Roundabouts Part-1',
  'Mini Roundabouts Part-2',
  'One Way Streets Part-1',
  'One Way Streets Part-2',
  'Zebra Crossings',
  'Light Controlled Crossings',
  'Dual Carriageways Part-1', 
  'Dual Carriageways Part-2', 
  'Motorways',
  'Rural Roads',
  'Turn In The Road',
  'Left Reverse',
  'Pull Up On The Right And Reverse',
  'Forward Bay Park',
  'Reverse Bay Park',
  'Parallel Park',
 ,
];

export default function InstructionScreen() {
  const [search, setSearch] = useState('');
  const scrollRef = useRef();
  const refs = imageNames.reduce((acc, value) => {
    acc[value] = React.createRef();
    return acc;
  }, {});

  useEffect(() => {
    const index = parseInt(search);
    if (!isNaN(index) && index >= 1 && index <= imageNames.length) {
      refs[imageNames[index - 1]].current.measure((x, y, width, height, pageX, pageY) => {
        scrollRef.current.scrollTo({ y: pageY });
      });
    } else if (refs[search]) {
      refs[search].current.measure((x, y, width, height, pageX, pageY) => {
        scrollRef.current.scrollTo({ y: pageY });
      });
    }
  }, [search]);

  return (
    <SafeAreaView>
      <ScrollView ref={scrollRef} style={{ padding: 20, backgroundColor:'#e6fbff' }}>
        <View style={{backgroundColor:'white', marginBottom:15}}>
          <Text style={{ fontSize: 24, marginBottom: 20, alignSelf:'center', fontWeight:'bold', color:'black' }}>
            Instruction Diagrams
          </Text>
        
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 0.5,
              color:'black',
              marginBottom: 20,
              borderRadius: 20,
              paddingLeft: 10,
              shadowColor: '#FFF',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 7,
            }}
            onChangeText={text => setSearch(text)}
            value={search}
            placeholder="Type 'Index Number' of Instruction Diagram to search"
            placeholderTextColor='gray'
          />

          <Text style={{ fontSize: 20, marginBottom: 20, alignSelf:'center', fontWeight:'bold', color:'black' }}>Index</Text>
        
          <View style={{ marginBottom: 40 }}>
            {imageNames.map((name, index) => (
              <Text style={{ color:'black' }} key={index}>{`${index + 1}. ${name}`}</Text>
            ))}
          </View>
        </View>

        {images.map((image, index) => (
          <View ref={refs[imageNames[index]]} key={index} style={{ marginBottom: 20, padding: 5, borderRadius: 10, backgroundColor:'white' }}>
            <Text style={{ fontSize: 20, alignSelf: 'center', marginBottom: 15, marginTop: 15, color:'black' }}>
              {imageNames[index]}
            </Text>
            <Image source={image} style={{ width: '100%', height: 450 }} resizeMode='cover' onError={(e) => console.log(`Failed to load image at index: ${index}, name: ${imageNames[index]}`, e.nativeEvent.error)} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}