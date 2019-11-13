import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-2 todo-list-link lime darken-2 hoverable list-card">
                <div className="card-content white-text text-darken-3 waves-effect waves-block waves-light z-depth-1 list-card-text-container">
                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;