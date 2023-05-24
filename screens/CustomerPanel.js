import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { SafeAreaView } from 'react-native-safe-area-context'

import PageContainer from '../components/PageContainer'
import Button from '../components/Button'
import Input from '../components/Input'

import {MaterialIcons} from '@expo/vector-icons'

import { COLORS, FONTS, SIZES, images } from '../constants'
import MyJoinedQueues from './MyJoinedQueues';





const CustomerPanel = ({ navigation, route }) => {


    const [data, setData] = useState({})
    const [queueName, setQueueName] = useState("")
    const [creatorID, setCreatorID] = useState("")
    const [serverURL, setServerURL] = useState("http://10.0.2.2:8000")
    const [token, setToken] = useState("NULL")
    

    useEffect(() => {
        navigation.addListener('focus', async () => {
            var x = ""
            var y = ""
            await AsyncStorage.getItem("server").then((value)=>{
                setServerURL(value)
            })
            await AsyncStorage.getItem("JQqueueName").then((value)=>{
                x = value
                setQueueName(value)
            })
            await AsyncStorage.getItem("JQcreatorname").then((value)=>{
                y = value
                setCreatorID(value)
            })
            await AsyncStorage.getItem("token").then((value)=>{
                setToken(value)
                axios.post(
                    serverURL + '/customerpanel', 
                    {
                        creatorID: y,
                        queueName: x
                    }, 
                    {
                        headers: {
                            'Authorization': `JWT ${value}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        var status = response.data.status;
                        if(status=="ok")
                        {
                            setData(response.data.data)
                            console.log(response.data.data.myIndx)
                        }
                        else
                        {
                            Alert.alert(
                                'Error',
                                status,
                                [
                                { text: 'OK', onPress: () => {navigation.navigate('MyJoinedQueues')} },
                                ]
                            );
                        }
                    })
                    .catch(error => {
                        Alert.alert(
                            'Error',
                            'Cannot get queue details',
                            [
                            { text: 'OK', onPress: () => {navigation.navigate('MyJoinedQueues')} },
                            ]
                        );
        
                    });
            })
            
        })

    })


    const handelExit = () => {
        var value = token
        axios.post(
            serverURL + '/exitqueue', 
            {
                queueName: queueName,
                creatorID: creatorID
            }, 
            {
                headers: {
                    'Authorization': `JWT ${value}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                var status = response.data.status;
                if(status=="exited from queue !")
                {
                    Alert.alert(
                        'Success',
                        "successfully exited from queue",
                        [
                        { text: 'OK', onPress: () => {navigation.navigate('MyJoinedQueues')} },
                        ]
                    );
                }
                else
                {
                    Alert.alert(
                        'Error',
                        status,
                        [
                        { text: 'OK', onPress: () => {navigation.navigate('MyJoinedQueues')} },
                        ]
                    );
                }
            })
            .catch(error => {
                Alert.alert(
                    'Error',
                    'Cannot get queue details',
                    [
                    { text: 'OK', onPress: () => {navigation.navigate('MyJoinedQueues')} },
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
                    onPress={() => navigation.navigate('MyJoinedQueues')}
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
                <Text style={{ ...FONTS.h4 }}>Customer Panel</Text>
            </View>
        )
    }


    function RenderFeatures1({ data }) {
        return (
            <View>
               <View
                    style={{
                        alignItems: 'center',
                        marginVertical: 22,
                    }}
                >
                    <Text style={{ ...FONTS.h3, marginTop: 24 }}>{queueName} - {creatorID}</Text>
                </View>




                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 22,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Your Index</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{data.myIndx}</Text>
                    </View>
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 22,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Queue Length</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{data.length}</Text>
                    </View>
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 22,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>1st Person</Text>
                        {/* <Text style={{ ...FONTS.h5 }}>1st Person</Text> */}
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{data.first}</Text>
                    </View>
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 22,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Working Speed</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{data.speed}</Text>
                    </View>
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 22,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Your Estimated Time</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{data.estTime}</Text>
                    </View>
                </View>






                <View
                    style={{
                        marginTop:80,
                    }}
                >
                    <Button
                        title="Exit Queue"
                        filled
                        style={{
                            marginTop: SIZES.padding,
                        }}
                        onPress={handelExit}
                    />
                </View>
            </View>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ marginHorizontal: 22 }}>
                    {renderHeader()}
                    <RenderFeatures1 data={data}/>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default CustomerPanel