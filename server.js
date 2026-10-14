const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'seguridad_absoluta_2026';

app.use(cors()); app.use(express.json());

const mockUsers = [ { id: 1, email: 'admin@cerveceria.com', password: '123456', role: 'Administrador' } ];
const mockBeers = [
    { _id: 'b1', name: 'IPA Artesanal', style: 'IPA', price: 6.50 },
    { _id: 'b2', name: 'Stout Oscura', style: 'Stout', price: 5.00 }
];

const protectRoute = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).json({ status: 'fail' });
    }
};

app.post('/api/v1/auth/login', (req, res) => {
    const user = mockUsers.find(u => u.email === req.body.email && u.password === req.body.password);
    if (!user) return res.status(401).json({ status: 'fail' });
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
    res.json({ status: 'success', token });
});

app.get('/api/v1/beers', protectRoute, (req, res) => res.json({ status: 'success', data: mockBeers }));

app.listen(3000, () => console.log('✅ Backend Activo en puerto 3000'));