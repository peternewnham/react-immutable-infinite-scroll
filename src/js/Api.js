/*
 * Simulate an API by generating and returning random data in an array
 */

// chance generates better looking random data
import Chance from 'chance';
let chance = new Chance();

// initial item id - increments for each added item
let id = 1;

/**
 * Creates the data, returning an array containing the specified number of items
 *
 * @param num
 * @return {Array}
 */
const makeData = (num) => {

  let data = [];

  for (let i = 0; i < num; i++) {

    let name = chance.name();
    let email = name.replace(' ', '.').toLowerCase() + '@' + chance.domain();

    data.push({
      id,
      name,
      email
    });

    id++;

  }

  return data;

};

export default {

  /**
   * Gets a batch of data
   * Returns a promise to simulate fetching data from an external service but resolves immediately
   * to give a better indication of performance (i.e. no timeout to automatically add a delay)
   */
  getData(num) {

    return new Promise((resolve, reject) => {

      resolve(makeData(num));

    });

  }

}