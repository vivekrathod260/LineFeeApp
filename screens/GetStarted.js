import { React, useCallback, useEffect, useReducer, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

import PageContainer from '../components/PageContainer'

import Input from '../components/Input'

import { images, COLORS, FONTS, SIZES } from '../constants'

import Button from '../components/Button'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import {FontAwesome} from '@expo/vector-icons'



const GetStarted = ({ navigation, route }) => {

    
    var textInput = ""
    const [serverURL, setServerURL] = useState("http://10.0.2.2:8000")



    useEffect(() => {
        AsyncStorage.getItem("server").then((value)=>{
            setServerURL(value)
        })

    }, [])

    const handelJoinServer = () => {

        axios.get(textInput)
            .then(response => {
              const data = response.data.status;
              console.log(data);
              if(data=="you got correct server for line")
              {
                AsyncStorage.setItem("server",textInput)
                setServerURL(textInput)
                url = textInput
                Alert.alert(
                    'Connected',
                    'connected to '+textInput,
                    [
                      { text: 'OK', onPress: () => {} },
                    ]
                  );
              }
            })
            .catch(error => {
                Alert.alert(
                    'Error',
                    'Cannot connect to this server',
                    [
                      { text: 'OK', onPress: () => {} },
                    ]
                  );
                console.log(textInput+" Axios Network error")

            });
    }


    function ServerCard() {
        return (
            <View
                style={{
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: SIZES.padding,
                    padding: 10,
                    marginVertical: 10,
                    width: '100%',
                    marginBottom: SIZES.padding,
                }}
            >
                <View>
                    <Text
                        style={{
                            ...FONTS.body2,
                            fontWeight: 'bold',
                            color: COLORS.secondaryBlack,
                            textAlign: 'left'
                        }}
                    >
                        Current Server
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body4,
                            color: COLORS.primary,
                            textAlign: 'left',
                            marginBottom :10,
                        }}
                    >
                        {serverURL}
                    </Text>
                    <Input
                        icon="server"
                        style={{
                            backgroundColor: COLORS.primary,
                            width: 150,
                            height: 40,
                            borderRadius: SIZES.padding,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop:10,
                
                        }}
                        iconPack={FontAwesome}
                        id="serverURL"
                        onInputChanged={(propsID, value)=>textInput=value}
                        placeholder="Enter Server Name"
                        />
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handelJoinServer()}
                        style={{
                            backgroundColor: COLORS.primary,
                            width: 150,
                            height: 40,
                            borderRadius: SIZES.padding,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop:10,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.body4,
                                color: COLORS.white,
                            }}
                        >
                            Join
                        </Text>
                        
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ScrollView>
                    <View
                        style={{
                            flex: 1,
                            marginHorizontal: 22,
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={images.logo}
                            style={{
                                // tintColor: COLORS.primary,
                                marginTop: 20,
                                marginBottom:0,
                                height:200,
                                flex:1,
                                resizeMode:"contain"
                            }}
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ ...FONTS.h1, color: COLORS.primary }}>
                                Line
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.h1,
                                    color: COLORS.black,
                                    marginHorizontal: 8,
                                }}
                            >
                                Free
                            </Text>
                        </View>

                        {/* ############*/}
                        <ServerCard/>
                        {/* ########### */}

                        <View style={{width:"100%", marginTop:70, marginBottom:10}}>
                            <Button
                                title="LOGIN"
                                onPress={() => navigation.navigate('Login')}
                                style={{
                                    width: '100%',
                                    marginBottom: SIZES.padding,
                                }}
                            />
                            <Button
                                title="REGISTER"
                                onPress={() => navigation.navigate('Register')}
                                filled
                                style={{
                                    width: '100%',
                                }}
                            />
                        </View>
                    </View>                    
                </ScrollView>

            </PageContainer>
        </SafeAreaView>
    )
}

export default GetStarted
