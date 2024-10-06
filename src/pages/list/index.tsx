import React,{ useState,useContext} from "react";
import { style } from "./styles";
import { Ball } from "../../components/Ball";
import { Input } from "../../components/Input";
import {MaterialIcons,AntDesign} from '@expo/vector-icons';
import { Flag } from "../../components/Flag";
import { themas } from "../../global/themes";
import {AuthContextList}   from "../../context/authContext_list";
import {Text, View,StatusBar,FlatList, TouchableOpacity} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler';

export default function List (){

    const {taskList,handleDelete,handleEdit} = useContext<AuthContextType>(AuthContextList);

    const renderRightActions = () => (
        <View style={style.Button}>
          <AntDesign 
            name="delete"
            size={20}
            color={'#FFF'}
          />
        </View>
    );
    const renderLeftActions = () => (
        <View style={[style.Button,{backgroundColor:themas.Colors.blueLigth}]}>
            <AntDesign 
                name="edit"
                size={20}
                color={'#FFF'}
            />
        </View>
    );

    const handleSwipeOpen = (direction,item) => {
        if (direction === 'right') {
            handleDelete(item)
        } else if (direction === 'left') {
            handleEdit(item)
        }
    }

    const _renderCard = (item:PropCard,index:number) =>{
        const color  = item.flag == 'opcional'?themas.Colors.blueLigth:themas.Colors.red
        return (
            <Swipeable  
                key={item.item} 
                renderRightActions={renderRightActions} 
                renderLeftActions={renderLeftActions}
                onSwipeableOpen={(direction) => handleSwipeOpen(direction,item)}
                
            >
                <View style={style.card}>
                    <View style={style.rowCard}>
                        <View style={style.rowCardLeft}>
                            <Ball color={color} />
                            <View>
                                <Text style={style.titleCard}>{item.title}</Text>
                                <Text style={style.descriptionCard}>{item.description}</Text>
                            </View>
                        </View>
                        <Flag 
                            caption={item.flag} 
                            color={color} 
                        />
                    </View>
                </View>
            </Swipeable >
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
                    data={taskList}
                    style={{marginTop:40,paddingHorizontal:30}}
                    keyExtractor={(item,index)=>item.item.toString()}
                    renderItem={({item,index})=>{return(_renderCard(item,index))}}
                />
            </View>
        </View>
    )
}

