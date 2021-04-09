import './Tasks.scss';
import React from 'react';
import {FiEdit3} from 'react-icons/fi';
import {useLocation} from 'react-router-dom'
import {useState,useEffect} from 'react'
import dataBase from '../../localFireBase'
import {AiOutlinePlus} from 'react-icons/ai'


function Tasks({icon,listId,onEditTitle}){

        const [taskState,setTaskState] = useState({tasks:[]})



        useEffect(() => {
            if(listId){
            dataBase.collection('lists')
            .doc(listId)
            .get().then((snapshot)=>{
                console.log(`qqqqq`)
                setTaskState(snapshot.data()) 
            })
            }
        
        }, [listId])

        const editTitle =()=>{
            const newTitle = window.prompt('Title name',taskState.name)
            if(newTitle){
                onEditTitle(listId,newTitle)

            }
        }
        const deleteTaskResolution=(id)=>{
            dataBase.collection('lists')
            .doc(listId)
            .update({tasks: taskState.tasks.map((item,i)=>{
                    if(i === id){
                        item.done = !item.done
                        console.log('rerender')
                    }
                    return item
                })
            })
        }
        return(
            <div className={'tasks'}>
                <h2 className={'tasks_title'}>{taskState.name}
                    <i className={'rename'}
                        onClick={()=>editTitle()}
                    ><FiEdit3/></i>
                </h2>
                <div className={'tasks_items'}>
                    {!taskState.tasks.length && <h2>Задачи отсутствуют</h2>}
                    {taskState.tasks.map((task,i)=>{
                        return(
                            <div key={i} className={'tasks_item'}>
                                <div className={'tasks_item-row'}>
                                    <div className={'checkbox'}>
                                        {task.done && <div>proba trushki</div>}
                                        <input id={i} type={'checkbox'}></input>
                                        <label htmlFor={i}
                                        onClick={()=>deleteTaskResolution(i)}
                                        >{icon}</label>
                                    </div>
                                    <input readOnly value={task.name}></input>
                                </div>
                            </div>

                        )
                    })}
                    <div className="tasks_form">
                        <div className="tasks__form-new">
                            <i><AiOutlinePlus/></i>
                            <span>Новая задача</span>
                        </div>
                    </div>
                </div>
    

                


                
            
            </div>
        )
    }

export default React.memo(Tasks)

// console.log(taskState.tasks.map((item,i)=>{if(i === id)item.done = true}))


// export default({icon,title})=>{

//     const [taskState,setTaskState] = useState([])

//     const location = useLocation()

//     const deleteTask=(id)=>{
//         dataBase.collection('lists')
//         .doc(location.state.docId)
//         .set({tasks: taskState.filter((item,i)=>{if(id!=i)return item})},{merge: true})
        
//     }
//     useEffect(() => {
//         console.log(location.state.docId)
//         dataBase.collection('lists')
//         .doc(location.state.docId)
//         .onSnapshot((snapshot)=>{
//             setTaskState(snapshot.data()?snapshot.data().tasks:[])})
//     }, [])

       
//       return(
//         <div className={'tasks'}>
//             <h2 className={'tasks_title'}>{title}
//                 <i className={'rename'}

//                 ><FiEdit3/></i>
//             </h2>
//             {taskState.length > 0 && taskState.map((task,i)=>{
//                 return(
//                     <div key={i} className={'tasks_item'}>
//                         <div className={'tasks_item-row'}>
//                             <div className={'checkbox'} onClick={()=>deleteTask(i)}>
//                                 <input id={i} type={'checkbox'}></input>
//                                 <label htmlFor={i}>{icon}</label>
//                             </div>
//                             <input readOnly value={task}></input>
//                         </div>
//                     </div>

//                 )
//             })}
   

            


            
        
//         </div>
//     )
