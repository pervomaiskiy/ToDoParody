import './Layout.scss'
import {AiOutlineUnorderedList} from 'react-icons/ai';
import Menu from '../components/Menu/Menu'
function Layout(){
    return(
        <div className={'todo'}>
            <div className={'todo_sideBar'}>
                <Menu
                    icon={<AiOutlineUnorderedList/>}
                    text={'Все задачи'}
                />
            </div>
            <div className={'todo_tasks'}>
            </div>
        </div>
    )
}
export default Layout