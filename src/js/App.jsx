require('../less/app.less');

import React from 'react/addons';
const Perf = React.addons.Perf;
import debounce from 'lodash/function/debounce';

import Api from './Api.js';
import Stats from './Stats.jsx';
import InfiniteList from './InfiniteList.jsx';
import RenderCount from './RenderCount.js';

const DEFAULT_PAGE_SIZE = 100;

class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      pageSize: DEFAULT_PAGE_SIZE,
      loading: false,
      data: []
    }

  }

  componentDidMount() {

    // get initial data
    this.getData();

    // listen to window scroll event to enable the infinite loading
    this.debounce = debounce(this.onScroll.bind(this), 200);
    window.addEventListener('scroll', this.debounce, false);

  }

  componentWillUnmount() {

    // clean up window scroll event
    window.removeEventListener('scroll', this.debounce, false);

  }

  // once app has finished rendered, display the performance information
  componentDidUpdate() {

    // only show it when not loading, or it will be triggered twice
    if (!this.state.loading) {

      Perf.stop();
      Perf.printWasted();

    }

  }

  onScroll() {

    // don't get more data is data is already being fetched
    if (!this.state.loading) {

      // calculate window scroll position and the bottom position
      let scrollPos = window.pageYOffset + window.innerHeight;
      let bottomPos = document.documentElement.scrollHeight - 100;

      // when scroll position is at the bottom fetch more data
      if (scrollPos >= bottomPos) {

        this.getData();

      }

    }

  }

  getData() {

    // start performance profiling
    Perf.start();

    // show the loading message first
    this.setState({
      loading: true
    }, () => {

      // fetch the data from the api
      Api.getData(this.state.pageSize).then(data => {

        // once data has been fetched hide loading message and add the new data
        this.setState({
          loading: false,
          data: this.state.data.concat(data)
        });

      });

    });

  }

  setPageSize(e) {

    // start performance profiling so we can see the effect of changing something that is
    // not related to the infinite list
    Perf.start();

    // update page size
    this.setState({
      pageSize: parseInt(e.target.value, 10) || DEFAULT_PAGE_SIZE
    });

  }

  render() {

    // count number of renders from this component
    RenderCount.App++;

    // content contains:
    // a header with the title, input for changing the page size and a button to add more data
    // for convenience so you don't have to keep scrolling
    // a list component which displays the data
    // a stats component which displays the number of renders from each component
    return (
      <div>
        <header>
          <h1>Infinite Scroll <small>(contains {this.state.data.length} items)</small></h1>
          <div>
            <label>Page Size:</label>
            <input type="text" value={this.state.pageSize} onChange={this.setPageSize.bind(this)}/>
            <button onClick={this.getData.bind(this)}>
              Add More Data {this.state.loading && "loading..."}
            </button>
          </div>
        </header>
        <main>
          <InfiniteList data={this.state.data}/>
          {this.state.loading && <div className="loading">Loading...</div>}
          <Stats />
        </main>
      </div>
    );

  }

}

React.render(<App/>, document.getElementById('app'));
