    const express = require('express');
    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');
    const requireAuth = require('../middleware/auth');
    const { Category, Product } = require('../models');

    const router = express.Router();

    // Upload setup (uses same UPLOAD_DIR)
    const uploadDir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    });
    const upload = multer({ storage });

    // GET /api/admin/products (protected)
    router.get('/products', requireAuth, async (req, res) => {
    try {
        const prods = await Product.findAll({ order: [['created_at', 'DESC']] });
        const mapped = prods.map(p => ({ ...p.get({ plain: true }), images: p.images ? JSON.parse(p.images) : [] }));
        res.json(mapped);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    });

    // POST /api/admin/products (create product)
    router.post('/products', requireAuth, async (req, res) => {
    try {
        const payload = req.body;
        if (!payload.title || !payload.slug || !payload.price) return res.status(400).json({ error: 'title, slug, price required' });
        payload.images = JSON.stringify(payload.images || []);
        const prod = await Product.create(payload);
        res.json(prod);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    });

    // PUT /api/admin/products/:id (update)
    router.put('/products/:id', requireAuth, async (req, res) => {
    try {
        const prod = await Product.findByPk(req.params.id);
        if (!prod) return res.status(404).json({ error: 'Not found' });
        const updates = req.body;
        if (updates.images) updates.images = JSON.stringify(updates.images || []);
        await prod.update(updates);
        res.json(prod);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    });

    // Admin categories CRUD
    router.post('/categories', requireAuth, async (req, res) => {
        console.log("ADMIN POST BODY =", req.body);
    try {
        const { name, slug, active } = req.body;
        if (!name || !slug) return res.status(400).json({ error: 'name and slug required' });
        const cat = await Category.create({ name, slug, active: active !== false });
        res.json(cat);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    });

    router.put('/categories/:id', requireAuth, async (req, res) => {
    try {
        const cat = await Category.findByPk(req.params.id);
        if (!cat) return res.status(404).json({ error: 'Not found' });
        await cat.update(req.body);
        res.json(cat);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
    });

    // Admin file upload
    router.post('/upload', requireAuth, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url });
    });

    module.exports = router;
