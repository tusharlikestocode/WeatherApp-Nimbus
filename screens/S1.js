import React, {  useState,useCallback   } from 'react'
import { StyleSheet, Text, View,TextInput,Button,Alert,Pressable,ScrollView,ImageBackground } from 'react-native';
import axios from 'axios';
import  DocumentPickerOptions  from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setTemp } from '../store/messageSlice';

const S1 = ({ navigation })=>{
    const dispatch = useDispatch();
    const [locate,setLocation]=useState("");
const [fileResponse,setFileResponse]=useState([])
    const { temperature,humidity,location,date,wind } = useSelector((state) => state.reducer.message);
    const [currentTemp,setCurrentTemp]=useState('null');
    const [currentHumidity,setHumidity]=useState('null');
    const [wmph,setwmph]=useState('null');
    const d=new Date();
    const handleDocumentSelection = useCallback(async () => {
      try {
        const response = await DocumentPickerOptions.pick({
          presentationStyle: 'fullScreen',
        });
        setFileResponse(response);
      } catch (err) {
        console.warn(err);
      }
    }, []);
    const data ={
      temperature:currentTemp,
      humidity:currentHumidity,
      wind:wmph,
      location:locate,
      date:d.toString()
    }
    const getWeather = async () => {
      
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: {q: locate},
            headers: {
              'X-RapidAPI-Key': '0e5e93959fmsh75f266417b19520p1ba5cdjsnc5923ce3a50b',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        axios
          .request(options)
          .then(function (response) {
            const {current}=response.data;
            setCurrentTemp(current.temp_c)
            setHumidity(current.humidity);
            setwmph(current.wind_mph);
            dispatch(setTemp(data));

        })
          .catch(function (error) {
            console.error(error);
            Alert.alert('Invalid Input','Please try again with valid input',[
              {text:'Cancel',
            onPress:()=>{
              console.log('Cancel Pressed')
            },
            style:'cancel'
          },{
            text:'OK',
            onPress:()=>{
              console.log('OK Pressed');
            },

          }
            ])
          });
          };

  return (
    <ScrollView>
     <View style={ styles.layout }>
      <Text style={styles.title}>Enter your Location(City)</Text>

      <TextInput
      style={styles.input}
      placeholder='Your Name'
      value={locate}
      onChangeText={(locate)=>{setLocation(locate)}}
      />

      <Button
      title='Get Current Weather'
      onPress={() =>{
        getWeather(locate);
        
        navigation.navigate('Convert');
      } }
      />
        </View>

      <View style={styles.recent}>
        <Text style={styles.recentHeader}>Last Checked:</Text>
        <Text style={styles.recentText}>
          
          Location:{location}{'\n'}
          Temperature:{temperature}°C{'\n'}
          Humidity:{humidity}%{'\n'}
          Wind:{wind}mph{'\n'}
          Time:{date}



        </Text>
      </View>
      <View>
      {fileResponse.map((file, index) => (
        <Text
        key={index.toString()}
        style={styles.uri}
        numberOfLines={1}
        ellipsizeMode={'middle'}>
          
          {file?.uri}
        </Text>
      ))}
            <Button title="Select 📑" onPress={handleDocumentSelection} />
      </View>
      
      
  
    </ScrollView>
   
    
  
  
    
  );
  }

export default S1
const styles = StyleSheet.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      marginBottom: 16,
      color:'black',
      textAlign:'center',
      justifyContent:'center',
    },
    modal:{
      flex:1,
      justifyContent:'center',
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
    input:{
      width:250,
      borderColor:'black',
      borderWidth:1,
      padding:5,
      margin:5,
      textAlign:'center',
      color:'black'
      
    },
    closeButton:{
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor:'red',
      color:'white',
      width:100,
      textAlign:"center",
      fontSize:20
  
    },recent:{
      borderColor:'blue',
      borderWidth:2,
      margin:10,
      borderRadius:10,
      marginTop:40,
      


    },recentHeader:{
      backgroundColor:'blue',
      textAlign:'left',
      fontSize:30,
      color:'white',
      fontWeight:'500',
      padding:10
      
      
      
    },
    recentText:{
      textAlign:'left',
      fontSize:25,
      fontStyle:'italic',
      padding:10,


      
    },
    uri:{
      textAlign:'left',
      fontSize:25,
      fontStyle:'italic',
      padding:10,
      color:'black'
    }
  
  });
