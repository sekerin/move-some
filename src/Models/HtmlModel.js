/**
 * Model for Html with url implementation
 */
import Model from './Model';

class HtmlModel extends Model {
  /**
   * Make fields for news class
   * If field got 'url' property - resolve it
   * @param name
   */
  async makeField(name) {
    if (this.config.rules[name].hasOwnProperty('attr')) {
      let dataProvider = await this.getDataProvider();
      await this.setField(name, await dataProvider.getAttributeByQuery(
        this.config.rules[name].query,
        this.config.rules[name].attr
      ));
    }
    else if (this.config.rules[name].hasOwnProperty('url')) {
      let curDataProvider = await this.getDataProvider();
      let url = await curDataProvider.getAttributeByQuery(
        this.config.rules[name].url.query,
        this.config.rules[name].url.attr
      );

      url = this.config.rules[name].url.hasOwnProperty('set')
        ? (await (this.config.rules[name].url.set(url)))
        : url;

      let dataConf = Object.assign(
        this.config.dataProvider.config,
        { url, data: '' }
      );

      let dataProvider = await (new this.config.dataProvider.class(dataConf)).init();
      await this.setField(name, await dataProvider.getPropertyByQuery(this.config.rules[name].query));
    }
    else {
      await(super.makeField(name));
    }
  }
}

module.exports = HtmlModel;
