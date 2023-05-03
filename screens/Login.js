import React, { useCallback, useReducer, useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import Button from '../components/Button'
import Input from '../components/Input'

import PageContainer from '../components/PageContainer'

import { SafeAreaView } from 'react-native-safe-area-context'

import { COLORS, images, FONTS, SIZES } from '../constants'

import { MaterialIcons, FontAwesome } from '@expo/vector-icons'




const Login = ({ navigation, route }) => {

    var serverURL = route.params.serverURL

    
    var username= ""
    var password =""
    const [token, setToken] = useState("NULL")

    useEffect(() => {

        AsyncStorage.getItem("token").then((value)=>{
            if(value==null)
            {
                AsyncStorage.setItem("token","NULL")
                setToken("NULL")
            } else if(value=="NULL")
            {
                
            }
            else
            {
                setToken(value)
            }
        })
        .catch(
            ()=>console.log("token not found in asyncstorage")
        )

    }, [])

    const handelLogin = () => {

        console.log(username+" "+password)

        axios.post(
            serverURL + '/login', 
            {
                userName: username,
                password: password
            }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data)
                if(response.data.status=="ok")
                {
                    var jwtToken = response.data.token;
    
                    AsyncStorage.setItem("token",jwtToken)
    
                    navigation.navigate('BottomTabNavigation',{serverURL:serverURL,token:jwtToken})

                    setToken(jwtToken);
                }
                else {
                    Alert.alert(
                        'Error',
                        response.data.status,
                        [
                        { text: 'OK', onPress: () => {} },
                        ]
                    );
                }
            })
            .catch(error => {
                console.error(error);
                Alert.alert(
                    'Error',
                    "cannot connect to login",
                    [
                    { text: 'OK', onPress: () => {} },
                    ]
                );
            });
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <PageContainer>
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
                            marginVertical: 48,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h1, color: COLORS.primary }}>
                            LINE
                        </Text>
                        <Text
                            style={{
                                ...FONTS.h1,
                                color: COLORS.black,
                                marginHorizontal: 8,
                            }}
                        >
                            FREE
                        </Text>
                    </View>
                        
                    <View style={{ marginVertical: 20 }}>
                        <Input
                            icon="person"
                            iconPack={MaterialIcons}
                            id="username"
                            onInputChanged={(propsID, value)=>username=value}
                            placeholder="Enter your Username"
                            keyboardType="email-address"
                        />
                        <Input
                            icon="lock"
                            iconPack={FontAwesome}
                            id="password"
                            onInputChanged={(propsID, value)=>password=value}
                            autoCapitalize="none"
                            placeholder="Enter your password"
                            secureTextEntry
                        />
                    </View>
                    <Button
                        title="LOGIN"
                        filled
                        onPress={() => handelLogin()}
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
                            Don't have an account ?{' '}
                        </Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register',{serverURL:serverURL})}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.primary,
                                }}
                            >
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Login
