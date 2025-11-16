const express = require('express');
const { Category, Product } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// GET /api/categories?active=1
router.get('/categories', async (req, res) => {
    try {
    const onlyActive = req.query.active === '1';
    console.log("onllyActive" , onlyActive)
    const where = onlyActive ? { active: 0 } : {};
    console.log("where" , where)
    const cats = await Category.findAll({ where, order: [['name', 'ASC']] });
    console.log("cats" , cats)
    res.json(cats);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// GET /api/products
// supports: category, price_min, price_max, min_discount, sort, page, pageSize, q, active
router.get('/products', async (req, res) => {
  try {
    const {
      category,
      price_min,
      price_max,
      min_discount,
      sort,
      page = 1,
      pageSize = 6,
      q,
      active = '1'
    } = req.query;

    const where = {};
    if (active === '1') where.active = true;
    if (category) where.category_id = category;
    if (min_discount) where.discount_percent = { [Op.gte]: Number(min_discount) };

    const offset = (page - 1) * pageSize;
    const products = await Product.findAll({ where, include: Category, order: [['created_at', 'DESC']] });

    let filtered = products.map(p => {
      const obj = p.get({ plain: true });
      obj.images = obj.images ? JSON.parse(obj.images) : [];
      obj.final_price = (parseFloat(obj.price) * (1 - (obj.discount_percent || 0) / 100)).toFixed(2);
      return obj;
    });

    if (q) {
      const ql = q.toLowerCase();
      filtered = filtered.filter(p => (p.title || '').toLowerCase().includes(ql) || (p.description || '').toLowerCase().includes(ql));
    }
    if (price_min) filtered = filtered.filter(p => parseFloat(p.final_price) >= Number(price_min));
    if (price_max) filtered = filtered.filter(p => parseFloat(p.final_price) <= Number(price_max));
    if (min_discount) filtered = filtered.filter(p => p.discount_percent >= Number(min_discount));

    if (sort === 'price_asc') filtered.sort((a, b) => parseFloat(a.final_price) - parseFloat(b.final_price));
    if (sort === 'price_desc') filtered.sort((a, b) => parseFloat(b.final_price) - parseFloat(a.final_price));
    if (sort === 'discount_desc') filtered.sort((a, b) => b.discount_percent - a.discount_percent);
    if (sort === 'newest') filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const paginated = filtered.slice(offset, offset + Number(pageSize));
    res.json({ total: filtered.length, page: Number(page), pageSize: Number(pageSize), items: paginated });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/products/:id
router.get('/products/:id', async (req, res) => {
  try {
    const p = await Product.findByPk(req.params.id, { include: Category });
    if (!p) return res.status(404).json({ error: 'Not found' });
    const obj = p.get({ plain: true });
    obj.images = obj.images ? JSON.parse(obj.images) : [];
    obj.final_price = (parseFloat(obj.price) * (1 - (obj.discount_percent || 0) / 100)).toFixed(2);
    res.json(obj);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
