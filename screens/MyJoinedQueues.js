import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'

import axios from 'axios';

import { SafeAreaView } from 'react-native-safe-area-context'

import DonationCard from '../components/DonationCard'
import PageContainer from '../components/PageContainer'

import { COLORS, SIZES, FONTS } from '../constants'

import { MaterialIcons } from '@expo/vector-icons'





const MyJoinedQueues = ({ navigation, route }) => {

    var serverURL = route.params.serverURL
    var token = route.params.token


    const [list, setList] = useState([])



    useEffect(() => {

        axios.post(
            serverURL + '/myjoinedqueue',
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
                console.log(error)
                Alert.alert(
                    'Error',
                    'Cannot get queue details',
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
                        onPress={()=> navigation.navigate("CustomerPanel",{serverURL:serverURL, token:token, queueName:q.split("#")[1], creatorID:q.split("#")[0]})}
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
