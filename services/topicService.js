const crypto = require('crypto');
const topics = require('../data/topics');

function normalizeCategory(cat) {
    return (cat || '').trim().toLowerCase();
}

function getAllCategories() {
    return Array.from(new Set(topics.map(t => t.category))).sort();
}

function filterTopics({ category, q, excludeIds }) {
    let list = topics;
    if (category) {
        const norm = normalizeCategory(category);
        list = list.filter(t => t.category === norm);
        if (list.length === 0) {
            return { list: [], invalidCategory: !getAllCategories().includes(norm) };
        }
    }
    if (q) {
        const needle = q.toLowerCase();
        list = list.filter(t => t.text.toLowerCase().includes(needle));
    }
    if (excludeIds && excludeIds.length) {
        const set = new Set(excludeIds);
        list = list.filter(t => !set.has(t.id));
    }
    return { list, invalidCategory: false };
}

function randomItem(arr) {
    if (!arr.length) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomTopic({ category, excludeIds }) {
    const { list, invalidCategory } = filterTopics({ category, excludeIds });
    if (invalidCategory) return { error: 'INVALID_CATEGORY' };
    if (!list.length) return { error: 'NO_TOPICS_FOUND' };
    return { topic: randomItem(list) };
}

function getTopicByCategoryRandom(name, excludeIds) {
    if (!name) return { error: 'BAD_REQUEST', message: 'name query required' };
    const { list, invalidCategory } = filterTopics({ category: name, excludeIds });
    if (invalidCategory) return { error: 'INVALID_CATEGORY' };
    if (!list.length) return { error: 'NO_TOPICS_FOUND' };
    return { topic: randomItem(list), category: normalizeCategory(name) };
}

function isValidDateStr(str) {
    return /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(Date.parse(str));
}

function topicOfDay(dateStr) {
    const date = dateStr || new Date().toISOString().slice(0, 10); // UTC date portion
    if (!isValidDateStr(date)) return { error: 'INVALID_DATE' };
    if (!topics.length) return { error: 'NO_TOPICS_FOUND' };
    const hash = crypto.createHash('sha256').update(date).digest('hex');
    const idx = parseInt(hash.slice(0, 8), 16) % topics.length;
    return { date, topic: topics[idx] };
}

function listTopics({ page = 1, limit = 50, category, q }) {
    limit = Math.min(Math.max(parseInt(limit) || 50, 1), 100);
    page = Math.max(parseInt(page) || 1, 1);
    const { list, invalidCategory } = filterTopics({ category, q });
    if (invalidCategory) return { error: 'INVALID_CATEGORY' };
    const total = list.length;
    const start = (page - 1) * limit;
    const slice = list.slice(start, start + limit);
    return { page, limit, total, topics: slice };
}

module.exports = {
    getAllCategories,
    getRandomTopic,
    getTopicByCategoryRandom,
    topicOfDay,
    listTopics,
    normalizeCategory
};
