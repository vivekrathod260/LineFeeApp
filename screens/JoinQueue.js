import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useCallback, useReducer, useState, useEffect } from 'react'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { SafeAreaView } from 'react-native-safe-area-context'

import PageContainer from '../components/PageContainer'
import Button from '../components/Button'
import Input from '../components/Input'

import { COLORS, SIZES, FONTS, images } from '../constants'

import { MaterialIcons, FontAwesome} from '@expo/vector-icons'



const JoinQueue = ({ navigation, route }) => {

    var creatorName = ""
    var queueName = ""

    const [token, setToken] = useState("NULL")
    const [serverURL, setServerURL] = useState("http://10.0.2.2:8000")
    var str = ""

    useEffect(() => {
        AsyncStorage.getItem("server").then((value)=>{
            setServerURL(value)
        })
        AsyncStorage.getItem("token").then((value)=>{
            setToken(value)
        })

    }, [])
 

    const handelJoin = () => {

        console.log(creatorName)
        console.log(queueName)
        str = token
        axios.post(
            serverURL + '/joinqueue', 
            {
                creatorID: creatorName,
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
                console.log(status);
                AsyncStorage.setItem("JQqueueName",queueName)
                AsyncStorage.setItem("JQcreatorname",creatorName)
                navigation.navigate('CustomerPanel')
            })
            .catch(error => {

                Alert.alert(
                    'Error',
                    'Cannot join queue',
                    [
                      { text: 'OK', onPress: () => {} },
                    ]
                );

                console.error(error);
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
                <Text style={{ ...FONTS.h4 }}>JOIN QUEUE</Text>
            </View>
        )
    }

    function renderContent() {
        return (
            <>
                <View
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={images.secureBlood}
                        resizeMode="contain"
                        style={{
                            width:276,
                            height:264,
                            marginRight: 30,
                        }}
                    />
                </View>
                
                <Input
                    icon="star"
                    iconPack={FontAwesome}
                    id="fullName"
                    onInputChanged={(propsID, value)=>creatorName=value}
                    placeholder="Enter Creator Name"
                />
                <Input
                    icon="list"
                    iconPack={FontAwesome}
                    id="fullName"
                    onInputChanged={(propsID, value)=>queueName=value}
                    placeholder="Enter Queue Name"
                />

                <Button
                    title="Join Queue"
                    filled
                    style={{
                        marginTop: SIZES.padding,
                    }}
                    onPress={() => handelJoin()}
                />
            </>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ marginHorizontal: 22 }}>
                    {renderHeader()}
                    {/* <ScrollView> */}
                        {renderContent()}
                    {/* </ScrollView> */}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default JoinQueue
