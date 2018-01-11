/**
 * Model
 */
class Model {
  /**
   * Constructor
   * @param config
   */
  constructor(config) {
    this.config = config;
    this.fields = [];
  }

  /**
   * Initialize class
   * @return Model
   */
  async init() {
    return this;
  }

  /**
   * Get fields from data provider
   * @return {Model}
   */
  async make() {
    for (let key in this.config.rules) {
      if (this.config.rules.hasOwnProperty(key)) {
        await this.makeField(key);
      }
    }
    return this;
  }

  /**
   * Get field from data provider and
   */
  async makeField(name) {
    let dataProvider = await this.getDataProvider();
    await this.setField(name, await dataProvider.getPropertyByQuery(this.config.rules[name].query));
  }

  /**
   * Setter for field
   * @param name
   * @param value
   */
  async setField(name, value) {
    this.fields[name] = this.config.rules[name].hasOwnProperty('set')
      ? (await (this.config.rules[name].set(value)))
      : value;
  }

  /**
   * Get field by name
   * @param name
   * @returns {*}
   */
  async getField(name) {
    if (this.fields.hasOwnProperty(name)) {
      return this.config.rules[name].hasOwnProperty('get')
        ? this.config.rules[name].get(this.fields[name])
        : this.fields[name];
    }
    return null;
  }

  /**
   * Return current data provider
   * @returns {DataProvider}
   */
  async getDataProvider() {
    if (! this.hasOwnProperty('dataProvider') || ! this.dataProvider) {
      this.dataProvider = await (new this.config.dataProvider.class(this.config.dataProvider.config)).init();
    }
    return this.dataProvider;
  }
}

module.exports = Model;
