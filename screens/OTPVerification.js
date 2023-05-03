import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import OTPTextInput from 'react-native-otp-textinput'
import { COLORS, FONTS, SIZES } from '../constants'
import Button from '../components/Button'

const OTPVerification = ({ navigation }) => {
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
                    <View>
                        <OTPTextInput
                            textInputStyle={{
                                backgroundColor: COLORS.secondaryWhite,
                                borderColor: COLORS.secondaryWhite,
                                borderWidth: 1,
                                borderRadius: 6,
                                borderBottomWidth: 1,
                            }}
                            inputCount={4}
                            tintColor={COLORS.primary}
                        />
                        <TouchableOpacity
                            style={{
                                marginVertical: 10,
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.primary,
                                    textAlign: 'right',
                                }}
                            >
                                Resend code
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="VERIFY"
                        filled
                        onPress={() =>
                            navigation.navigate('SuccessVerification')
                        }
                        style={{
                            width: '100%',
                            marginVertical: 12,
                        }}
                    />
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default OTPVerification
