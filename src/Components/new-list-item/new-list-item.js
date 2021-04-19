import React from "react";
import './new-list-item.css'



export default class NewListItem extends React.Component{

    state = {
        label: ''
    }
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onAdded(this.state.label);
        this.setState({
            label: ''
        });
    }
    render() {
return(
    <form className="new-list" onSubmit={this.onSubmit}>
        <input maxLength='30' value={this.state.label} onChange={this.onLabelChange} className='form-control new-list-item name-input' type='text' placeholder='New Todo!'/>
        <button className='btn btn-outline-secondary list-item-filter-btn'>Add</button>
    </form>
);
    }
}