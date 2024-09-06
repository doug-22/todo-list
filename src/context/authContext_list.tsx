import React,{useState,createContext,useContext,useEffect} from "react";
import { usuario,AuthContextTypeCidades} from '../global/propriedades'
import premissas from "../global/premissas";

export const AuthContextUser:any= createContext({});
export const AuthProviderUser = (props:any):any=>{
    const[user,setUser] = useState<usuario>();
    const[cidades,setCidades] = useState<AuthContextTypeCidades>()

    useEffect(()=>{
        async function buscarDados() {
            const result = await premissas.buscaUserDados();
            setUser(result)
        }
        // async function carrega_cidades() {
        //     const result = await premissas.carregaCidades();
        //     setCidades(result)
        // }
        // buscarDados()
        // carrega_cidades()
        async function buscaDadosUser() {
            const result:usuario = await premissas.buscaUserDados()
            if(result){
                setUser((p):usuario => { 
                    return {...p,
                            cnpj:result.cnpj,
                            codigo:result.codigo,
                            nome:result.nome,
                            token:result.token,
                    }
                })
            }
        }
        buscaDadosUser()
    },[])

    const handleChangeuser = (campo:keyof usuario , value:any) => {
        setUser((p):any => { return {...p, [campo]:value}})
    }

    return(
        <AuthContextUser.Provider value={{ user,setUser,cidades,handleChangeuser}}>
            {props.children}
        </AuthContextUser.Provider>
    );
};

export const useAuth= () => useContext(AuthContextUser)