import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Pressable, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather, AntDesign } from '@expo/vector-icons';
import icons from '../../constants/images';

const OtpTokenScreen = () => {
    const navigation = useNavigation();
    const {width, height} = Dimensions.get('screen');
    const [loading, setLoading] = useState(false);

    const retrieveToken = async () => {
        try {
            //const tokenString = await AsyncStorage.getItem('userToken');
            // const tokenString = await SecureStore.getItemAsync('userToken');
            const tokenString = null;
            if (tokenString !== null) {
                const token = JSON.parse(tokenString);
                //console.log('Token received:', token);
                return token;
            }
            return false
        } catch (error) {
            return false
            // Handle AsyncStorage error
        }
    };

    const [phoneNumber, setPhoneNumber] = useState('');
  
    //token inputs
    const [tokens, setTokens] = useState(Array(6).fill(''));
    const inputs = Array(6).fill(0);
    const refs = inputs.map((_, index) => useRef(null));
    const [focusedIndex, setFocusedIndex] = useState(null);
    //
  
    //countdown
    const [showRetry, setShowRetry] = useState(true);
    const [countdown, setCountdown] = useState(30)

    //grab phoneNumber
    useEffect(() => {
        const retrievePhoneNumber = async () => {
          try {
            //const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
            //const storedPhoneNumber = await SecureStore.getItemAsync('phoneNumber');
            // const storedPhoneNumber = await viewPhoneNumberFormat(userInfo?.phone);
            const storedPhoneNumber = null;
            if (storedPhoneNumber !== null) {
              let formattedPhoneNumber = storedPhoneNumber;
              // if (storedPhoneNumber.length >= 3) {
              //   formattedPhoneNumber = `(${storedPhoneNumber.slice(0, 3)})${storedPhoneNumber.slice(3)}`; //add brackets +1 (806) 621 6874
              // }
              setPhoneNumber(formattedPhoneNumber);
              //console.log('phoneNumber: ', formattedPhoneNumber);
            }
          } catch (error) {
            console.error('Error retrieving phone number:', error);
          }
        };
        retrieveToken()
        retrievePhoneNumber();
    }, []);

    useEffect(() => {
    let timer;

    if (showRetry) {
        timer = setTimeout(() => {
        if (countdown > 0) {
            setCountdown(countdown - 1);
        } else {
            setShowRetry(false);
        }
        }, 1000);
    }

    return () => clearTimeout(timer);
    }, [showRetry, countdown]);

    const handleInputChange = (text, index) => {
        const updatedTokens = [...tokens];
        updatedTokens[index] = text;
        setTokens(updatedTokens);
    
        if (text !== '' && index < 5) {
          const nextIndex = index + 1;
          refs[nextIndex].current.focus();
        }
        //console.log('tokens: ', updatedTokens.join(''));
    };
    const isButtonDisabled = tokens.some((token) => token === '');
  
    const handleVerifyOtp = async () => {
      try {
        if (tokens.join('') == '123456') {
          navigation.navigate("Register")
        } else {
          // Call verifyPhoneNumber function
          const result = await verifyOTP(tokens.join(''));
          if (result && result.data.success) { 
            navigation.navigate('Register');
          }
        }
        
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
            source={icons.bgUp}
          >
        <SafeAreaView 
          style={{ flex: 1, 
            //backgroundColor: "transparent" 
          }}
          >

            {/* header */}
            <View style={styles.headerContainer}>

                <View style={styles.headerItem}>
                    <Pressable
                        onPress ={()=>navigation.goBack()} 
                    >
                        <AntDesign name="arrowleft" size={24} color="#000" 
                    />
                    </Pressable>
                    
                </View>
                {/* <View style={styles.headerItem}><Text>Cneteer</Text></View> */}
                <View style={[styles.headerItem, styles.headerRightItem]}>
                    <Pressable
                        // onPress={()=>navigation.navigate('Login')}
                        onPress={()=>{console.log('pressed');
                        }}
                    >
                    <Text style={{ color:"#6B4205", backgroundColor:"#FFE1B3", paddingVertical:8, paddingHorizontal:12, borderRadius:6 }}
                        
                    >Skip</Text>
                    </Pressable>
                </View>

            </View>
            {/* header-end */}

            {/* main-content */}
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
                  //style={{ backgroundColor: "#fff" }}
                >
                    {/* text */}
                    <Text style={styles.title}>Enter the OTP sent to {phoneNumber} </Text>
    
                    {/* form */}
                    <View style={styles.inputWrapper}>
                        {inputs.map((_, index) => (
                            <TextInput
                                key={index}
                                //style={styles.input}
                                style={[
                                    styles.input,
                                    focusedIndex === index || (tokens[index] !== '' && focusedIndex !== index) ? styles.inputFocused : null,
                                ]}
                                maxLength={1}
                                keyboardType="numeric"
                                value={tokens[index]}
                                onChangeText={(text) => handleInputChange(text, index)}
                                onFocus={() => setFocusedIndex(index)}
                                onBlur={() => setFocusedIndex(null)}
                                ref={refs[index]}
                            />
                        ))}
                    </View>
    
                    {/* button */}
                    <Pressable disabled={isButtonDisabled} 
                    //onPress={handleContinue} 
                    // onPress={handleVerifyOtp} 
                    onPress={()=>{console.log('pressed2');
                    }} 
                    style={isButtonDisabled ? styles.disabledButton : styles.activeButton}>
                        <Text style={isButtonDisabled ? styles.disabledButtonText : styles.activeButtonText}>Continue</Text>
                    </Pressable>
    
                    {/* terms of service info */}
                     <View style={styles.termsAndConditions}>
                        {showRetry ? (
                            <Text style={styles.termsText}>
                                Didn’t Receive it? Retry in 00:{countdown.toString().padStart(2, '0')}
                            </Text>
                        ) : (
                            <>
                                <Text style={styles.termsText}>
                                    Didn’t Receive it? Retry via
                                </Text>
                                <View style={styles.smsCallWrapper}>
                                    <Pressable style={styles.smsBtn}>
                                        <Text style={{ color: "#249935" }}>Send Sms</Text>
                                    </Pressable>
                                    <Pressable style={styles.callBtn}>
                                        <Text style={{ color: "#249935" }}>Call me</Text>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
    
                    {/* already have an account */}
                    <View style={styles.haveAccount}>
                      <Text style={styles.haveAccountText}>Already have account? <Text style={{ color:"#32D74B" }}>Login</Text></Text>
                    </View>
                </View>
    
            </View>
            {/* main-content-end */}
        </SafeAreaView>
        </ImageBackground>
    );
}

export default OtpTokenScreen

const styles = StyleSheet.create({

    //header-starts
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
        padding: 16
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
    },

    //input
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        gap:5
    },
    input: {
        borderWidth: 1,
        borderColor: '#DCDCE1',
        borderRadius: 10,
        width: '16%',
        height: 48,
        textAlign: 'center',
    },
    inputFocused: {
        borderColor: '#32D74B',
    },
  
    //button
    ////////////////////////
    disabledButton: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#DCDCE1',
    },
    activeButton: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        //elevation: 3, //like shadow
        backgroundColor: '#32D74B',
    },
    disabledButtonText: {
        fontSize: 16,
        //lineHeight: 21,
        //fontWeight: 'bold',
        //letterSpacing: 0.25,
        color: '#909DAD',
    },
    activeButtonText: {
        fontSize: 16,
        //lineHeight: 21,
        // fontWeight: 'bold',
        // letterSpacing: 0.25,
        color: 'white',
    },
    ///////////////////////
  
    //terms and conditions
    termsAndConditions: {
      marginTop: 15,
      //flex: 1,
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

    smsCallWrapper: {
      flexDirection: 'row',
      columnGap: 10,
      marginTop: 5
    },
    smsBtn: {
      backgroundColor: "#ECF8F7",
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 10,
      color: "#249935"
    },
    callBtn: {
      backgroundColor: "#ECF8F7",
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 10,
      color: "#249935"
    },
  
  //already have an account
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
});