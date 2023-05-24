import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'



const Dots = ({ selected }) => {
    let backgroundColor
    backgroundColor = selected ? '#ff2156' : '#808080'
    return (
        <View
            style={{
                height: 5,
                width: 5,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    )
}

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{
            marginRight: 12,
        }}
        {...props}
    >
        <Text style={{ color: '#ff2156' }}>Done</Text>
    </TouchableOpacity>
)

const OnboardingStarter = ({ navigation, route }) => {
    return (
        <Onboarding
            onSkip={() => navigation.navigate('GetStarted')}
            onDone={() => navigation.navigate('GetStarted')}
            DotComponent={Dots}
            bottomBarColor="#ffffff"
            DoneButtonComponent={Done}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image style={{width:276,
                        height:264}}
                            source={require('../assets/images/onboarding_1.png')}
                        />
                    ),
                    title: 'Line Free',
                    subtitle:
                        'Effortlessly manage queues and eliminate wait times with our innovative queue management system.',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image style={{width:276,
                        height:264}}
                            source={require('../assets/images/onboarding_2.png')}
                        />
                    ),
                    title: 'Say Goodbye to Long Queues',
                    subtitle:
                        'Revolutionize Your Waiting Experience',
                },
            ]}
        />
    )
}

export default OnboardingStarter
