'use strict';

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  async read(id) {
    if (id) {
      return await this.model.findOne({where:{ id:id }});
    }
    else {
      return await this.model.findAll({});
    }
  }

  async create(record) {
    return await this.model.create(record);
  }

  async update(id, data) {
    return await this.model.findOne({ where: { id } })
      .then(record => record.update(data));
  }

  async delete(id) {
    return await this.model.destroy({ where: { id }});
  }

}

module.exports = DataCollection;