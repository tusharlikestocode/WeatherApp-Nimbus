import React, { useState } from 'react'
import { StyleSheet, Text, View,TextInput,Button,Alert,Pressable,ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const S3 = ({navigation})=>{

  const { temperature,humidity,wind } = useSelector((state) => state.reducer.message);
 
return(
<View style={styles.layout}>
  <Text style={styles.title}>
    Current Temperature :{temperature}°C {'\n'} 
    Humidity:{humidity}% {'\n'} 
    Wind Speed:{wind}mph 
    </Text>
 <Button
 title='Back'
 onPress={()=>{
    navigation.navigate('Nimbus')
 }}/>
</View>
  
  
  );
}

export default S3
const styles = StyleSheet.create({
    layout: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      
      
    },
    title: {
      fontSize: 32,
      marginBottom: 16,
      color:'black',
      textAlign:'center',
      justifyContent:'center',
      margin:5
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
  
    }
  
  });