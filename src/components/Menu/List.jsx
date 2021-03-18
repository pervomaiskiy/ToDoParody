import React,{useState} from 'react'
import {FaCircle} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'

import './List.scss'
import classNames from 'classnames'
import dataBase from '../../localFireBase'

export default ({ items,onClick,isRemovable,onRemove})=>{

    const [probaState,setProbaState] = useState();

    const RemoveList=(list)=>{
        if(window.confirm("Вы действительно хотите удалить список?")){
            onRemove(list)
        }
    }
    return(
        <ul onClick={onClick} className={'menu_list'}>
        {items.map((item,i)=>{
             return(
                 <li onClick={()=>setProbaState(item.id)} key={i} className={classNames(item.data.className,  {'active':item.id === probaState})}>
                     <i>{item.data.icon? item.data.icon:<FaCircle fontSize={'10px'} fill={item.data.color}/>}</i>

                     <span>{item.data.name}</span>
                     {isRemovable?<AiOutlineClose onClick={()=>RemoveList(item.id)} className={'menu_list_deleteIcon'}/>:null}  
                 </li>
             )
         })
         }

     </ul>
    )
}
