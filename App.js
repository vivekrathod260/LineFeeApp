import { useCallback, useEffect, useState } from 'react'

import { GetStarted, Login, OnboardingStarter, Register} from './screens'
import AdminPanel from './screens/AdminPanel'
import CustomerPanel from './screens/CustomerPanel'
import NearbyPlaces from './screens/NearbyPlaces'
import BottomTabNavigation from './navigation/BottomTabNavigation'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import * as SplashScreen from 'expo-splash-screen'

import { useFonts } from 'expo-font'




SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

export default function App() {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState("NULL")
    const [serverURL, setServerURL] = useState("http://10.0.2.2:8000")

    useEffect(() => {

        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true')
                setIsFirstLaunch(true)
            } else {
                setIsFirstLaunch(false)
            }
        })



        AsyncStorage.getItem("token").then((value)=>{
            if(value==null)
            {
                AsyncStorage.setItem("token","NULL")
            } else if(value=="NULL")
            {
                setIsLoggedIn(false)
            }
            else
            {
                setIsLoggedIn(true)
                setToken(value)
            }
        })
        .catch(
            ()=>console.log("token not found in asyncstorage")
        )


        AsyncStorage.getItem("server").then((value)=>{
            if(value==null)
            {
                AsyncStorage.setItem("server","http://10.0.2.2:8000")
            }
            else
            {
                setServerURL(value)
            }
        })
        .catch(
            ()=>console.log("serverURL not found in asyncstorage")
        )

    }, [])

    const [fontsLoaded] = useFonts({
        black: require('./assets/fonts/Poppins-Black.ttf'),
        bold: require('./assets/fonts/Poppins-Bold.ttf'),
        medium: require('./assets/fonts/Poppins-Medium.ttf'),
        regular: require('./assets/fonts/Poppins-Regular.ttf'),
        semiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            <Stack.Navigator initialRouteName={isFirstLaunch ? 'OnboardingStarter' : (isLoggedIn ? 'BottomTabNavigation' : 'GetStarted')}>
                <Stack.Screen
                    name="OnboardingStarter"
                    component={OnboardingStarter}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="GetStarted"
                    component={GetStarted}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="BottomTabNavigation"
                    component={BottomTabNavigation}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="AdminPanel"
                    component={AdminPanel}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="CustomerPanel"
                    component={CustomerPanel}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="NearbyPlaces"
                    component={NearbyPlaces}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
