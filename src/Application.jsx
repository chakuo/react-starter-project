import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'

class Application extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>Hello World</div>
  }

  static propTypes = {};

  static defaultProps = {};
}

ReactDOM.render(<Application/>, document.getElementById('container'))
