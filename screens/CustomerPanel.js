import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'axios';

import { SafeAreaView } from 'react-native-safe-area-context'

import PageContainer from '../components/PageContainer'
import Button from '../components/Button'
import Input from '../components/Input'

import {MaterialIcons} from '@expo/vector-icons'

import { COLORS, FONTS, SIZES, images } from '../constants'





const CustomerPanel = ({ navigation, route }) => {

    var serverURL = route.params.serverURL
    var token = route.params.token

    var queueName = route.params.queueName
    var creatorID = route.params.creatorID


    const [data, setData] = useState({})



    useEffect(() => {

        console.log(creatorID)
        console.log(queueName)

        axios.post(
            serverURL + '/customerpanel', 
            {
                creatorID: creatorID,
                queueName: queueName
            }, 
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
                    setData(response.data.data)
                    console.log(data.myIndx)
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
                    onPress={() => navigation.navigate('MyJoinedQueues',{serverURL:serverURL, token:token})}
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