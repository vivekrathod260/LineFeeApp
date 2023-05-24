import React from 'react'
import { View, Platform, Text } from 'react-native'

import { CreateQueue, ManageQueue, JoinQueue, MyJoinedQueues, Profile} from '../screens'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { SimpleLineIcons, AntDesign, MaterialIcons, Fontisto} from '@expo/vector-icons'

import { COLORS } from '../constants'


const Tab = createBottomTabNavigator()

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: COLORS.white,
    },
}

const BottomTabNavigation = ({ navigation, route }) => {



    return (
        <Tab.Navigator initialRouteName="JoinQueue" screenOptions={screenOptions}>

            <Tab.Screen
                name="CreateQueue"
                component={CreateQueue}
                // initialParams={{serverURL:serverURL, token:token}}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <SimpleLineIcons
                                name="plus"
                                size={24}
                                color={
                                    focused
                                        ? COLORS.primary
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="ManageQueue"
                component={ManageQueue}
                // initialParams={{serverURL:serverURL, token:token}}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign
                                name="lock"
                                size={24}
                                color={
                                    focused
                                        ? COLORS.primary
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="JoinQueue"
                component={JoinQueue}
                // initialParams={{serverURL:serverURL, token:token}}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.primary,
                                    height: Platform.OS == 'ios' ? 50 : 60,
                                    width: Platform.OS == 'ios' ? 50 : 60,
                                    top: Platform.OS == 'ios' ? -10 : -20,
                                    borderRadius:
                                        Platform.OS == 'ios' ? 25 : 30,
                                    borderWidth: 2,
                                    borderColor: COLORS.white,
                                }}
                            >
                                <Fontisto
                                    name="plus-a"
                                    size={24}
                                    color={COLORS.white}
                                />
                            </View>
                        )
                    },
                }}
            />

            <Tab.Screen
                name="MyJoinedQueues"
                component={MyJoinedQueues}
                // initialParams={{serverURL:serverURL, token:token}}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialIcons
                                name="show-chart"
                                size={24}
                                color={
                                    focused
                                        ? COLORS.primary
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                // initialParams={{serverURL:serverURL, token:token}}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign
                                name="user"
                                size={24}
                                color={
                                    focused
                                        ? COLORS.primary
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
