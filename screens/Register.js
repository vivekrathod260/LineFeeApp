import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useReducer } from 'react'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { FONTS, COLORS, SIZES, images } from '../constants'
import { MaterialIcons, FontAwesome, Fontisto } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'


const Register = ({ navigation, route }) => {

    var serverURL = route.params.serverURL

    var username = ""
    var fname = ""
    var lname = ""
    var email = ""
    var password1 = ""
    var password2 = ""


    const handelRegister = () => {
        if(password1!=password2)
        {
            Alert.alert(
                "Password dosen't match",
                'Try again',
                [
                  { text: 'OK', onPress: () => {} },
                ]
              );
        } 
        else
        {
            console.log(username+" "+password1)
            axios.post(
                serverURL + '/register', 
                {
                    userName: username,
                    password: password1
                }, 
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                })
                .then(response => {
                    var status = response.data.status;
                    console.log(status);
                    if(status="User created")
                        navigation.navigate('Login',{serverURL:serverURL})
                    else {
                        Alert.alert(
                            'Error',
                            status,
                            [
                            { text: 'OK', onPress: () => {} },
                            ]
                        );
                    }

                })
                .catch(error => {
                    Alert.alert(
                        'Error',
                        'Cannot connect register',
                        [
                        { text: 'OK', onPress: () => {} },
                        ]
                    );
                    console.error(error);
                });
        }
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
                            resizeMode="contain"
                            style={{
                                tintColor: COLORS.primary,
                                marginVertical: 22,
                            }}
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{ ...FONTS.h1, color: COLORS.primary }}
                            >
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

                        <View style={{ marginVertical: 20 }}>
                            <Input
                                icon="person"
                                iconPack={MaterialIcons}
                                id="userName"
                                onInputChanged={(propId, value)=>{username=value}}
                                placeholder="Enter username"
                            />
                            <Input
                                icon="person"
                                iconPack={MaterialIcons}
                                id="fname"
                                onInputChanged={(propId, value)=>{fname=value}}
                                placeholder="Enter First Name"
                                keyboardType="email-address"
                            />
                            <Input
                                icon="person"
                                iconPack={MaterialIcons}
                                id="lname"
                                onInputChanged={(propId, value)=>{lname=value}}
                                placeholder="Enter last Name"
                                keyboardType="email-address"
                            />
                            <Input
                                icon="email"
                                iconPack={MaterialIcons}
                                id="email"
                                onInputChanged={(propId, value)=>{email=value}}
                                placeholder="Enter your E-mail"
                            />

                            <Input
                                icon="lock"
                                iconPack={MaterialIcons}
                                id="pass"
                                onInputChanged={(propId, value)=>{password1=value}}
                                placeholder="Enter Password"
                                secureTextEntry
                            />

                            <Input
                                icon="lock"
                                iconPack={MaterialIcons}
                                id="confirmPass"
                                onInputChanged={(propId, value)=>{password2=value}}
                                placeholder="Confirm Password"
                                secureTextEntry
                            />
                        </View>
                        <Button
                            title="REGISTER"
                            filled
                            onPress={() => handelRegister()}
                            style={{
                                width: '100%',
                            }}
                        />

                        <View
                            style={{
                                marginVertical: 20,
                                flexDirection: 'row',
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.black,
                                }}
                            >
                                Already have an account ?{' '}
                            </Text>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login',{serverURL:serverURL})}
                            >
                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: COLORS.primary,
                                    }}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Register
