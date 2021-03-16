import './Layout.scss'
import {AiOutlineUnorderedList} from 'react-icons/ai';
import List from '../components/Menu/List.jsx'
import AddListButton from '../components/AddListButton/AddListButton'
import DB from '../ArrValue/db.json'
function Layout(){
    return(
        <div className={'todo'}>
            <div className={'todo_sideBar'}>
                <List
                    items={[
                        {
                            icon:<AiOutlineUnorderedList/>,
                            label:'Все задачи',
                            active:true
                        }
                    ]}
                />
                 <List
                    items={[
                        {
                            color:'#428883',
                            label:'Покупки'
                        },
                        {
                            color:'#ffddcc',
                            label:'Книги'
                        },
                        {
                            color:'#ff4356',
                            label:'Js'
                        },

                    ]}
                    isRemovable
                />
                <AddListButton colors={DB.colors} />

            </div>
           
            <div className={'todo_tasks'}>
           
            </div>
        </div>
    )
}
export default Layout