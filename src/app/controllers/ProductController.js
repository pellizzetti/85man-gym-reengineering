const IntlPolyfill = require('intl');

const { Product } = require('../models');

class ProductController {
  async index(req, res) {
    const { currentPage = 0, search = '', showAll = false } = req.query;

    let products = [];
    if (showAll) {
      products = await Product.query()
        .where('description', 'ILIKE', `%${search}%`)
        .orderBy('description');
    } else {
      products = await Product.query()
        .where('description', 'ILIKE', `%${search}%`)
        .orderBy('description')
        .page(currentPage, 10);
    }

    return res.json(products);
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.query().findById(id);

    product.amount = new IntlPolyfill.NumberFormat('pt-BR', {
      style: 'decimal',
      currency: 'BRL',
    }).format(product.amount);

    return res.json(product);
  }

  async store(req, res) {
    const { values } = req.body;

    values.amount = String(values.amount).replace(/,/g, '.');

    const product = await Product.query().insert({
      ...values,
    });

    return res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const { values } = req.body;

    values.amount = String(values.amount).replace(/,/g, '.');

    const product = await Product.query()
      .findById(id)
      .patch({ ...values });

    return res.json(product);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const product = await Product.query().deleteById(id);

    return res.json(product);
  }
}

module.exports = new ProductController();
