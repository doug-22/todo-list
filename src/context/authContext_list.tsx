import React, { createContext, useContext, useEffect, useRef, useState } from "react"; 
import { Modalize } from 'react-native-modalize';
import { TouchableOpacity, Text, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Input } from "../components/Input";
import { themas } from "../global/themes";
import { Flag } from "../components/Flag";


export const AuthContextList:any= createContext({});

const flags = [
    { caption: 'urgente', color: themas.Colors.red },
    { caption: 'opcional', color: themas.Colors.blueLigth }
];

export const AuthProviderList = (props) => {
    const modalizeRef = useRef(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFlag, setSelectedFlag] = useState('urgente');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [taskList, setTaskList] = useState([]);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const onClose = () => {
        modalizeRef.current?.close();
    };

    useEffect(() => {
        get_taskList();
    }, []);

    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            setSelectedDate(selectedDate || selectedDate);
        }
        setShowDatePicker(false);
    };

    const handleTimeChange = (event, selectedTime) => {
        if (event.type === 'set') {
            setSelectedTime(selectedTime || selectedTime);
        }
        setShowTimePicker(false);
    };

    const handleSave = async () => {
        const newItem = {
            item: Date.now(),
            title,
            description,
            flag: selectedFlag,
            timeLimit: new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedTime.getHours(),
                selectedTime.getMinutes()
            ).toISOString()
        };

        try {
            const storedData = await AsyncStorage.getItem('taskList');
            const taskList = storedData ? JSON.parse(storedData) : [];
            taskList.push(newItem);
            await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
            setTaskList(taskList);
            onClose();
        } catch (error) {
            console.error("Erro ao salvar o item:", error);
        }
    };

    const handleEdit = async (itemToEdit) => {
        // const editedItem = {
        //     ...itemToEdit,
        //     title,
        //     description,
        //     flag: selectedFlag,
        //     timeLimit: new Date(
        //         selectedDate.getFullYear(),
        //         selectedDate.getMonth(),
        //         selectedDate.getDate(),
        //         selectedTime.getHours(),
        //         selectedTime.getMinutes()
        //     ).toISOString(),
        // };
    
        // try {
        //     const storedData = await AsyncStorage.getItem('taskList');
        //     const taskList = storedData ? JSON.parse(storedData) : [];
            
        //     const updatedTaskList = taskList.map(item => 
        //         item.item === itemToEdit.item ? editedItem : item
        //     );
    
        //     await AsyncStorage.setItem('taskList', JSON.stringify(updatedTaskList));
        //     setTaskList(updatedTaskList);
        //     onClose();
        // } catch (error) {
        //     console.error("Erro ao editar o item:", error);
        // }
        setTitle(itemToEdit.title);
        setDescription(itemToEdit.description);
        setSelectedFlag(itemToEdit.flag);
        
        const timeLimit = new Date(itemToEdit.timeLimit);
        setSelectedDate(timeLimit);
        setSelectedTime(timeLimit);
        
        onOpen(); // Abre o modal
    };
    
    const handleDelete = async (itemToDelete) => {
        try {
            const storedData = await AsyncStorage.getItem('taskList');
            const taskList = storedData ? JSON.parse(storedData) : [];
            
            const updatedTaskList = taskList.filter(item => item.item !== itemToDelete.item);
    
            await AsyncStorage.setItem('taskList', JSON.stringify(updatedTaskList));
            setTaskList(updatedTaskList);
        } catch (error) {
            console.error("Erro ao excluir o item:", error);
        }
    };
    

    async function get_taskList() {
        try {
            const storedData = await AsyncStorage.getItem('taskList');
            const taskList = storedData ? JSON.parse(storedData) : [];
            setTaskList(taskList);
        } catch (error) {
            console.log(error);
        }
    }

    const _renderFlags = () => {
        return flags.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => {
                setSelectedFlag(item.caption)
            }}>
                <Flag 
                    caption={item.caption}
                    color={item.color} 
                    selected={item.caption == selectedFlag}
                />
            </TouchableOpacity>
        ));
    };

    const _container = () => {
        return (
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => onClose()}>
                            <MaterialIcons name="close" size={30} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Criar tarefa</Text>
                        <TouchableOpacity onPress={handleSave}>
                            <AntDesign name="check" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Input 
                            title="Título:" 
                            labelStyle={styles.label} 
                            value={title}
                            onChangeText={setTitle}
                        />
                        <Input 
                            title="Descrição:" 
                            numberOfLines={5} 
                            height={100} 
                            multiline 
                            labelStyle={styles.label} 
                            textAlignVertical="top"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Input 
                                title="Data limite:" 
                                labelStyle={styles.label} 
                                editable={false}
                                value={selectedDate.toLocaleDateString()}
                            />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                            <Input 
                                title="Hora limite:" 
                                labelStyle={styles.label} 
                                editable={false}
                                value={selectedTime.toLocaleTimeString()}
                            />
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker
                                value={selectedTime}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}
                        <View style={styles.containerFlag}>
                            <Text style={styles.flag}>Flags:</Text>
                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                                {_renderFlags()}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    };

    return (
        <AuthContextList.Provider value={{ onOpen, taskList,handleEdit,handleDelete}}>
            {props.children}
            <Modalize ref={modalizeRef} childrenStyle={{ height: 600 }} adjustToContentHeight={true}>
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    );
};

export const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        width: '100%',
        height: 40,
        paddingHorizontal: 40,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        width: '100%',
        paddingHorizontal: 20
    },
    label: {
        fontWeight: 'bold',
        color: '#000'
    },
    containerFlag: {
        width: '100%',
        padding: 10
    },
    flag: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});


export const useAuth = () => useContext(AuthContextList);

