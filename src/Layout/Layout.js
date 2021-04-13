import React,{useState,useEffect} from 'react';
import{Route,useHistory,useLocation} from 'react-router-dom'
import dataBase from '../localFireBase'
import './Layout.scss'
import {AiOutlineUnorderedList,AiOutlineCheck} from 'react-icons/ai';
import List from '../components/Menu/List.jsx'
import AddListButton from '../components/AddListButton/AddListButton'
import Tasks from '../components/Tasks/Tasks'

function Layout(){

    const [colorlList,setColorList] = useState();
    const [toDolist,setToDolist] = useState([]);
    const [activeList,setActiveList] = useState();

    let history = useHistory()
    let location = useLocation()
    console.log(history)

    const renameTitle=(id,title)=>{
        dataBase.collection('lists')
        .doc(id)
        .set({name: title},{merge: true})
    }


    useEffect(()=>{
        console.log('colors')
        dataBase.collection('colors')
        .orderBy('id')
        .onSnapshot((snapshot)=>{
            setColorList(snapshot.docs.map((item)=>{
                return{id:item.id,data:item.data()}
            }))
        })

    },[])

    useEffect(()=>{
        console.log('lists')
        dataBase.collection('lists')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>{
            console.log('render')
            setToDolist(snapshot.docs.map((item)=>{
                return{id:item.id,data:item.data()}
            }))
        })
        
    },[])

    useEffect(() => {
        const locationPath = location.pathname.split(['/lists/'])[1]
        setActiveList(locationPath)
    }, [location.pathname])

    return(
        <div className={'todo'}>
            <div className={'todo_sideBar'}>
                <List
                    onClickItem={()=>{
                        history.push(`/`)
                    }}
                    items={[
                        {
                            id:'allList',
                            data:{
                            icon:<AiOutlineUnorderedList/>,
                            name:'Все задачи',
                            active: !activeList
                            }
                        }
                    ]}

                />
                 <List
                 onRemove={(list)=>{
                    dataBase.collection('lists').doc(list).delete()
                 }}
                    items={toDolist}
                    onClickItem={list=>{
                        history.push(`/lists/${list}`)
                    }}
                    activeList={activeList}
                    isRemovable
                />
                <AddListButton colors={colorlList}/>

            </div>
           
            <div className={'todo_tasks'}>
                <Route exact path={'/'}>
                    {toDolist.map(list=>
                        <Tasks icon={<AiOutlineCheck/>}
                            key={list.id}
                            listId={list.id}
                            onEditTitle={renameTitle}
                            withoutEmpty
                        />
                        )}

                </Route>  
                <Route path={'/lists/:id'}>
                {toDolist && activeList && <Tasks icon={<AiOutlineCheck/>}
                        listId={activeList}
                        onEditTitle={renameTitle}
                />}
                </Route>
        





            </div>
        </div>
    )
}
export default Layout


// import React,{useState,useEffect} from 'react';
// import{Redirect, Route,Switch} from 'react-router-dom'
// import dataBase from '../localFireBase'
// import './Layout.scss'
// import {AiOutlineUnorderedList,AiOutlineCheck} from 'react-icons/ai';
// import List from '../components/Menu/List.jsx'
// import AddListButton from '../components/AddListButton/AddListButton'
// import Tasks from '../components/Tasks/Tasks'

// function Layout(){

//     const [colorlList,setColorList] = useState();
//     const [toDolist,setToDolist] = useState([]);
//     const [activeList,setActiveList] = useState();


//     const renameTitle=(id,title)=>{
//         dataBase.collection('lists')
//         .doc(id)
//         .set({name: title},{merge: true})
//     }


//     useEffect(()=>{
//         console.log('colors')
//         dataBase.collection('colors')
//         .orderBy('id')
//         .onSnapshot((snapshot)=>{
//             setColorList(snapshot.docs.map((item)=>{
//                 return{id:item.id,data:item.data()}
//             }))
//         })

//     },[])

//     useEffect(()=>{
//         console.log('lists')
//         dataBase.collection('lists')
//         .orderBy('timestamp','desc')
//         .onSnapshot((snapshot)=>{
//             setToDolist(snapshot.docs.map((item)=>{
//                 return{id:item.id,data:item.data()}
//             }))
//         })
        
//     },[])
//     return(
//         <div className={'todo'}>
//             <div className={'todo_sideBar'}>
//                 <List
                
//                     items={[
//                         {
//                             id:'allList',
//                             data:{
//                             icon:<AiOutlineUnorderedList/>,
//                             name:'Все задачи',
//                             }
//                         }
//                     ]}

//                 />
//                  <List
//                  onRemove={(list)=>{
//                     dataBase.collection('lists').doc(list).delete()
//                  }}
//                     items={toDolist}
//                     onClickItem={item=>{
//                         setActiveList(item);
//                     }}
//                     activeList={activeList}
//                     isRemovable
//                 />
//                 <AddListButton colors={colorlList}/>

//             </div>
           
//             <div className={'todo_tasks'}>    

//                 {toDolist && activeList && <Tasks icon={<AiOutlineCheck/>}
//                         listId={activeList}
//                         onEditTitle={renameTitle}
//                 />}





//             </div>
//         </div>
//     )
// }
// export default Layout


// function Layout(){

//     const [colorlList,setColorList] = useState();
//     const [toDolist,setToDolist] = useState([]);
//     const [activeList,setActiveList] = useState(null);

//     const history = useHistory()
//     const location = useLocation()


//     useEffect(()=>{
//         dataBase.collection('colors')
//         .orderBy('id')
//         .onSnapshot((snapshot)=>{
//             setColorList(snapshot.docs.map((item)=>{
//                 return{id:item.id,data:item.data()}
//             }))
//         })

//     },[])

//     useEffect(()=>{
//         dataBase.collection('lists')
//         .orderBy('timestamp','desc')
//         .onSnapshot((snapshot)=>{
//             setToDolist(snapshot.docs.map((item)=>{
//                 return{id:item.id,data:item.data()}
//             }))
//         })
        
//     },[])
    
//     return(
//         <div className={'todo'}>
//             <div className={'todo_sideBar'}>
//                 <List
                
//                     items={[
//                         {
//                             id:'allList',
//                             data:{
//                             icon:<AiOutlineUnorderedList/>,
//                             name:'Все задачи',
//                             }
//                         }
//                     ]}

//                 />
//                  <List
//                  onRemove={(list)=>{
                    
//                     dataBase.collection('lists').doc(list).delete()
//                     history.push('/')
//                  }}
//                     items={toDolist}
//                     onClickItem={item=>{
//                         setActiveList(item)
//                     }}
//                     activeList={activeList}
//                     isRemovable
//                 />
//                 <AddListButton colors={colorlList}/>

//             </div>
           
//             <div className={'todo_tasks'}>    
//              <Switch>
                 
//                         <Route exact path={'/:id'}
//                             component={()=><Tasks icon={<AiOutlineCheck/>}
//                             title={location.state.title}
//                         />}
//                         >
//                         </Route>
//                         <Redirect to={'/'}

                       
//                         >
             
                        

//                         </Redirect>
//              </Switch>




//             </div>
//         </div>
//     )
// }
// export default Layout