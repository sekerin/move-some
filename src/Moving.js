/**
 * Builder, configure modules
 */
class Moving {
  constructor() {
    this.modules = [];
  }

  /**
   * Check modules and return array
   * @param modules
   * @returns {array}
   * @throws RangeException
   */
  static getModulesConf(modules) {
    if (modules !== 'undefined' && modules) {
      return modules;
    }
    // TODO: throw exception
  }

  /**
   * Add module
   * @param module
   */
  async addModule(module) {
    this.modules.push(module);
  }

  /**
   *
   * @param config
   * @return {Moving}
   */
  async build(config) {
    for (let module of Moving.getModulesConf(config.modules)) {
      const inModel = await new module.in.class(module.in.config).init();
      const outModel = await new module.out.class(module.out.config).init();
      const algorithm = await new module.algorithm().init(inModel, outModel);
      await this.addModule(algorithm);
    }
    return this;
  }

  /**
   * run algorithm
   * @return {Moving}
   */
  async run() {
    for (let module of this.modules) {
      await module.make();
      await module.run();
    }

    return this;
  }
}

module.exports = Moving;
