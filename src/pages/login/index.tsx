import React,{ useState } from "react";
import { style } from "./styles";
import Logo from '../../assets/logo.png'
import { themas } from "../../global/themes";
 import {MaterialIcons} from '@expo/vector-icons';
import {Text, View,Image,TextInput, TouchableOpacity, Alert} from 'react-native'

export default function Login (){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    async function getLogin() {
        try {
            
            if(!email ||!password){
                return Alert.alert('Anteção 2','Informe os campos obrigatórios!')
            }

            console.log('LOGOU!')

        } catch (error) {
            console.log(error)
        }
    }


    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image 
                    source={Logo} 
                    style={style.logo}
                    resizeMode="contain"
                />
                <Text style={style.text}>Bem vindo de volta!</Text>
            </View>
            <View style={style.boxMid}>
                <Text style={style.titleInput}>ENDEREÇO E-MAIL</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <MaterialIcons 
                        name="email"
                        size={20}
                        color={themas.Colors.gray}
                    />
                </View>
                <Text style={style.titleInput}>ENDEREÇO E-MAIL</Text>
                <View style={style.boxInput}>
                    <TextInput 
                        style={style.input}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <MaterialIcons 
                        name="remove-red-eye"
                        size={20}
                        color={themas.Colors.gray}
                    />
                </View>
            </View>
            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} onPress={()=>getLogin()}>
                    <Text style={style.textButton}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <Text style={style.textBottom}>Não tem conta? <Text  style={style.textBottomCreate}>Crie agora</Text></Text>
        </View>
    )
}