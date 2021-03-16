import React,{useState} from 'react';
import List from '../Menu/List'
import {AiOutlinePlus,AiFillCloseCircle} from 'react-icons/ai'
import {FaCircle} from 'react-icons/fa'
import './AddListButton.scss'
const AddListButton =({colors})=>{
    const [visablePopup,setVisablePopup] = useState(false)
    const [selectdColor,setSelectedColor] = useState(colors[0].hex)
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
           {visablePopup && (
            <div className={'addList_popup'}>
                <AiFillCloseCircle 
                    className={'addList_popup_closeBtn'}
                    onClick={()=>setVisablePopup(false)}
                
                />
                <input className={'field'} type={'text'} placeholder={'Название списка'}></input>
                <div className={'addList_popupColors'}>
                    <ul>
                        {colors.map((item)=>{
                            return(
                                <li
                                 key={item.hex} 
                                 onClick={()=>setSelectedColor(item.hex)}
                                >
                                 <i>
                                  <FaCircle
                                    className={selectdColor === item.hex?'addList_popupColors_item active':'addList_popupColors_item'}
                                    fill={item.hex}/>
                                 </i>
                                </li>
                                
                            )
                        })}
                              

                    </ul>

                </div>
                <button className={'button addBtnList_button'}>Добавить</button>
                    
                    
                    
                    
                   
                
            </div>
            )}
        </div>
       
    )
}
export default AddListButton