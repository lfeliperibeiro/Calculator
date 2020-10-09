import React, { Component } from 'react'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0
}

export default class Layout extends Component {
  state = {...initialState}
  constructor (props) {
    this.clearMemory = this.clearMemory.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.addDigit = this.addDigit.bind(this)
  }
  clearMemory() {
    this.setState({ ...initialState })
  }

  setOperation(operation){
    if (this.state.current === 0){
      this.setState({operation, current: 1, clearDisplay: true})
    }else {
      const equals = operation === '='
      const currentOperation = this.state.operation
      const values = [...this.state.values]
      try{
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
      }catch(err) {
        values[0] = this.state.values[0]
      }
      values[1] = 0
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

 
}