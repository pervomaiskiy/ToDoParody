import React,{useState,useEffect} from 'react';

import './Layout.scss'
import {AiOutlineUnorderedList} from 'react-icons/ai';
import List,{ListNav} from '../components/Menu/List.jsx'
import AddListButton from '../components/AddListButton/AddListButton'
import dataBase from '../localFireBase'
function Layout(){

    const [colorlList,setColorList] = useState();
    const [toDolist,setToDolist] = useState([]);
    // const [proba,setProba] = useState();

    useEffect(()=>{
        dataBase.collection('colors')
        .orderBy('id')
        .onSnapshot((snapshot)=>{
            setColorList(snapshot.docs.map((item)=>{
                return{id:item.id,data:item.data()}
            }))
        })

    },[])

    useEffect(()=>{
        dataBase.collection('lists')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
            setToDolist(snapshot.docs.map((item)=>{
                return{id:item.id,data:item.data()}
            }))
        })
    },[])

    return(
        <div className={'todo'}>
            <div className={'todo_sideBar'}>
                <List
                
                    items={[
                        {
                            id:'allList',
                            data:{
                            icon:<AiOutlineUnorderedList/>,
                            name:'Все задачи',
                            }

                        }
                    ]}
                />
                 <List
                 onRemove={(list)=>{
                    dataBase.collection('lists').doc(list).delete()
                 }}
                    items={toDolist}
                    isRemovable
                />
                <AddListButton colors={colorlList}/>

            </div>
           
            <div className={'todo_tasks'}>
                <h2>asdasdasda</h2>
            </div>
        </div>
    )
}
export default Layout