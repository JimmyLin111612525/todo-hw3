import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
//import 'materialize-css/dist/css/materialize.min.css';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="item-list section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <Link to={`/todoList/${todoList.id}/item/${item.key}`} key={item.id}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>    
                    );})
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ])
)(ItemsList);