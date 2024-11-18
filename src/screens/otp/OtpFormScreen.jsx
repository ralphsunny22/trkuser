import { ActivityIndicator, Dimensions, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import icons from '../../constants/images';

const OtpFormScreen = () => {

    const navigation = useNavigation();

    const {width, height} = Dimensions.get('screen');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberOriginalFormat, setPhoneNumberOriginalFormat] = useState('');
    const [otpToken, setOtpToken] = useState('12345678');
    const [loading, setLoading] = useState(false);

    //input change and masking
    const handleInputChange = (text) => {
        
        // Remove all non-numeric characters from the input
        const cleanedText = text.replace(/\D/g, '');

        setPhoneNumberOriginalFormat(`+1${cleanedText}`)
        //console.log('text: ', `+1${cleanedText}`); //+18066216874

        // Format the cleaned text with the desired pattern (080 123 4567)
        let formattedText = '';
        for (let i = 0; i < cleanedText.length; i++) {
        if (i === 3 || i === 6) {
            formattedText += ' '; // Add a space after the 3rd and 6th characters
        }
        formattedText += cleanedText[i];
        }

        // Set the formatted text as the phone number state
        setPhoneNumber(formattedText);
    };

    const isButtonDisabled = phoneNumber.length <= 10;

    const handlePhoneNumberVerification = async () => {
        try {
            setLoading(true)
            navigation.navigate('OtpTokenScreen');
            setLoading(false)
            // Call verifyPhoneNumber function
            // const result = await verifyPhoneNumber(phoneNumberOriginalFormat);
            // if (result && result.data.success) { 
            //   navigation.navigate('OtpToken');
            // }
            
        } catch (error) {
            // Handle error if verification fails
            console.error('Phone number verification failed:', error);
        }
    }

    return (
        <ImageBackground
            resizeMode='cover'
            style={{ 
              width:width,
              height:height
            }}
            //source={require('../../assets/bgUp.png')}
            source={icons.bgUp}
          >
        <SafeAreaView 
          style={{ 
              flex: 1, 
              //backgroundColor: "rgba(220, 220, 220, 0.4)", 
            }}
        >
        
        {/* header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerItem}>
            <Pressable
              onPress={() => {}}
            >
              <AntDesign name="arrowleft" size={24} color="#000" />
            </Pressable>
            
          </View>
          {/* <View style={styles.headerItem}><Text>Cneteer</Text></View> */}
          <View style={[styles.headerItem, styles.headerRightItem]}>
            <Pressable
              onPress={()=>navigation.navigate('LoginScreen')}
            
            >
              <Text style={{ color:"#6B4205", backgroundColor:"#FFE1B3", paddingVertical:8, paddingHorizontal:12, borderRadius:6 }}
                
              >Skip</Text>
            </Pressable>
          </View>
    
        </View>
        {/* header-end */}
    
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{...styles.container, 
              // marginTop: height * 0.121
              //paddingTop: 95
            }}>
    
            {loading && (
            <View style={styles.loadingContainer}>
                {/* #32D74B */}
                <View style={styles.loadingContent}>
                    <ActivityIndicator size='small' color="#32D74B" />
                    <View><Text style={styles.loadingText}>Processing</Text></View>
                </View>
            </View>
            )}
    
            <View 
              //style={{ backgroundColor: "red" }}
            >
              {/* text */}
              <Text style={styles.title}>Enter your mobile number to get OTP</Text>
    
              {/* form */}
              <View style={styles.inputWrapper}>
                <View style={styles.inputGroup}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <View style={styles.inputField}>
                        <View style={styles.prependText}>
                            <Text style={styles.prependTextInner}>+1</Text>
                        </View>
                      
                        <TextInput
                            style={styles.input}
                            maxLength={12}
                            placeholder="10 digit mobile number"
                            //keyboardType="phone-pad"
                            keyboardType="numeric"
                            value={phoneNumber}
                            onChangeText={(text) => handleInputChange(text)}
                        />
                    </View>
                  </View>
                </View>
              </View>
    
              {/* button */}
              
              <Pressable
                style={[styles.applyBtn, { backgroundColor: isButtonDisabled ? "#DCDCE1" : "#32D74B" }]}
                disabled={isButtonDisabled}
                //onPress={()=>verifyPhoneNumber(phoneNumberOriginalFormat)}
                onPress={handlePhoneNumberVerification}
                
              >
                {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" /> // Show spinner when loading
                ) : (
                    <Text style={[styles.applyBtnText, { color: isButtonDisabled ? "#ACACAF" : "#ffffff" }]}>Get OTP</Text>
                )}
                
              </Pressable>
    
              {/* terms of service info */}
              <View style={styles.termsAndConditions}>
                <Text style={styles.termsText}>
                    By signing up, you are creating a Truckeet account and agree to Truckeet’s 
                    <Text style={{ color:"#2F80ED" }}> Terms of service</Text> and <Text style={{ color:"#2F80ED" }}>Privacy Policy</Text>.
                </Text>
              </View>
              
              {/* already have an account */}
              <View style={{...styles.haveAccount, flexDirection:'row', justifyContent:'center', alignItems:'center', gap:5}}>
                <Text style={styles.haveAccountText}>Already have account?</Text>
                <Pressable onPress={ 
                  ()=>{
                    //await getFullGeoAddress();
                      navigation.navigate('LoginScreen')
                    
                  }}>
                    
                  <Text style={{ color:"#32D74B", fontSize:16, fontWeight:'700' }}>Login</Text>
                </Pressable>
              </View>
            </View>
    
          </View>
    
        </ScrollView>
    
         </SafeAreaView>
    
         </ImageBackground> 
      )
}

