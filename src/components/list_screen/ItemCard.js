import React from 'react';
import { connect } from 'react-redux';
import {moveUp,moveDown,removeItem} from '../../store/actions/actionCreators.js';
import { getFirestore } from 'redux-firestore';

import PropTypes from 'prop-types';
//import 'materialize-css/dist/css/materialize.min.css';
//import 'materialize-css/dist/js/materialize.min.js';

class ItemCard extends React.Component {

    moveUp=(e)=>{
        e.preventDefault();
        var ret=this.props.dispatch(moveUp(this.props.todoList,this.props.item));
        if(this.props.item.key!==0){
            var fireStore=getFirestore();
            var index=this.props.item.key;
            var lst=this.props.todoList;
            var temp=lst.items[index-1];
            lst.items[index-1]=lst.items[index];
            lst.items[index]=temp;
            for(var i=0;i<lst.items.length;i++){
                lst.items[i].id=i;
                lst.items[i].key=i;
            }
            fireStore.collection('todoLists').doc(this.props.todoList.id).update({items:lst.items});
        }
        console.log(ret);
    }

    moveDown=(e)=>{
        e.preventDefault();
        this.props.dispatch(moveDown(this.props.todoList,this.props.item));
        if(this.props.item.key!==this.props.todoList.items.length-1){
            var fireStore=getFirestore();
            var index=this.props.item.key;
            var lst=this.props.todoList;
            var temp=lst.items[index+1];
            lst.items[index+1]=lst.items[index];
            lst.items[index]=temp;
            for(var i=0;i<lst.items.length;i++){
                lst.items[i].id=i;
                lst.items[i].key=i;
            }
            fireStore.collection('todoLists').doc(this.props.todoList.id).update({items:lst.items});

        }
    }

    removeItem=(e)=>{
        e.preventDefault();
        this.props.dispatch(removeItem(this.props.todoList,this.props.item));
        var fireStore=getFirestore();
        var lst=this.props.todoList;
            var index=this.props.item.key;
            if(lst.items.length===1){
                lst.items.pop();
            }else{
                lst.items.splice(index,1);
                for(var i=0;i<lst.items.length;i++){
                    lst.items[i].key=i;
                    lst.items[i].id=i;
                }
            }
            fireStore.collection('todoLists').doc(this.props.todoList.id).update({items:lst.items});
            console.log(lst);
    }

    handleClick=(e)=>{
        e.preventDefault();
    }

    render() {
        var upClassName="fab-icon-holder up";
        var downClassName='fab-icon-holder down';

        if(this.props.item.key===0){
            upClassName="fab-icon-holder up grey";
        }

        if(this.props.item.key===this.props.todoList.items.length-1){
            downClassName='fab-icon-holder down grey';
        }



        console.log(this.props.todoList.items);
        const { item } = this.props;  
        var complete=(item.completed?'Complete':'In progress');
        var completedClassName=(item.completed?'card-completed green-text text-darken-3':'card-completed red-text text-darken-2');
        return (
            <div className="card z-depth-1 todo-list-link lime darken-2 waves-effect waves-block waves-light hoverable">
                <div className="card-content black-text text-darken-3 z-depth-1">
                    <span className="card-title">{item.description}</span>
                    <div className="card-categories grey-text text-darken-2">
                        <span className="assigned-to">Assigned to:</span>
                        <span className="due-date">Due date:</span>
                        <span className="completed">Completed:</span>
                    </div>
                    <div className="card-info white-text">
                        <span className="card-assigned-to">{item.assigned_to}</span>
                        <span className="card-due-date">{item.due_date}</span>
                        <span className={completedClassName}>{complete}</span>
                    </div>
                        <div className="fab-container" onClick={this.handleClick}>
                            <div className="fab fab-icon-holder">
                                <a className="vert-ellipse">{'⋮'}</a>
                            </div>
                            <ul className="fab-options">
                                <li>
                                    <div className={upClassName} onClick={this.moveUp}>
                                        <a className="up-arrow">{'↑'}</a>
                                    </div>
                                </li>

                                <li>
                                    <div className={downClassName} onClick={this.moveDown}>
                                        <a className="down-label">{'↓'}</a>
                                    </div>
                                </li>

                                <li>
                                    <div className="fab-icon-holder delete" onClick={this.removeItem}>
                                        <a className="delete-symbol">{'✖'}</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                </div>
            </div>
        );
    }
}

/*const mapStateToProps = (state) => {
  const { todoLists } = state.firestore.data;
  return {
    todoLists
  };
};*/

export default connect()(ItemCard);
/*

*/