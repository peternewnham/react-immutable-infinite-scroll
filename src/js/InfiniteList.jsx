/*
 * Infinite List component
 * Renders the list and generates rows from the data
 */

import React from 'react';
import InfiniteRow from './InfiniteRow.jsx';
import RenderCount from './RenderCount.js';

class InfiniteList extends React.Component {

  /**
   * Returns an InfiniteRow component for a data item
   */
  generateRow(data) {

    // generate key so React knows when a row already exists, or is new
    const key = `row-${data.id}`;

    return <InfiniteRow key={key} data={data} />;

  }

  render() {

    // count number of renders from this component
    RenderCount.InfiniteList++;

    // generate the rows from the received data
    let rows = this.props.data.map(this.generateRow);

    return (
      <div>
        <h2>Infinite List</h2>
        {rows}
      </div>
    )

  }

}

export default InfiniteList;
