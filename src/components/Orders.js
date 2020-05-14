import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Orders extends Component {
    render(){
        return(
            <div className="page-division">
                <Sidebar/>
                <div className="page-content">
                    <h2>ORDENES</h2>
                </div>
            </div>
        )
        
    }
}

export default Orders;