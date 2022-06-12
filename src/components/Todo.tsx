const Todo = (props: any) => {
    let completed = '';
    if(props.completed) {
        completed = ' completed'
    }
    return (
        <div className='todo' draggable={true} onDrop={props.drop} onDragStart={props.drag} onDragOver={props.allowDrag} id={props.index}>
            <div className={`todoContent${completed}`} onClick={props.todoClick} tabIndex={props.index}>
                <div className='checkBubble' tabIndex={props.index}>
                    <img className='check' src='./images/icon-check.svg' alt='complete' tabIndex={props.index} />
                </div>
                <p className='todoText' tabIndex={props.index}>{props.text}</p>
            </div>
            <img className='remove' src="./images/icon-cross.svg" alt='remove' onClick={props.removeClick} tabIndex={props.index}/>
        </div>
    )
}

export default Todo;