export default OtpFormScreen

const styles = StyleSheet.create({
    headerContainer: {
      height:90,
      elevation:1,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      //backgroundColor:'yellow',
      //paddingTop:15
    },
    headerItem: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      marginTop: 30,
      marginHorizontal: 10,
      
    },
    headerRightItem: {
      justifyContent:'flex-end'
    },
    //header ends
  
    container: {
      flex: 1,
      padding: 16,
      //marginTop: height 
      //backgroundColor: "red",
    },
  
    title: {
      fontSize: 28,
      fontWeight: "700",
    },
    inputWrapper: {
      position: 'relative',
      marginTop: 30,
      //paddingHorizontal: 20,
    },
    inputGroup: {
      marginTop: 10,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: "#32D74B",
      borderRadius: 10,
      marginTop: 5,
      paddingHorizontal: 15,
      backgroundColor: '#fff', // Background color for the input border
    },
    label: {
      position: 'absolute',
      top: -13,
      zIndex: 1,
      left: 20, // Adjust this based on your preference
      backgroundColor: 'white',
      paddingHorizontal: 5,
  
      color: "#32D74B",
      fontSize: 16,
      fontWeight: "500",
    },
    inputField: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    prependText: {
      borderRightWidth: 1, // Add a border to the right side
      borderRightColor: '#32D74B', // Border color
      paddingRight: 10, // Padding to separate text from border
    },
    prependTextInner: {
      color: "#32D74B",
      fontSize: 16,
      fontWeight: "500",
    },
    input: {
      flex: 1,
      paddingVertical: 15,
      paddingHorizontal: 10,
      width: "100%",
    },
  
    //button
    applyBtn: {
      marginTop: 15,
      flex: 1,
      backgroundColor: "#DCDCE1",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
      borderRadius: 10,
    },
    applyBtnText: {
      fontSize: 16,
      color: "#909DAD",
    },
  
    //terms and conditions
    termsAndConditions: {
      marginTop: 15,
      flex: 1,
      fontSize: 13,
      fontWeight: "400",
      lineHeight: 16
    },
  
    termsText: {
      color: "#ACACAF",
      fontSize: 13,
      fontWeight: "400",
      lineHeight: 16
    },
  
    //   already have an account
    haveAccount: {
        flex: 1,
        marginTop: 60
        
    },
    haveAccountText: {
        textAlign: "center",
        color: "#090B0E",
        fontSize: 16,
        fontWeight: "700"
    },
    //loading
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      flex:1,
      zIndex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent', // Semi-transparent background rgba(0, 0, 0, 0.5)
      //backgroundColor: 'red', // Semi-transparent background
    },
  
    loadingContent:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
  
        backgroundColor:'white',
        width:'50%',
        borderWidth:1,
        borderColor:'white',
        borderRadius:5,
        padding:15
    },
  
    loadingText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#090B0E"
    },
    
  })