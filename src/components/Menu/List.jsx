import React,{useState} from 'react'
import {FaCircle} from 'react-icons/fa'
import './List.scss'
import classNames from 'classnames'

export default ({ items,isRemovable,onClick})=>{

    const [probaState,setProbaState] = useState();

    return(
        <ul onClick={onClick} className={'menu_list'}>
           {items.map((item,i)=>{
                return(
                    <li onClick={()=>setProbaState(item.id)} key={i} className={classNames(item.className,  {'active':item.id === probaState})}>
                        <i>{<FaCircle fontSize={'10px'} fill={item.data.color}/>}</i>

                        <span>{item.data.name}</span>  
                    </li>
                )
            })
            }

        </ul>
    )
}


export const ListNav=({items,onClick,classNames})=>{
    return(
        <ul onClick={onClick} className={'menu_list'}>
        {items.map((item,i)=>{
             return(
                 <li key={i} className={classNames}> 
                     <i>{item.icon? item.icon: <FaCircle fontSize={'10px'} fill={item.color?item.color:'#C9D1D3'}/>}</i>

                     <span>{item.name}</span>  
                 </li>
             )
         })
         }

     </ul>
    )
}