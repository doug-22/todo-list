import { StyleSheet,Dimensions} from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        // justifyContent:'center'
    },
    header:{
        width:'100%',
        height:Dimensions.get('window').height/6,
        backgroundColor:themas.Colors.primary,
        // alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
        
    },
    greeting:{
        fontSize:20,
        color:'#FFF',
        marginTop:20
    },
    boxInput:{
        width:'75%'
    }
})