import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {editItem,deleteNewItem} from '../../store/actions/actionCreators.js';

class ItemScreen extends Component {
    state = {
        description: this.props.todoList.items[this.props.idb].description,
        assigned_to:this.props.todoList.items[this.props.idb].assigned_to,
        due_date:this.props.todoList.items[this.props.idb].due_date,
        completed:this.props.todoList.items[this.props.idb].completed,
        goBack:false
    }

    handleDescription=(e)=>{
        var itemIndex=this.props.idb;
        var curList=this.props.todoList;
        const { target } = e;
        //console.log(target.value);
        this.setState({description:target.value});
        
        //console.log(this.props.descriptionChange(curList,curList.items[itemIndex],description));

        //database
        //curList.items[itemIndex].description=description;
        /*console.log(curList.items);
        console.log(curList.id);*/
    }

    handleAssignedTo=(e)=>{
        var itemIndex=this.props.idb;
        var curList=this.props.todoList;
        const { target } = e;
        this.setState({assigned_to:target.value});
        
        //console.log(assigned_to);
    }

    handleDate=(e)=>{
        const{target}=e;
        this.setState({due_date:target.value});
        
    }

    handleComplete=(e)=>{
        const {target}=e;
        this.setState({completed:target.checked});
        var checked=target.checked;
        console.log(checked);
    }

    handleCancel=()=>{
        this.setState({goBack:true});
        if(this.props.todoList.items[this.props.idb].new){
            var curList=this.props.todoList;
            var item=curList.items.pop();
            console.log(this.props.deleteNewItem(this.props.todoList,item));
            var fireStore=getFirestore();
            fireStore.collection('todoLists').doc(curList.id).update({items:curList.items});
        }
    }

    handleSubmit=()=>{
        
        
        console.log(this.props.todoList);
        
        var curList=this.props.todoList;
        var itemIndex=this.props.idb;
        var item=curList.items[itemIndex];
        console.log(item.new);
        var description=(this.state.description.trim()===''?'Unknown':this.state.description.trim());
        var assigned_to=(this.state.assigned_to.trim()===''?'Unknown':this.state.assigned_to.trim());
        var due_date=(this.state.due_date.trim()===''?'0000-00-00':this.state.due_date.trim());
        var checked=this.state.completed;
        console.log(this.props.editItem(curList,curList.items[itemIndex],description,assigned_to,due_date,checked));

        item.description=description;
        item.assigned_to=assigned_to;
        item.due_date=due_date;
        item.completed=checked;
        var fireStore=getFirestore();
        if(item.new){
            delete item.new;
        }
        fireStore.collection('todoLists').doc(curList.id).update({items:curList.items});
        this.setState({goBack:true});
    }

    handleDelete=()=>{
        console.log('we in here');
        console.log(this.props.todoList.items[this.props.idb]);
        if(this.props.todoList.items[this.props.idb].new!=null && this.props.todoList.items[this.props.idb].new!=undefined){
            var fireStore=getFirestore();
            var curList=this.props.todoList;
            curList.items.splice(this.props.idb,1);
            fireStore.collection('todoLists').doc(curList.id).update({items:curList.items});
        }
    }

    render() {
        var lst=this.props.todoList;
        console.log(this.props.todoList);
        window.addEventListener('popstate',this.handleDelete);
        console.log(this.props.todoList.items[this.props.idb]);
        /*console.log(this.props.id);
        console.log(this.props.idb);*/
        if(this.state.goBack){
            this.setState({goBack:false});
            return <Redirect to={`/todoList/${this.props.id}`} />
        }
        console.log(`we're in item screen!`);
        return (
            <div class="row">
                <form class="col s12">
                    <div class="row">
                        <div>
                            <label for="description" id='desc_label'>Description</label>
                        </div>
                        <div class="input-field col s12">
                            <input value={this.state.description} id="description" type="text" onChange={this.handleDescription} class="validate"/>
                            
                        </div>
                    </div>
                    <div class='row'>
                        <div>
                            <label for="assigned_to" id='ass_label'>Assigned to</label>
                        </div>
                        <div class="input-field col s12">
                            <input value={this.state.assigned_to} id="assigned_to" type="text" onChange={this.handleAssignedTo} class="validate"/>
                            
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <input type="date" class="datepicker" value={this.state.due_date} onChange={this.handleDate}/>
                            <label for='datepicker'>Due date</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            
                            <label for="complete">
                                <input type="checkbox" id='complete' checked={this.state.completed} onChange={this.handleComplete}/>
                                <span>Complete</span>
                            </label>
                        </div>
                    </div>
                    <div class="row">
                        <a className="waves-effect waves-light btn submit green darken-1" onClick={this.handleSubmit}>Submit</a>
                        <a className="waves-effect waves-light btn cancel red darken-2" onClick={this.handleCancel}>cancel</a>
                    </div>
                    
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    console.log(id);
    const { idb } = ownProps.match.params;
    console.log(idb);
    //console.log(itemId);
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    todoList.id = id;

    return {
        todoLists,
        todoList,
        id,
        idb,
        auth: state.firebase.auth,
    };
};

export default connect(mapStateToProps,{editItem,deleteNewItem})(ItemScreen);