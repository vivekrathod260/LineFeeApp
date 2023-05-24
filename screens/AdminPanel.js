import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import Button from '../components/Button'
import Input from '../components/Input'

import {MaterialIcons} from '@expo/vector-icons'
import { COLORS, FONTS, SIZES, images } from '../constants'




const AdminPanel = ({ navigation, route }) => {
    

    // var queueName = ""

    // const [data, setData] = useState({})

    // const [token, setToken] = useState("NULL")
    // const [serverURL, setServerURL] = useState("http://10.0.2.2:8000")
    // var str = ""

    // useEffect(() => {
    //     AsyncStorage.getItem("server").then((value)=>{
    //         setServerURL(value)
    //     })
    //     AsyncStorage.getItem("token").then((value)=>{
    //         setToken(value)
    //     })
    //     AsyncStorage.getItem("APqueuename").then((value)=>{
    //         queueName = value
    //     })


    //     console.log("hi")
    //     str = token
    //     axios.post(
    //         serverURL + '/adminpanel', 
    //         {
    //             queueName: queueName
    //         }, 
    //         {
    //             headers: {
    //                 'Authorization': `JWT ${str}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .then(response => {
    //             var status = response.data.status;

    //             if(status=="ok")
    //             {
    //                 setData(response.data.data)
    //             }
    //             else
    //             {
    //                 Alert.alert(
    //                     'Error',
    //                     status,
    //                     [
    //                     { text: 'OK', onPress: () => {} },
    //                     ]
    //                 );
    //             }
    //         })
    //         .catch(error => {

    //             Alert.alert(
    //                 'Error',
    //                 'Cannot get queue details',
    //                 [
    //                 { text: 'OK', onPress: () => {} },
    //                 ]
    //             );

    //         });

    // }, [])




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
                            { text: 'OK', onPress: () => {} },
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
                    }}
                >
                    <Text style={{ ...FONTS.h3, marginTop: 24 }}>{queueName} - You</Text>
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
                        <Text style={{ ...FONTS.h3 }}>1st person in line</Text>
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
                        <Text style={{ ...FONTS.h3 }}>Estimated time to empty</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{data.estTimeToEmpty} min</Text>
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

