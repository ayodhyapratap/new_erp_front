import React from "react";


export default class TotalAmountDue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            type:'DETAILED',
            loading:true,
        }
    }

    render(){
        return <div>
            <h2>Total Amount Due</h2>
        </div>
    }
}