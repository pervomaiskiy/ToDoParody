import React,{useState,useRef} from 'react';
import firebase from 'firebase'
import dataBase from '../../localFireBase'
import List from '../Menu/List'
import {AiOutlinePlus,AiFillCloseCircle} from 'react-icons/ai'
import {FaCircle} from 'react-icons/fa'
import './AddListButton.scss'


const AddListButton =({colors,className})=>{

    const listNameInp = useRef()

    const [visablePopup,setVisablePopup] = useState(false)
    const [selectdColor,setSelectedColor] = useState('#C9D1D3')



function addNewList(){
    if(!listNameInp.current.value){
        listNameInp.current.classList.add('falseValue')
        return
    }
    dataBase.collection('lists').add({
        color:selectdColor,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        name:listNameInp.current.value,
        tasks: []
    })
    listNameInp.current.value = ''
    listNameInp.current.classList.remove('falseValue')
    setVisablePopup(false)
    setSelectedColor('#C9D1D3')

    
}



    return(
        <div className={'addList'}>
             <List
                className={'menu_list_addButton'}
                onClick={()=>setVisablePopup(true)}
                items={[
                    { id:'addList',
                        data:{
                            className:'menu_list_addButton',
                            icon:<AiOutlinePlus/>,
                            name:'Добавить список',
                        }
                    }
                ]}
            />
           {visablePopup && (
            <div className={'addList_popup'}>
                <AiFillCloseCircle 
                    className={'addList_popup_closeBtn'}
                    onClick={()=>setVisablePopup(false)}
                
                />
                <input ref={listNameInp}  className={'field'} type={'text'} placeholder={'Название списка'}></input>
                <div className={'addList_popupColors'}>
                    <ul>
                        {colors.map((item)=>{
                            return(
                                <li
                                    key={item.data.hex} 
                                    onClick={()=>setSelectedColor(item.data.hex)}
                                >
                                    <i>
                                    <FaCircle
                                    className={selectdColor === item.data.hex?'addList_popupColors_item active':'addList_popupColors_item'}
                                    fill={item.data.hex}/>
                                    </i>
                                </li>
                                
                            )
                        })}                             
                    </ul>

                </div>
                <button onClick={()=>{addNewList()}} className={'button addBtnList_button'}>Добавить</button>
                    
                    
                    
                    
                   
                
            </div>
            )}
        </div>
       
    )
}
export default AddListButton