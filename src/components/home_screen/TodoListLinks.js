import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import {addLists,recentList} from '../../store/actions/actionCreators.js';

class TodoListLinks extends React.Component {

    state={
        todoLists:null
    }
    /*constructor(props){
        super(props);
    }*/
    setLists=(lists)=>{
        console.log(lists);
        this.props.addLists(lists);
    }

    handleRecentList=(e)=>{
        if(e.target.tagName==='SPAN'){
            var lstName=e.target.innerHTML;
            var todoLists=this.props.todoLists;
            var lst=null;
            console.log(todoLists);
            for(var i=0;i<todoLists.length;i++){
                if(todoLists[i].name===lstName){
                    lst=todoLists[i];
                    todoLists.splice(i,1);
                    break;
                }
            }
            console.log(lst);
            var newTodoLists=[lst,...todoLists];
            //console.log(newTodoLists);
            console.log(this.props.recentList(newTodoLists));
        }
    }

    render() {
        
        var todoLists = this.props.todoLists;
        console.log(this.props.todoLists);
        /*if(this.state.todoLists!==null){
            todoLists=this.state.todoLists;
        }*/
        this.setLists(todoLists);
        if(todoLists!==undefined){
            todoLists.sort(function(a,b){
                console.log(a.created,b.created,typeof(a.created));
                if(a.created>b.created){
                    return -1;
                }
                if(a.created<b.created){
                    return 1;
                }
                else{
                    return 0;
                }
                
            })
        }
        console.log(todoLists);
        return (
            <div className="todo-lists section" onClick={this.handleRecentList}>
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

export default compose(connect(mapStateToProps,{addLists,recentList}))(TodoListLinks);