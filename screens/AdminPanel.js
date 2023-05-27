import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import Button from '../components/Button'
import Input from '../components/Input'

import {MaterialIcons} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, images } from '../constants'




const AdminPanel = ({ navigation, route }) => {
    
    const [data, setData] = useState({})
    const [serverURL, setServerURL] = useState("http://10.0.2.2:8000")
    const [token, setToken] = useState("")
    const [queueName, setQueueName] = useState("")

    useEffect(() => {
        navigation.addListener('focus', async () => {
            var apqn = ""
            await AsyncStorage.getItem("server").then((value)=>{
                setServerURL(value)
            })
            AsyncStorage.getItem("APqueuename").then((value)=>{
                apqn = value
                setQueueName(value)
            })
            await AsyncStorage.getItem("token").then((value)=>{
                setToken(value)
                axios.post(
                    serverURL + '/adminpanel', 
                    {
                        queueName: apqn
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
                        }
                        else
                        {
                            Alert.alert(
                                'Error',
                                status,
                                [
                                { text: 'OK', onPress: () => {navigation.navigate('ManageQueue')} },
                                ]
                            );
                        }
                    })
                    .catch(error => {
                        Alert.alert(
                            'Error',
                            'Cannot get queue details',
                            [
                            { text: 'OK', onPress: () => {navigation.navigate('ManageQueue')} },
                            ]
                        );
        
                    });
            })
            
        })

    })





    const handelPop = () => {

        Alert.alert(
            'Alert',
            'POP '+data.first+" ?",
            [
                {
                    text: 'Cancel',
                    onPress: () => {return},
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => {} }
            ]
        );

        str = token
        axios.post(
            serverURL + '/pop', 
            {
                queueName: queueName
            }, 
            {
                headers: {
                    'Authorization': `JWT ${str}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                var status = response.data.status;
    
                if(status!="work done")
                {
                    Alert.alert(
                        'Error',
                        status,
                        [
                            { text: 'OK', onPress: () => {} },
                        ]
                    );
                }
                else
                {
                    Alert.alert(
                        'Success',
                        "Popped successfully",
                        [
                            { text: 'OK', onPress: () => {navigation.navigate("ManageQueue")} },
                        ]
                    );
                }
            })
            .catch(error => {
    
                Alert.alert(
                    'Error',
                    'Cannot get queue details',
                    [
                      { text: 'OK', onPress: () => {} },
                    ]
                );
    
            });
    }

    const handelDelete = () => {
        var value = token
        axios.post(
            serverURL + '/deletequeue', 
            {
                queueName: queueName
            }, 
            {
                headers: {
                    'Authorization': `JWT ${value}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                var status = response.data.status;
                if(status=="queue deleted !")
                {
                    Alert.alert(
                        'Success',
                        "Queue deleted successfully",
                        [
                        { text: 'OK', onPress: () => {navigation.navigate('ManageQueue')} },
                        ]
                    );
                }
                else
                {
                    Alert.alert(
                        'Error',
                        status,
                        [
                        { text: 'OK', onPress: () => {navigation.navigate('AdminPanel')} },
                        ]
                    );
                }
            })
            .catch(error => {
                Alert.alert(
                    'Error',
                    'Cannot get queue details',
                    [
                    { text: 'OK', onPress: () => {navigation.navigate('ManageQueue')} },
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
                    onPress={() => navigation.navigate('ManageQueue')}
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
                <Text style={{ ...FONTS.h4 }}>Admin Panel</Text>
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
                        backgroundColor: COLORS.primary,
                        // borderRadius:10,
                        paddingBottom:15,
                    }}
                >
                    <Text style={{ ...FONTS.body2, marginTop: 24,color:COLORS.white  }}>{queueName} - You</Text>
                </View>

                


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ flex: 1, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 0, backgroundColor: '#2A2F4F' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Queue Length</Text>
                            <Text style={{ fontSize: 14, color: 'white' }}>{data.length}</Text>
                        </View>
                        <View style={{ flex: 1, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 0, backgroundColor: '#917FB3' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>1st Index</Text>
                            <Text style={{ fontSize: 14, color: 'white' }}>{data.first}</Text>
                        </View>
                        <View style={{ flex: 1, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 0, backgroundColor: '#E5BEEC' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Working Speed</Text>
                            <Text style={{ fontSize: 14, color: 'white' }}>{data.speed}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 0, backgroundColor: '#19376D' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Estimated Time to empty</Text>
                            <Text style={{ fontSize: 14, color: 'white' }}>{data.estTimeToEmpty} min</Text>
                        </View>
                        <View style={{ flex: 1, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 0, backgroundColor: '#576CBC' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Null</Text>
                            <Text style={{ fontSize: 14, color: 'white' }}>Null</Text>
                        </View>
                        <View style={{ flex: 1, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 0, backgroundColor: '#A5D7E8' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Null</Text>
                            <Text style={{ fontSize: 14, color: 'white' }}>Null</Text>
                        </View>
                    </View>
                </View>


                <View
                    style={{
                        marginTop:80,
                    }}
                >
                    <Button
                        title="POP"
                        filled
                        style={{
                            marginTop: SIZES.padding,
                        }}
                        onPress={handelPop}
                    />
                    <Button
                        title="Delete Queue"
                        filled
                        style={{
                            marginTop: SIZES.padding,
                        }}
                        onPress={handelDelete}
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
                    <ScrollView>
                        <RenderFeatures1 data={data}/>
                    </ScrollView>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default AdminPanel

