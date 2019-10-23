import React from 'react';
import * as toxicity from '@tensorflow-models/toxicity';
import styled from 'styled-components';
import {DebounceInput} from 'react-debounce-input';
import PredictionTable from './predictionTable';

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
const predict = async (input) => {
  // The minimum prediction confidence.
  const threshold = 0.9;
  const sentences = [input];
  const model = await toxicity.load(threshold);
  const predictions = await model.classify(sentences);
  console.log('***predictions', predictions);
  return predictions;
};

const InputField = styled.input`
    background: transparent;
`;

class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          prediction: [],
          offense: null,
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
   async handleChange(event) {
        console.log('****input', event.target.value);
        let predictions = await predict(event.target.value);
        console.log('***predictions', predictions);
        if(predictions.length > 0) {
          this.setState({
            value: event.target.value,
            prediction: predictions
          });
        }
    }
  
    async handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Hello! How are you doing?<br/>
              {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
              <DebounceInput
              minLength={2}
              debounceTimeout={500}
              onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" /><br/>
          </form>
          <PredictionTable text={this.state.value} predictions={ this.state.prediction }/>
        </div>
      );
    }
  };

export default Input;