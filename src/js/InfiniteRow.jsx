/*
 * Infinite Row component
 * Renders a row in the infinite list to represent a single item in the dataset
 */

import React from 'react';
import RenderCount from './RenderCount.js';

class InfiniteRow extends React.Component {

  shouldComponentUpdate(nextProps) {

    return nextProps.data.id !== this.props.data.id ||
      nextProps.data.name !== this.props.data.name ||
      nextProps.data.email !== this.props.data.email;

  }

  render() {

    // count number of renders from this component
    RenderCount.InfiniteRow++;

    // extract data
    let { id, name, email } = this.props.data;

    return (
      <div className="infinite-row">
        #{id} - {name} &lt;{email}&gt;
      </div>
    )

  }

}

export default InfiniteRow;
