import {FaCircle} from 'react-icons/fa'
import './List.scss'
import classNames from 'classnames'

export default ({ items,isRemovable,onClick })=>{
    return(
        <ul onClick={onClick} className={'menu_list'}>
           {items.map((item,i)=>{
                return(
                    <li key={i} className={classNames(item.className, {'active':item.active})}> 
                        <i>{item.icon? item.icon: <FaCircle fontSize={'10px'} fill={item.color}/>}</i>

                        <span>{item.label}</span>  
                    </li>
                )
            })
            }

        </ul>
    )
}