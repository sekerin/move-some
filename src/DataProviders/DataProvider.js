/**
 * Data provider parent class
 */

class DataProvider {

  /**
   * Constructor for data provider parent
   * @param config
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Init
   * @return DataProvider
   */
  async init() {
    return this;
  }

  /**
   * Execute query and return value
   */
  async getCollectionByQuery() {}

  /**
   * Execute query and return value
   */
  async getPropertyByQuery() {}
}

module.exports = DataProvider;
