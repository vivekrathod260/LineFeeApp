import { View, Text, TouchableOpacity, Image , ScrollView, Alert} from 'react-native'
import React, { useEffect, useState,useCallback,useReducer } from 'react'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { SafeAreaView } from 'react-native-safe-area-context'

import { MaterialIcons ,FontAwesome} from '@expo/vector-icons'

import { COLORS, SIZES, FONTS } from '../constants'


import Button from '../components/Button'
import Input from '../components/Input'




const CreateQueue = ({ navigation, route }) => {
    
    var serverURL = route.params.serverURL
    var token = route.params.token

    var queueName = ""
    var location = ""
    var time = ""
    var purpose = ""
    var instruction = ""




    const handelCreateQueue = () => {
        axios.post(
            serverURL + '/createqueue', 
            {
                queueName: queueName,
                location: location,
                time: time,
                note: purpose+"#"+instruction
            }, 
            {
                headers: {
                    'Authorization': `JWT ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                var status = response.data.status;
    
                if(status=='created !')
                {
                    navigation.navigate('AdminPanel',{serverURL:serverURL, token:token, queueName:queueName})
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
                    'Cannot get queue details',
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
                    onPress={() => navigation.navigate('JoinQueue',{serverURL:serverURL, token:token})}
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
                <Text style={{ ...FONTS.h4 }}>CREATE QUEUE</Text>
            </View>
        )
    }

    function renderInputCards() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    marginVertical: 22,
                }}
            >

               <Input
                icon="list"
                iconPack={FontAwesome}
                id="queueName"
                onInputChanged={(propId, value)=>{queueName=value}}
                placeholder="Enter Queue Name"
                />
               <Input
                icon="compass"
                iconPack={FontAwesome}
                id="location"
                onInputChanged={(propId, value)=>{location=value}}
                placeholder="Enter Location"
                />
               <Input
                icon="alarm"
                iconPack={MaterialIcons}
                id="time"
                onInputChanged={(propId, value)=>{time=value}}
                placeholder="Enter Time"
                />
               <Input
                icon="question"
                iconPack={FontAwesome}
                id="purpose"
                onInputChanged={(propId, value)=>{purpose=value}}
                placeholder="Purpose Of Queue"
                />
               <Input
                icon="info"
                iconPack={FontAwesome}
                id="instruction"
                onInputChanged={(propId, value)=>{instruction=value}}
                placeholder="Instructions"
                />
                 <Button
                    title="Create Queue"
                    filled
                    style={{
                        marginTop: SIZES.padding,
                    }}
                    onPress={()=>{handelCreateQueue()}}
                />
            </View>
        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ marginHorizontal: 22 }}>

                {renderHeader()}
                <ScrollView>
                    <View style={{height:850}}>
                        {renderInputCards()}    
                    </View>          
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default CreateQueue


