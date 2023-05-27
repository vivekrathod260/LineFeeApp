import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import jwt_decode from 'jwt-decode'

import { SafeAreaView } from 'react-native-safe-area-context'

import PageContainer from '../components/PageContainer'
import Input from '../components/Input'

import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons'

import { COLORS, FONTS, SIZES, images } from '../constants'
import { async } from 'validate.js';





const Profile = ({ navigation, route }) => {

    var inputText = ""

    const [serverURL, setServerURL] = useState("http://10.0.2.2:8000")
    const [user, setUser] = useState("User")

    useEffect(() => {
        navigation.addListener('focus', async () => {
            await AsyncStorage.getItem("server").then((value)=>{
                setServerURL(value)
            })
            await AsyncStorage.getItem("token").then((value)=>{
                AsyncStorage.setItem("user",jwt_decode(value).userName)
            })
            await AsyncStorage.getItem("user").then((value)=>{
                setUser(value)
            })
        })
    })



    const handelLogOut = () => {

        AsyncStorage.setItem("token", "NULL")
        AsyncStorage.setItem("user", "User")
        navigation.navigate('Login')
    }

    const handelJoinServer = () => {

        axios.get(inputText)
            .then(response => {
              var data = response.data.status;
              console.log(data);
              if(data=="you got correct server for line")
              {
                AsyncStorage.setItem("server",inputText)
                setServerURL(inputText)
                Alert.alert(
                    'Connected',
                    'connected to this server',
                    [
                      { text: 'OK', onPress: () => {} },
                    ]
                  );
              }
            })
            .catch(error => {
                console.log(error)
                Alert.alert(
                    'Error',
                    'Cannot connect to this server',
                    [
                      { text: 'OK', onPress: () => {} },
                    ]
                  );
            });
    }

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('CreateQueue')}
                    style={{
                        height: 44,
                        width: 44,
                        borderRadius: 4,
                        backgroundColor: COLORS.secondaryWhite,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h4 }}>Profile</Text>
            </View>
        )
    }

    function renderProfile() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    marginVertical: 22,
                }}
            >
                <Image
                    source={images.user3}
                    resizeMode="contain"
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: SIZES.padding,
                    }}
                />
                {user && <Text style={{ ...FONTS.h1, marginTop: 24, color:COLORS.primary }}>{user}</Text>}

            </View>
        )
    }

    function serverCard() {
        return (
            <View
                style={{
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: SIZES.padding,
                    padding: 10,
                    marginVertical: 10
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
                        id="fullName"
                        onInputChanged={(propId, value)=>inputText=value}
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
                        onPress={() => {handelJoinServer()}}
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

    function renderOptions() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    marginVertical: 23
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 12,
                    }}
                    onPress={() => {navigation.navigate("NearbyPlaces")}}
                >
                    <AntDesign name="find" size={24} color={COLORS.primary} />
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginLeft: 24,
                        }}
                    >
                        Find Nearby Places
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 12,
                    }}
                    onPress={() => {handelLogOut()}}
                >
                    <AntDesign name="logout" size={24} color={COLORS.primary} />
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginLeft: 24,
                        }}
                    >
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ marginHorizontal: 22, justifyContent:"flex-start" }}>
                    {renderHeader()}
                    {/* <ScrollView> */}
                        <View style={{height:800}}>
                            {renderProfile()}
                            {serverCard()}
                            {renderOptions()} 
                        </View>
                    {/* </ScrollView> */}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Profile
