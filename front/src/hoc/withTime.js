import React from 'react';
import axios from 'axios';

const withData = url => Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: [], reqComleted: false }
    }
    async loadData() {
      await this.setState({data: [], reqComleted: false})
      let endpoint = typeof url === 'function'
        ? url(this.props)
        : url;
        axios.get(endpoint)
        .then(({data}) => this.setState({data, reqComleted: true}))
        .catch(e => {
          this.setState({data: [], reqComleted: false})
        });
    }
    componentDidMount() {
      this.loadData();
    }
    componentDidUpdate(prevProps) {
      if (prevProps.date !== this.props.date) {
        this.loadData();
      }
     
    }
    render() {

      return this.state.reqComleted 
        ? <Component {...this.props} {...this.state} />
        : <div>Loading...</div>
    }
  }
}

export default withData;