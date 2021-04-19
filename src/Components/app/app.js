import React from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import ListFilter from "../list-item-filter/list-item-filter";
import TodoList from "../todo-list/todo-list";
import NewListItem from '../new-list-item/new-list-item';
import './app.css'

export default class App extends React.Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Build App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'All'
    }


    createTodoItem(label) {
        return {label,
            important: false,
            id: this.maxId++}
    }

    deleteItem = (id) => {

        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)];
            return{
                todoData: newArray
            }
        })
    };

    addItem = (text) => {
        if(text !== '') {
            const newItem = this.createTodoItem(text);

            this.setState(({todoData}) => {
                const newArr = [...todoData, newItem];
                return {
                    todoData: newArr
                }
            })
        }
    };

    toggleProperty = (arr, id, propName) => {
            const idx = arr.findIndex((el) => el.id === id);
            const oldItem = arr[idx];
            const newItem = {...oldItem, [propName]: !oldItem.[propName]};
            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)];
    }

    onToggleImportant = (id) =>{
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    }

    onSearchChange = (term) => {
        this.setState({term})
    };

    search(items, term) {
        if(term.length === 0) {
                return items;
            }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }
    filterChange = (filter) => {
        this.setState({filter});
    }

    filter(items, filter){
        switch (filter){
            case 'All':
                console.log(filter);
                return items;
            case 'Active':
                return items.filter((el) => !el.done);
            case 'Done':
                return items.filter((el) => el.done);
            default:
                return items;
        }
    }

    render() {
        const {todoData, term, filter} = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.filter((el) => !el.done).length;
        return (
            <div className='app'>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="search-filter">
                    <SearchPanel onSearchChange={(term) => {
                        this.onSearchChange(term)
                    }
                    }/>
                    <ListFilter
                    onFilter={(filter) => {
                        this.filterChange(filter)
                    }}/>
                </div>
                <TodoList todos={visibleItems}
                          onDeleted={(id) => {this.deleteItem(id)}}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <NewListItem onAdded={(text) => {
                this.addItem(text)}
                }/>
            </div>);
    }
}