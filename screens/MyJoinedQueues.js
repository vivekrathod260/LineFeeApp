import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { SafeAreaView } from 'react-native-safe-area-context'

import DonationCard from '../components/DonationCard'
import PageContainer from '../components/PageContainer'

import { COLORS, SIZES, FONTS } from '../constants'

import { MaterialIcons } from '@expo/vector-icons'





const MyJoinedQueues = ({ navigation, route }) => {

    const [list, setList] = useState([])

    const [serverURL, setServerURL] = useState("http://10.0.2.2:8000")

    useEffect(() => {
        navigation.addListener('focus', async () => {

            await AsyncStorage.getItem("server").then((value)=>{
                setServerURL(value)
            })

            await AsyncStorage.getItem("token").then((value)=>{
                axios.post(
                    serverURL + '/myjoinedqueue',
                    {},
                    {
                        headers: {
                            'Authorization': "JWT " + value,
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
                        console.log(error)
                        Alert.alert(
                            'Error',
                            'Cannot get queue details',
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
                <Text style={{ ...FONTS.h4 }}>Joined Queue</Text>
            </View>
        )
    }

    function renderContent() {
        return (
            <ScrollView>
                {list.map((q, index) => (
                    <DonationCard
                        key={index}
                        name={q.split("#")[1]}
                        location={q.split("#")[0]}
                        // postedDate={"11"}
                        onPress={async ()=> {
                            await AsyncStorage.setItem("JQqueueName",q.split("#")[1])
                            await AsyncStorage.setItem("JQcreatorname",q.split("#")[0])
                            await navigation.navigate("CustomerPanel")
                        }}
                    />
                ))}
            </ScrollView>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{marginHorizontal: 22}}
                >
                    {renderHeader()}
                    {renderContent()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default MyJoinedQueues
