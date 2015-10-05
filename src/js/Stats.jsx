import React from 'react';
import RenderCount from './RenderCount.js';

class Stats extends React.Component {

  render() {

    return (
      <div className="stats">
        <div>
          <h3>Render Count</h3>
          <ul>
            <li>App: {RenderCount.App}</li>
            <li>InfiniteList: {RenderCount.InfiniteList}</li>
            <li>InfiniteRow: {RenderCount.InfiniteRow}</li>
          </ul>
        </div>
      </div>
    );

  }

}

export default Stats;
