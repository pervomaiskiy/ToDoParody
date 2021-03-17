import React,{useState,useEffect} from 'react';

import './Layout.scss'
import {AiOutlineUnorderedList} from 'react-icons/ai';
import List,{ListNav} from '../components/Menu/List.jsx'
import AddListButton from '../components/AddListButton/AddListButton'
import dataBase from '../localFireBase'
function Layout(){

    const [colorlList,setColorList] = useState();
    const [toDolist,setToDolist] = useState([]);

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
                <ListNav
                    items={[
                        {
                            icon:<AiOutlineUnorderedList/>,
                            name:'Все задачи',
                            active:true
                        }
                    ]}
                />
                 <List
                    items={toDolist}
                    isRemovable
                />
                <AddListButton colors={colorlList} classNames={'menu_list_addButton'}/>

            </div>
           
            <div className={'todo_tasks'}>
           
            </div>
        </div>
    )
}
export default Layout