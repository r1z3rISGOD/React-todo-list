import React from "react";
import './list-item-filter.css';

export default class ListFilter extends React.Component {

    activeFilter = (text, id1, id2, id3) => {
        const activeClass = document.getElementById(`${id1}`);
        const nonactiveClass1 = document.getElementById(`${id2}`);
        const nonactiveClass2 = document.getElementById(`${id3}`);
        activeClass.classList.add('btn-info');
        nonactiveClass1.classList.remove('btn-info');
        nonactiveClass2.classList.remove('btn-info');
        return this.props.onFilter(text)
    }

    render() {
        return (
            <div className='btn-group'>
                <button id='1' onClick={() => {this.activeFilter('All', '1', '2', '3')}} type='button' className='btn list-item-filter-btn btn-info'>All</button>
                <button id='2' onClick={() => {this.activeFilter('Active', '2', '1', '3')}} type='button' className='btn list-item-filter-btn'>Active</button>
                <button id='3' onClick={() => {this.activeFilter('Done', '3', '1', '2')}} type='button' className='btn list-item-filter-btn'>Done</button>
            </div>
        );
    };
}