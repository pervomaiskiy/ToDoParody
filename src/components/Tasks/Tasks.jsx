import './Tasks.scss'
import {FiEdit3} from 'react-icons/fi'
export default({icon})=>{

    return(
        <div className={'tasks'}>
            <h2 className={'tasks_title'}>112312asdasd
                <i><FiEdit3/></i>
            </h2>

            <div className={'tasks_item'}>
                <div className={'tasks_item-row'}>
                    <div className={'checkbox'}>
                        <input id={'check'} type={'checkbox'}></input>
                        <label htmlFor={'check'}>{icon}</label>
                    </div>
                    <p>Find а не filter, он вернет сразу обьект а не массив</p>
                </div>
               

             
            </div>
            
        
        </div>
    )
}