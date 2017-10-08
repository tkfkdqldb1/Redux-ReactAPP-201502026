import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
    render() {
        return (
            <h1><br></br>
            Hello World!!!!
            <br></br>
            <h3>My name is Seonhee Kim </h3>
            <br></br>
            Current VALUE: { this.props.value }</h1>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        value: state.counter.value
    };
}

Counter = connect(mapStateToProps)(Counter);

export default Counter;
