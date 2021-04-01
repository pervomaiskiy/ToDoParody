import React,{useState,useEffect} from 'react'
import {useRouteMatch,useHistory,useLocation} from 'react-router-dom'
import {FaCircle} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'

import './List.scss'
import classNames from 'classnames'
import dataBase from '../../localFireBase'

export default ({ items,onClick,isRemovable,onRemove,onClickItem,activeList,taskTitle})=>{



    const { url } = useRouteMatch();
    const history = useHistory();
    const location = useLocation()
    
    const RemoveList=(list)=>{
        if(window.confirm("Вы действительно хотите удалить список?")){
            onRemove(list)
        }
    }
                   
    return(
        <ul onClick={onClick} className={'menu_list'}>
        {items.map((item,i)=>{
             return(
                 <li onClick={onClickItem?()=>{onClickItem(item);taskTitle(item.data.name)}:null}
                     key={i}
                     className={classNames(item.data.className,  {active: activeList && activeList.id === item.id})}
                     >
                     <i>{item.data.icon? item.data.icon:<FaCircle fontSize={'10px'} fill={item.data.color}/>}</i>

                     <span>{item.data.name}{item.data.tasks && item.data.tasks.length>0? `(${item.data.tasks.length})`:null}</span>
                     {isRemovable?<AiOutlineClose onClick={(e)=>{e.stopPropagation();RemoveList(item.id)}} className={'menu_list_deleteIcon'}/>:null}  
                 </li>
             )
         })
         }

     </ul>
    )
}





// export default ({ items,onClick,isRemovable,onRemove,onClickItem,activeList})=>{



//     const { url } = useRouteMatch();
//     const history = useHistory();
//     const location = useLocation()
    
//     const RemoveList=(list)=>{
//         if(window.confirm("Вы действительно хотите удалить список?")){
//             onRemove(list)
//         }
//     }
                   
//     return(
//         <ul onClick={onClick} className={'menu_list'}>
//         {items.map((item,i)=>{
//              return(
//                  <li onClick={onClickItem?()=>{onClickItem(item);history.push(`${url}${item.id}`, { docId:item.id, title: item.data.name,tasks:item.data.tasks})}:null}
//                      key={i}
//                      className={classNames(item.data.className,  {active: activeList && activeList.id === item.id})}
//                      >
//                      <i>{item.data.icon? item.data.icon:<FaCircle fontSize={'10px'} fill={item.data.color}/>}</i>

//                      <span>{item.data.name}{item.data.tasks && item.data.tasks.length>0? `(${item.data.tasks.length})`:null}</span>
//                      {isRemovable?<AiOutlineClose onClick={(e)=>{e.stopPropagation();RemoveList(item.id)}} className={'menu_list_deleteIcon'}/>:null}  
//                  </li>
//              )
//          })
//          }

//      </ul>
//     )
// }