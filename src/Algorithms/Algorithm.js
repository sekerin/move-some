/**
 * Parent class for algorithms
 */

class Algorithm {
  /**
   * Constructor
   * @param config
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Init
   * @param inModel
   * @param outModel
   * @return Algorithm
   */
  async init(inModel, outModel) {
    this.in = inModel;
    this.out = outModel;
    await this.in.make();
    return this;
  }

  /**
   * make models
   * @return {Algorithm}
   */
  async make() {
    return this;
  }

  /**
   * run inModel to outModel
   */
  async run() {
    for (let inElement of this.in.items) {
      let element = new this.out.config.rules.element.class(this.out.config.rules.element.config);
      if (element.config.hasOwnProperty('rules')) {
        for (let field in element.config.rules) {
          await element.setField(field, await inElement.getField(field));
        }
      }
      await this.out.addItem(element);
    }
    return this;
  }
}

module.exports = Algorithm;
