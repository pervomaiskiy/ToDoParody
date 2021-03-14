

export default ({icon,text})=>{
    return(
        <ul className={'todo_list'}>
            <li className={'active'}> 
                <i>
                    {icon}
                </i>
                <span>{text}</span>  
            </li>
        </ul>
    )
}