import React,{ useState } from "react";
import { style } from "./styles";
import {Text, View,Image, Alert,StatusBar} from 'react-native'
import { Input } from "../../components/Input";
import {MaterialIcons} from '@expo/vector-icons';
export default function List (){
    return(
        <View style={style.container}>
            <StatusBar  barStyle="light-content"/>
            <View style={style.header}>
                <Text style={style.greeting}>Bom dia , <Text style={{fontWeight:'bold'}}>Caio E.</Text></Text>
                <View style={style.boxInput}>
                    <Input 
                        IconLeft={MaterialIcons}
                        iconLeftName="search"
                    />
                </View>
            </View>
        </View>
    )
}