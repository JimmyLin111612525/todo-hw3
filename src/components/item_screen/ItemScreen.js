import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemScreen extends Component{
    render(){
        console.log(`we're in item screen!`);
        return(
            <div>
                <button>Clear Database</button>
                <button>Reset Database</button>
            </div>
        )
    }
}

export default withRouter(ItemScreen);