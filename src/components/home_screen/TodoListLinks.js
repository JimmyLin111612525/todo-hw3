import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import {addLists} from '../../store/actions/actionCreators.js';

class TodoListLinks extends React.Component {
    /*constructor(props){
        super(props);
    }*/
    setLists=(lists)=>{
        console.log(lists);
        this.props.addLists(lists);
    }
    render() {
        const todoLists = this.props.todoLists;
        console.log(this.props.todoLists);
        this.setLists(todoLists);
        console.log(todoLists);
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps,{addLists}))(TodoListLinks);