const express = require('express');
const router = express.Router();
const service = require('../services/topicService');

function sendError(res, code, message) {
    const msg = message || code;
    let status = 400;
    if (code === 'INVALID_CATEGORY' || code === 'NO_TOPICS_FOUND') status = 404;
    if (code === 'INTERNAL_ERROR') status = 500;
    if (code === 'BAD_REQUEST' && !message) message = 'Bad request';
    res.status(status).json({ error: { code, message: message || msg } });
}

router.get('/random', (req, res) => {
    const excludeIds = req.query.excludeIds ? req.query.excludeIds.split(',').map(s => s.trim()).filter(Boolean) : [];
    const result = service.getRandomTopic({ category: req.query.category, excludeIds });
    if (result.error) return sendError(res, result.error);
    res.json({ topic: result.topic });
});

router.get('/today', (req, res) => {
    const { date } = req.query;
    const result = service.topicOfDay(date);
    if (result.error) return sendError(res, result.error);
    res.set('Cache-Control', 'public, max-age=3600');
    res.json(result);
});

router.get('/list', (req, res) => {
    const { page, limit, category, q } = req.query;
    const result = service.listTopics({ page, limit, category, q });
    if (result.error) return sendError(res, result.error);
    res.json(result);
});

router.get('/categories', (req, res) => {
    const categories = service.getAllCategories();
    res.set('Cache-Control', 'public, max-age=21600');
    res.json({ categories });
});

router.get('/by-category', (req, res) => {
    const excludeIds = req.query.excludeIds ? req.query.excludeIds.split(',').map(s => s.trim()).filter(Boolean) : [];
    const name = req.query.name;
    const result = service.getTopicByCategoryRandom(name, excludeIds);
    if (result.error) return sendError(res, result.error, result.message);
    res.json({ category: result.category, topic: result.topic });
});

module.exports = router;
