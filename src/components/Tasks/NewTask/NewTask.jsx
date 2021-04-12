import React,{useState,useRef} from 'react'
import dataBase from '../../../localFireBase'
import './NewTask.scss'
import {AiOutlinePlus} from 'react-icons/ai'

export default function NewTask({listId,taskList}) {
    const [visableForm,setVisableForm] = useState(false)
    const taskNameInp = useRef()


    const toggleFofrvisable=()=>{
        setVisableForm(!visableForm)
    }

    const addNewTask=()=>{
            if(taskNameInp.current.value){
                const newTasksList = [...taskList,{name:taskNameInp.current.value,done:false}]
                dataBase.collection('lists')
                .doc(listId)
                .set({tasks: newTasksList},{merge:true})
                taskNameInp.current.value = ''
                taskNameInp.current.classList.remove('falseValue')
            }else{
                taskNameInp.current.classList.add('falseValue')
            }
             
    }

    return (
        <div className="tasks_form">
            {!visableForm?
                <div onClick={toggleFofrvisable} className="tasks_form-new">
                    <i alt='Add icons'><AiOutlinePlus/></i>
                    <span>Новая задача</span>
                </div>:
                <div className="tasks_form-block">
                    <input ref={taskNameInp} className={'field'} type={'text'} placeholder={'Текст задачи'}></input>
                    <button onClick={addNewTask} className={'button'}>Добавить</button>
                    <button onClick={toggleFofrvisable} className={'button greyBtn'}>Отмена</button>
    
                </div>

            }
           
            
        </div>
    )
}
