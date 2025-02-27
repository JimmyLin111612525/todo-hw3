import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import {getFirestore} from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';
import {addList} from '../../store/actions/actionCreators.js';
import {Modal,Button, Icon} from 'react-materialize';

import TodoListLinks from './TodoListLinks'

class HomeScreen extends Component {
    state={
        id:null
    }

    handleNewList=(e)=>{
        console.log(e.target);
        e.preventDefault();
        console.log('NEW LIST!!');
        var newList={
            items:[],
            name:'Unknown',
            owner:'Unknown',
            created:Date.now()
        }
        //var id;
        var fireStore=getFirestore();
        fireStore.collection('todoLists').add(newList).then(doc =>{
            this.setState({id:doc.id});
            newList.id=doc.id;
            this.props.dispatch(this.props.addList(newList));
        })

        //console.log(id);
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        if(this.state.id){
            console.log(this.state);
            return <Redirect to={`/todolist/${this.state.id}`}/>
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container" onClick={this.handleNewList}>
                                <Button className="home_new_list_button btn-large hoverable " style={{width:'40%',height:'20%'}} >
                                    Create a New To Do List
                                </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {

        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps,{addList}),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(HomeScreen);