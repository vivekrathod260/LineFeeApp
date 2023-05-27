import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Alert} from 'react-native'

import React, { useEffect, useState } from 'react'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'


import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'

import { COLORS, SIZES, FONTS, images, icons } from '../constants'

import {MaterialIcons, FontAwesome} from '@expo/vector-icons'

import DonationCard from '../components/DonationCard'





const ManageQueue = ({ navigation, route }) => {

    const [list, setList] = useState([])
    

    const [serverURL, setServerURL] = useState("http://10.0.2.2:8000")

    useEffect(() => {
        navigation.addListener('focus', async () => {
            await AsyncStorage.getItem("server").then((value)=>{
                setServerURL(value)
            })
            await AsyncStorage.getItem("token").then((value)=>{
                axios.post(
                    serverURL + '/myqueue',
                    {},
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
                            setList(response.data.lst)
                        }
                        else
                        {
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
                            'Cannot get manage details',
                            [
                            { text: 'OK', onPress: () => {} },
                            ]
                        );
        
                    });
            })
        })
        


    })




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
                    onPress={() => navigation.navigate('JoinQueue')}
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
                <Text style={{ ...FONTS.h4 }}>Manage Queue</Text>
            </View>
        )
    }

    function renderManageQueue() {
        return (
            <ScrollView>
                <View>
                    {list.map((q, index) => (
                        <DonationCard
                            key={index}
                            name={q.split("#")[1]}
                            location={q.split("#")[0]}
                            onPress={()=> {
                                AsyncStorage.setItem("APqueuename",q.split("#")[1])
                                navigation.navigate("AdminPanel")
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        )
    }


    return (

        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{
                        marginHorizontal: 22,
                    }}
                >
                    {renderHeader()}
                    {renderManageQueue()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default ManageQueue
