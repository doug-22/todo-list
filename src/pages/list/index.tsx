import React,{ useState } from "react";
import { style } from "./styles";
import { Ball } from "../../components/Ball";
import { Input } from "../../components/Input";
import {MaterialIcons} from '@expo/vector-icons';
import {Text, View,StatusBar,FlatList, TouchableOpacity} from 'react-native'
import { Flag } from "../../components/Flag";
import { themas } from "../../global/themes";

type PropCard = {
    item:number,
    title:string,
    description:string,
    flag:'urgente'|'opcional'
}

const data:any = [
    {
        item:0,
        title:'Realizar a lição de casa!',
        description:'página 10 a 20',
        flag:'urgente'
    },
    {
        item:1,
        title:'Passear com cachorro!',
        description:'página 10 a 20',
        flag:'urgente'
    },
    {
        item:2,
        title:'Sair para tomar açai!',
        description:'página 10 a 20',
        flag:'urgente'
    }
]

export default function List (){

    const _renderCard = (item:PropCard,index:number) =>{
        return (
            <TouchableOpacity key={item.item} style={style.card}>
                <View style={style.rowCard}>
                    <View style={style.rowCardLeft}>
                        <Ball color="red"/>
                        <View>
                            <Text style={style.titleCard}>{item.title}</Text>
                            <Text style={style.descriptionCard}>{item.description}</Text>
                        </View>
                    </View>
                    <Flag caption="Urgente" color={themas.Colors.red}/>
                </View>
            </TouchableOpacity>
        )
    }
    
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
            <View style={style.boxList}>
                <FlatList 
                    data={data}
                    style={{marginTop:40,paddingHorizontal:30}}
                    keyExtractor={(item,index)=>item.number}
                    renderItem={({item,index})=>{return(_renderCard(item,index))}}
                />
            </View>
        </View>
    )
}