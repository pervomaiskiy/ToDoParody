import './Tasks.scss';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {FiEdit3} from 'react-icons/fi';
import dataBase from '../../localFireBase'
import NewTask from './NewTask/NewTask'
import TaskItem from './TaskItem'
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

        const completedTask=(id)=>{
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

        const probanazvi=(id,newName)=>{
            dataBase.collection('lists')
            .doc(listId)
            .update({tasks: taskState.tasks.map((item,i)=>{
                    if(i === id){
                        item.name = newName
                    }
                    return item
                })
            })
        }

        return(
            <div className={'tasks'}>
                <Link to={`/lists/${listId}`} style={{textDecoration:'none'}}>
                    <h2 style={{color:taskState.color}} className={'tasks_title'}>{taskState.name}
                        <i className={'rename'}
                            onClick={()=>editTitle()}
                        ><FiEdit3/></i>
                    </h2>
                </Link>


                <div className={'tasks_items'}>
                    {!withoutEmpty && !taskState.tasks.length && <h2>???????????? ??????????????????????</h2>}
                    {taskState.tasks.map((task,i)=>{
                        return(
                           <TaskItem
                            key={i}
                            task={task}
                            id={i}
                            icon={icon}
                            deleteTask={deleteTask}
                            completedTask={completedTask}
                            renameTaskName={probanazvi}
                           />

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
