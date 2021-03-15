import React,{useState} from 'react';
import List from '../Menu/List'
import {AiOutlinePlus} from 'react-icons/ai'
import './AddListButton.scss'
const AddListButton =()=>{
    const [visablePopup,setVisablePopup] = useState(false)
    return(
        <div className={'addList'}>
             <List
                onClick={()=>setVisablePopup(true)}
                items={[
                    {
                        className:'menu_list_addButton',
                        icon:<AiOutlinePlus/>,
                        label:'Добавить список',
                        
                    }
                ]}
            />
           {visablePopup && <div className={'addList_popup'} onClick={()=>setVisablePopup(false)}>
                12
            </div>}
        </div>
       
    )
}
export default AddListButton