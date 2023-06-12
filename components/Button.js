import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

export default function Button({content, outstyle, handleClick}) {

    return (
        <View style={{padding: 5}}>
            <TouchableOpacity onPress={() => handleClick(content)} style={[style.button]}>
                <Text style={[style.text, outstyle]}>{content}</Text>
            </TouchableOpacity>
        </View>
    )
}

const DeviceWidth = Dimensions.get('window').width

const style = StyleSheet.create({
    button: {
        height: DeviceWidth*0.2,
        width: DeviceWidth*0.2,
        borderRadius: 100,
        backgroundColor: "#E1D9D1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24
    }
})