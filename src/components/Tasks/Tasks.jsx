import './Tasks.scss';
import {FiEdit3} from 'react-icons/fi';
import {useLocation} from 'react-router-dom'
import {useState,useEffect} from 'react'
import dataBase from '../../localFireBase'


export default({icon,list,onEditTitle,title,onRenameTitle,deleteItem})=>{


    const editTitle =()=>{
        const newTitle = window.prompt('Title name',list.data.name)
        if(newTitle){
            onEditTitle(list.id,newTitle)
            onRenameTitle(newTitle)
        }
    }

      return(
        <div className={'tasks'}>
            <h2 className={'tasks_title'}>{title}
                <i className={'rename'}
                    onClick={()=>editTitle()}
                ><FiEdit3/></i>
            </h2>
            <div className={'tasks_items'}>
                {!list.data.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.data.tasks.map((task,i)=>{
                    return(
                        <div key={i} className={'tasks_item'}>
                            <div className={'tasks_item-row'}>
                                <div className={'checkbox'}>
                                
                                    <input id={i} type={'checkbox'}></input>
                                    <label htmlFor={i}>{icon}</label>
                                </div>
                                <input readOnly value={task}></input>
                            </div>
                        </div>

                    )
                })}
            </div>
   

            


            
        
        </div>
    )
}



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
// }