import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'

import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import Button from '../components/Button'
import Input from '../components/Input'

import {MaterialIcons} from '@expo/vector-icons'
import { COLORS, FONTS, SIZES, images } from '../constants'




const AdminPanel = ({ navigation, route }) => {
    
    var serverURL = route.params.serverURL
    var token = route.params.token
    var queueName = route.params.queueName



    const [data, setData] = useState({})


    useEffect(() => {

        console.log("hi")
        axios.post(
            serverURL + '/adminpanel', 
            {
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

        axios.post(
            serverURL + '/pop', 
            {
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
                    onPress={() => navigation.navigate('ManageQueue',{serverURL:serverURL, token:token})}
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
                        onPress={()=>{}}
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

