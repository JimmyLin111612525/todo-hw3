//import  { getFirestore } from 'react-firestore';

const initState = {
    todoLists: []
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        case 'ADD_LISTS':
            console.log(state);

            console.log(action.lists);
            return {
                ...state,
                todoLists:action.lists
            }
        case 'CHANGE_NAME':
            console.log('name change');
            console.log(action);
            
            var lst=JSON.parse(JSON.stringify(state.todoLists));
            for(var i=0;i<lst.length;i++){
                if(lst[i].key===action.todoList.key){
                    lst[i].name=action.name;
                    console.log(lst[i].name);
                    break;
                }
            }
            console.log(lst);
            var lists=JSON.parse(JSON.stringify(state.todoLists));
                for(var i=0;i<lists.length;i++){
                    if(lists[i].id===lst.id){
                        lists[i]=lst;
                    }
                }
            return {
                ...state,
                todoLists:lists
            }
        case 'CHANGE_OWNER':
            console.log('owner change');
            var lst=JSON.parse(JSON.stringify(state.todoLists));
            for(var i=0;i<lst.length;i++){
                if(lst[i].key===action.todoList.key){
                    lst[i].owner=action.owner;
                    break;
                }
            }

            var lists=JSON.parse(JSON.stringify(state.todoLists));
                for(var i=0;i<lists.length;i++){
                    if(lists[i].id===lst.id){
                        lists[i]=lst;
                    }
                }

            return{
                ...state,
                todoLists:lists
            }
        case 'MOVE_UP':
            console.log('movin up!');
            console.log(action);
            var lst=JSON.parse(JSON.stringify(action.list));
            console.log(action.item.key);
            var index=action.item.key;
            if(index===0){
                return state;
            }else{
                var temp=lst.items[index-1];
                lst.items[index-1]=lst.items[index]
                lst.items[index]=temp;
                for(var i=0;i<lst.items.length;i++){
                    lst.items[i].key=i;
                }

                var lists=JSON.parse(JSON.stringify(state.todoLists));
                for(var i=0;i<lists.length;i++){
                    if(lists[i].id===lst.id){
                        lists[i]=lst;
                    }
                }

                console.log(lst);
                return{
                    ...state,
                    todoLists:lists
                }
            }

        case 'MOVE_DOWN':
            console.log('movin down');
            var lst=JSON.parse(JSON.stringify(action.list));
            var index=action.item.key;
            if(index===lst.items.length-1){
                return state;
            }else{
                var temp=lst.items[index+1];
                lst.items[index+1]=lst.items[index];
                lst.items[index]=temp;
                for(var i=0;i<lst.items.length;i++){
                    lst.items[i].key=i;
                }
                console.log(lst);
                var lists=JSON.parse(JSON.stringify(state.todoLists));
                for(var i=0;i<lists.length;i++){
                    if(lists[i].id===lst.id){
                        lists[i]=lst;
                    }
                }
                return{
                    ...state,
                    todoLists:lists
                }
            }

        case 'REMOVE_ITEM':
            console.log('removing item');
            var lst=JSON.parse(JSON.stringify(action.list));
            var index=action.item.key;
            if(lst.items.length===1){
                lst.items.pop();
            }else{
                lst.items.splice(index,1);
                for(var i=0;i<lst.items.length;i++){
                    lst.items[i].key=i;
                }
            }

            var lists=JSON.parse(JSON.stringify(state.todoLists));
                for(var i=0;i<lists.length;i++){
                    if(lists[i].id===lst.id){
                        lists[i]=lst;
                    }
                }

            console.log(lst);
            return{
                ...state,
                todoLists:lists
            }

        case 'SORT_TASK':
            console.log('sorting by task');
            var lst=JSON.parse(JSON.stringify(action.list));
            lst.items.sort(function(a,b){
                if(a.description>b.description){
                    return 1;
                }
                if(a.description<b.description){
                    return -1;
                }
                else{
                    return 0;
                }
            });
            if(!action.rev){
                lst.items.reverse();
            }
            var lists=JSON.parse(JSON.stringify(state.todoLists));
                for(var i=0;i<lists.length;i++){
                    if(lists[i].id===lst.id){
                        lists[i]=lst;
                    }
                }

            return{
                ...state,
                todoLists:lists
            }

        case 'SORT_DATE':
            console.log('sortying by dayt');
            var lst=JSON.parse(JSON.stringify(action.list));
            lst.items.sort(function(a,b){
                if(a.due_date>b.due_date){
                    return 1;
                }
                if(a.due_date>b.due_date){
                    return -1;
                }
                else{
                    return 0;
                }
            });

            if(!action.rev){
                lst.items.reverse();
            }

            var lists=JSON.parse(JSON.stringify(state.todoLists));
                for(var i=0;i<lists.length;i++){
                    if(lists[i].id===lst.id){
                        lists[i]=lst;
                    }
                }

            return{
                ...state,
                todoLists:lists
            }

        case 'SORT_COMPLETE':
            console.log('sorting by complete');
            var lst=JSON.parse(JSON.stringify(action.list));
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
            if(!action.rev){
                lst.items.reverse();
            }

            var lists=JSON.parse(JSON.stringify(state.todoLists));
                for(var i=0;i<lists.length;i++){
                    if(lists[i].id===lst.id){
                        lists[i]=lst;
                    }
                }
            return{
                ...state,
                todoLists:lists
            }
        
        /*case 'REMOVE_LIST':
            var lst=action.lists;
            console.log(lst);
            
            lst.delete(action.list.id);

            return{
                ...state,
                todoLists:lst
            }*/

        case 'ADD_LIST':
            console.log('adding list')
            var lst=JSON.parse(JSON.stringify(state.todoLists));
            var contains=false;
            console.log(lst[0].id);
            console.log(action.list.id);
            for(var i=0;i<lst.length;i++){
                if(lst[i].id===action.list.id){
                    contains=true;
                    break;
                }
            }
            if(contains===false){
                lst.unshift(action.list);
                console.log(lst);
            }
            
            
            return{
                ...state,
                todoLists:lst
            }
        
        default:
            return state;
            break;
    }
};

export default todoListReducer;