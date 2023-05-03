import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Alert} from 'react-native'

import React, { useEffect, useState } from 'react'

import axios from 'axios';


import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'

import { COLORS, SIZES, FONTS, images, icons } from '../constants'

import {MaterialIcons, FontAwesome} from '@expo/vector-icons'

import DonationCard from '../components/DonationCard'





const ManageQueue = ({ navigation, route }) => {
    
    var serverURL = route.params.serverURL
    var token = route.params.token


    const [list, setList] = useState([])
    

    useEffect(()=>{

        console.log("hi")

        axios.post(
            serverURL + '/myqueue',
            {},
            {
                headers: {
                    'Authorization': `JWT ${token}`,
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
    },[])



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
                            // postedDate={"11"}
                            onPress={()=> navigation.navigate("AdminPanel",{serverURL:serverURL, token:token, queueName:q.split("#")[1]})}
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
