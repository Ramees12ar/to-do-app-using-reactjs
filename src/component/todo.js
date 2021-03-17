import React, { Component } from 'react';
import './todo.css';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            item: ""
        }
    }
    getItem = (e) => {
        this.setState({ item: e.target.value })
    }
    addItem = () => {
        var newValue = this.state.item;
        if(newValue == ""){
            alert("please enter an item");
        }
        else{
            var str = localStorage.getItem("localData");
            if(str != null){
                var arr = JSON.parse(str); 
            }
            this.setState({data: arr });
            console.log(this.state.data);
            arr.push(newValue);
            console.log(arr);
            localStorage.setItem("localData", JSON.stringify(arr) );
            // var arr = this.state.data;
            // arr.push(newValue);
            // console.log(arr);
            this.setState({ data: arr });
            console.log(this.state.data);
            this.setState({ item: "" });
        }
    }
    removeItem = (k) => {
        var arr = this.state.data;
        arr.splice(k,1);
        this.setState({data:arr})
        localStorage.setItem("localData", JSON.stringify(arr) );
    }

    editItem = (k) =>  {
        var arr = this.state.data;
        let newData = arr.filter(function (id,index) {
            return index == k;
        });
        let b=newData[0];
        var updItem = prompt("enter the updated item", b);
        arr[k]=updItem;
        this.setState({ data: arr });
    }

    render() {
        return (
            <div class="head" >
                <h1>Todo List</h1>
                <input className="input" value={this.state.item} type="text" onChange={this.getItem} placeholder="Enter a task" />
                <button onClick={this.addItem}>Add</button>
                <table>
                    <thead></thead>
                    <tbody>
                    {
                        this.state.data.map((i, k) => {
                            return (
                                <tr id={k}>
                                    <div className="items">
                                        <td className="item" id={i}>{i}</td>
                                        <td><button onClick={() => (this.removeItem(k))}>delete</button></td>
                                        <td><button onClick={() => (this.editItem(k))}>edit</button></td>
                                    </div>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>


            </div>
        );
    }
};




export default Todo;
