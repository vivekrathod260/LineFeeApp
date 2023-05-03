import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'

import { COLORS } from '../constants'


const PageContainer = (props) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
                height: '100%',
                width: '100%',
                backgroundColor: COLORS.white,
            }}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            {props.children}
        </KeyboardAvoidingView>
    )
}

export default PageContainer
