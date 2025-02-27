// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECDTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

export function registerSuccess() {
    return { type: 'REGISTER_SUCCESS' }
};
export function registerError(error) { 
    return { type: 'REGISTER_ERROR', error }
};
export function loginSuccess() {
    return { type: 'LOGIN_SUCCESS' }
};
export function loginError(error) {
    return { type: 'LOGIN_ERROR', error }
};
export function logoutSuccess() {
    return { type: 'LOGOUT_SUCCESS' }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS TODO LIST UPDATES
export function createTodoList(todoList) {
    return {
        type: 'CREATE_TODO_LIST',
        todoList
    }
}
export function changeNameTodoList(todoList,name){
    console.log(todoList);
    return{
        type:'CHANGE_NAME',
        todoList,
        name
    }
}
export function changeOwnerTodoList(todoList,owner){
    return{
        type:'CHANGE_OWNER',
        todoList,
        owner
    }
}
export function createTodoListError(error) {
    return {
        type: 'CREATE_TODO_LIST_ERROR',
        error
    }
}

//blah
export function addLists(lists){
    console.log(`WE'RE ADDING IT BABY`);
    return{
        type:'ADD_LISTS',
        lists
    }
}

export function moveUp(list,item){
    return{
        type:'MOVE_UP',
        list,
        item
    }
}

export function moveDown(list,item){
    return{
        type:'MOVE_DOWN',
        list,
        item
    }
}

export function removeItem(list,item){
    return{
        type:'REMOVE_ITEM',
        list,
        item
    }
}

export function sortTask(list,rev){
    return{
        type:'SORT_TASK',
        list,
        rev
    }
}

export function sortDate(list,rev){
    return{
        type:'SORT_DATE',
        list,
        rev
    }
}

export function sortComplete(list,rev){
    return{
        type:'SORT_COMPLETE',
        list,
        rev
    }
}

export function removeList(lists,list){
    return{
        type:'REMOVE_LIST',
        lists,
        list
    }
}

export function addList(list){
    return{
        type:'ADD_LIST',
        list
    }
}


export function addItem(list,item){
    return{
        type:'ADD_ITEM',
        list,
        item
    }
}

export function deleteNewItem(list,item){
    return{
        type:'DELETE_NEW_ITEM',
        list,
        item
    }
}

export function editItem(list,item,desc,assign,date,complete){
    return{
        type:'EDIT_ITEM',
        list,
        item,
        desc,
        assign,
        date,
        complete
    }
}

export function recentList(lists){
    return{
        type:'RECENT_LIST',
        lists,

    }
}