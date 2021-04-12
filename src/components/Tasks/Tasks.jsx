import './Tasks.scss';
import React,{useState,useEffect} from 'react';
import {FiEdit3} from 'react-icons/fi';
import dataBase from '../../localFireBase'
import NewTask from './NewTask/NewTask'

function Tasks({icon,listId,onEditTitle,withoutEmpty}){

        const [taskState,setTaskState] = useState({tasks:[]})

        useEffect(() => {
            if(listId){
            dataBase.collection('lists')
            .doc(listId)
            .onSnapshot((snapshot)=>{
                
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
                    }
                    return item
                })
            })
        }

            const deleteTask=(id)=>{
                dataBase.collection('lists')
                .doc(listId)
                .set({tasks: taskState.tasks.filter((item,i)=>{if(id!=i)return item})},{merge: true})
                
            }


        return(
            <div className={'tasks'}>
                <h2 style={{color:taskState.color}} className={'tasks_title'}>{taskState.name}
                    <i className={'rename'}
                        onClick={()=>editTitle()}
                    ><FiEdit3/></i>
                </h2>
                <div className={'tasks_items'}>
                    {!withoutEmpty && !taskState.tasks.length && <h2>Задачи отсутствуют</h2>}
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
                                    {task.done?<p onClick={()=>deleteTask(i)}>delete</p>:null}
                                </div>
                            </div>

                        )
                    })}

                </div>
                <NewTask
                    listId={listId}
                    taskList={taskState.tasks}
                />

                


                
            
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
