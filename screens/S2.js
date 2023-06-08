import React, { useState } from 'react'
import { StyleSheet, Text, View,TextInput,Button,Alert,Pressable } from 'react-native';
import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import  {storage}  from "../firebase/firebaseConfig";
import { Linking } from 'react-native';
import DocumentPicker from 'react-native-document-picker';import { useDispatch, useSelector } from 'react-redux';


const S2 = ({navigation})=>{
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [url,setUrl]=useState('');
  const [fileResponse,setFileResponse]=useState([])
  const  handleUpload = async ()=> {
    if (!fileResponse) {
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
      ])      }
      const file = fileResponse[0].uri
      const response=await fetch(file);
      const blob =await response.blob();
    const storageRef = ref(storage,`/files/${fileResponse.name}`)
    const uploadTask = uploadBytesResumable(storageRef, blob);
 
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
 
            // update progress
            setPercent(percent);
        },
        (err) => console.log(err),
        () => {
            // download url
        
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL)
                Alert.alert('Upload Complete','File has been uploaded to firestore',[
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
                console.log(uploadUrl)
           

})
.catch((error) => {
  // Handle any errors
});
        }
    ); 
}
  
  return(
    <View style={styles.layout}>
    <Pressable>
     <Text style={[styles.title]}
     onPress={() => Linking.openURL(`${url}`)}
     >
     {url}
     </Text>
     </Pressable>
           <Button title="Select Files"  onPress={ async ()=>{
             try{
               const pickerResult =await DocumentPicker.pickSingle({
                 presentationStyle:'fullScreen',
                 copyTo:'cachesDirectory'
               })
               setFileResponse([pickerResult])
               
   
             }catch(e){
               handleError(e);
             }
           }} />
           <Text>{'/nd'}</Text>
            <Button title="Upload"    onPress={handleUpload} />
            <Text>{'/nd'}</Text>
            {/* <Button title="Back"    onPress={()=>{
              navigation.navigate('Screen1')
            }} /> */}

     </View>
  );
 
 
}
  

   

export default S2
const styles = StyleSheet.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 15,
      margin: 16,
      color:'black',
      textAlign:'center',
      justifyContent:'center',
      color:'blue'
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
  
    },selectButton:{
      marginBottom:50,
      padding:20
    }
    ,uploadButton:{
      marginTop:20
    }
  
  });