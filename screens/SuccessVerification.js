import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { images } from '../constants'
import Button from '../components/Button'

// Let's validate the forms
const SuccessVerification = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 22,
                    }}
                >
                    <Image
                        source={images.success}
                        resizeMode="contain"
                        style={{
                            marginBottom: 40,
                        }}
                    />
                    <Button
                        title="FINISH"
                        filled
                        onPress={() =>
                            navigation.navigate('BottomTabNavigation')
                        }
                        style={{
                            width: '100%',
                        }}
                    />
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default SuccessVerification
