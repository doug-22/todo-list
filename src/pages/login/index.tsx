import React,{ useState } from "react";
import { style } from "./styles";
import Logo from '../../assets/logo.png'
import {MaterialIcons,Octicons} from '@expo/vector-icons';
import {Text, View,Image,TouchableOpacity, Alert} from 'react-native'
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function Login (){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword,setShowPassword] = useState(true);
    const [loading,setLoading] = useState(false)


    async function getLogin() {
        setLoading(true)
        try {
            
            if(!email ||!password){
                return Alert.alert('Anteção 2','Informe os campos obrigatórios!')
            }

            console.log('LOGOU!')
           
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
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
                <Input 
                    title="ENDEREÇO E-MAIL"
                    value={email}
                    onChangeText={setEmail}
                    IconRigth={MaterialIcons}
                    iconRightName="email"
                    onIconRigthPress={()=>console.log('OLA')}
                />
                <Input 
                    title="SENHA"
                    value={password}
                    onChangeText={setPassword}
                    IconRigth={Octicons}
                    iconRightName={showPassword?"eye-closed":"eye"}
                    onIconRigthPress={()=>setShowPassword(!showPassword)}
                    secureTextEntry={showPassword}
                />
            </View>
            <View style={style.boxBottom}>
                <Button  text="ENTRAR" loading={loading}/>
            </View>
            <Text style={style.textBottom}>Não tem conta? <Text  style={style.textBottomCreate}>Crie agora</Text></Text>
        </View>
    )
}