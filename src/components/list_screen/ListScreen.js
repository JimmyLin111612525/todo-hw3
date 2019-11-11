import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {changeNameTodoList,changeOwnerTodoList,sortTask,sortDate,sortComplete,removeList} from '../../store/actions/actionCreators.js';
import 'materialize-css/dist/css/materialize.min.css';
import {Modal,Button, Icon} from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: this.props.todoList.name,
        owner: this.props.todoList.owner,
        sort:true,
        delete:false
    }

    componentDidMount(){
        console.log(this.props.todoLists);
        var curList=this.props.todoList;
        var allLists=this.props.todoLists;
        var fireStore=getFirestore();
        fireStore.collection('todoLists').orderBy('name');
        //var fireStore=getFirestore();
        /*fireStore.collection('todoLists').get().then(function(lists){
            lists.forEach(function(doc){
                if(doc.id!==curList.id){
                    fireStore.collection('todoLists').doc(doc.id).delete();
                }
            })
        }).then(function(){
            console.log('here!');
            fireStore.collection('todoLists').doc(curList.id).update({created:Date.now()});
            var keys = Object.keys(allLists);
            console.log(Object.keys(allLists));
            for(var i=0;i<keys.length;i++){
                if(allLists[keys[i]].id!==curList.id){
                    allLists[keys[i]].created=Date.now();
                    fireStore.collection('todoLists').add(allLists[keys[i]]);
                }
            }  
        })*/
        //fireStore.collection('todoLists').orderBy('name');
    }

    handleChange = (e) => {
        const { target } = e;
        var fireStore=getFirestore();
        this.setState(state => ({
            ...state,
            [target.name]: target.value,
        }));
        if(target.name==='name'){
            var name=(target.value===""?'Unknown':target.value);
            fireStore.collection('todoLists').doc(this.props.todoList.id).update({name:name});
            this.props.dispatch(this.props.changeNameTodoList(this.props.todoList,name));
        }
        else if(target.name==='owner'){
            var owner=(target.value===""?'Unknown':target.value);
            fireStore.collection('todoLists').doc(this.props.todoList.id).update({owner:owner});
            this.props.dispatch(this.props.changeOwnerTodoList(this.props.todoList,owner));
        }
    }

    sortTask=()=>{
        this.props.dispatch(this.props.sortTask(this.props.todoList,this.state.sort));
        var fireStore=getFirestore();
        var lst=JSON.parse(JSON.stringify(this.props.todoList));
        lst.items.sort(function(a,b){
            if(a.description>b.description){
                return 1;
            }
            if(a.description<b.description){
                return -1;
            }else{
                return 0;
            }
        });

        if(!this.state.sort){
            lst.items.reverse();
        }
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({items:lst.items});

        this.setState({sort:!this.state.sort});
    }

    sortDate=()=>{
        this.props.dispatch(this.props.sortDate(this.props.todoList, this.state.sort));
        var fireStore=getFirestore();
        var lst=JSON.parse(JSON.stringify(this.props.todoList));
        lst.items.sort(function(a,b){
            if(a.due_date>b.due_date){
                return 1;
            }
            if(a.due_date<b.due_date){
                return -1;
            }
            else{
                return 0;
            }
        });

        if(!this.state.sort){
            lst.items.reverse();
        }
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({items:lst.items});
        this.setState({sort:!this.state.sort});
    }

    sortComplete=()=>{
        this.props.dispatch(this.props.sortComplete(this.props.todoList,this.state.sort));
        var fireStore=getFirestore();
        var lst=JSON.parse(JSON.stringify(this.props.todoList));
        lst.items.sort(function(a,b){
            if(a.completed>b.completed){
                return 1;
            }
            if(a.completed<b.completed){
                return -1;
            }
            else{
                return 0;
            }
        });
        if(!this.state.sort){
            lst.items.reverse();
        }
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({items:lst.items});
        this.setState({sort:!this.state.sort});
    }

    removeList=()=>{
       //this.props.dispatch(this.props.removeList(this.props.todoLists,this.props.todoList));
        var fireStore=getFirestore();
        
        //fireStore.collection('todoLists').doc(this.props.todoList.id).delete().then(window.location.assign('/'));
        console.log(this.props.todoList.id);
        fireStore.collection('todoLists').doc(this.props.todoList.id).delete();
        this.setState({delete:true});
    }

    render() {
        const auth = this.props.auth;
        //const fireStore=getFirestore();
        //fireStore.collection('todoLists').orderBy('owner');
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(this.state.delete){
            return <Redirect to='/'/>;
        }

        const trigger = <Button className="waves-effect waves-light"><Icon className='delete-icon'>delete</Icon></Button>;
        return (
            <div className="container list-screen-container">
                <nav className='lime darken-4 heading'>
                    <a className='brand-logo heading-text'>Todo List</a>
                    <a className='delete-modal-btn'>{
                        <Modal header={"Delete List"} 
                                trigger={trigger}
                                actions={
                                    <div>
                                        <Button modal="close" waves="light" className="green delete-confirm" onClick={this.removeList}>YES</Button>
                                        <Button modal="close" waves="light" className="red darken-2 delete-cancel">NO</Button>
                                    </div>
                                  }>
                            <p>Are you sure you want to delete this list?</p>
                            <p>
                                This action is not undoable.
                            </p>
                        </Modal>}
                    </a>
                </nav>

                <div>
                    <label for="name"><strong>Name</strong></label>
                </div>

                <div className="input-field">
                    <input className="validate" placeholder="Name" type="text" name="name" id="name" onChange={this.handleChange} value={this.state.name} />
                </div>

                <div>
                    <label for="owner"><strong>Owner</strong></label>
                </div>

                <div className="input-field">
                    <input className="validate" placeholder="Owner" type="text" name="owner" id="owner" onChange={this.handleChange} value={this.state.owner} />
                </div>

                <nav className='column-header grey darken-3'>

                </nav>

                <span className="sort-text">SORT BY:</span>
                <a className="waves-effect waves-light btn desc-sort" onClick={this.sortTask}>{"Task name (Abc)"}</a>
                <a className="waves-effect waves-light btn date-sort" onClick={this.sortDate}>{'Date assigned 📆'}</a>
                <a className="waves-effect waves-light btn comp-sort" onClick={this.sortComplete}>{'Completion ✅'}</a>

                

                <ItemsList todoList={todoList} />
                <a className="btn-floating btn-large waves-effect waves-light blue add-task hoverable z-depth-1"><i className="material-icons">add</i></a>

                

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoLists,
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps,{changeNameTodoList,changeOwnerTodoList,sortTask,sortDate,sortComplete,removeList}),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);