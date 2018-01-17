/* eslint-disable no-unused-vars */
/**
 * Collection models parent class
 */
class ModelCollection {

  /**
   * Constructor for collection
   * @param config
   */
  constructor(config) {
    this.config = config;
    this.items = [];
  }

  /**
   * Initialization collection
   * @return {ModelCollection}
   */
  async init() {
    return this;
  }

  /**
   * Make collection
   * @return {ModelCollection}
   */
  async make() {
    return await this.makeFromDataProvider(await this.getDataProvider());
  }

  /**
   * Make from data provider
   * @param dataProvider DataProvider
   * @return {Promise.<ModelCollection>}
   */
  async makeFromDataProvider(dataProvider) {
    return this;
  }

  /**
   *
   * @param item
   * @return {Promise.<void>}
   */
  async addItem(item) {
    this.items.push(item);
  }

  /**
   * Return current data provider
   * @returns {DataProvider}
   */
  async getDataProvider() {
    if (! this.hasOwnProperty('dataProvider') || ! this.dataProvider) {
      this.dataProvider = await new this.config.dataProvider.class(this.config.dataProvider.config).init();
    }

    return this.dataProvider;
  }
}

module.exports = ModelCollection;
