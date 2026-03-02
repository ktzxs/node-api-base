import { Router } from 'express';
import { createUser, createUsers } from '../service/user';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get('/test', (req, res) => {
    res.json({ testando: true });
});

mainRouter.post('/user', async (req, res) => { 
    //validar os dados de entrada
    const user = await createUser ({
        name: 'Lucas Alves',
        email: 'lucasalves@gamil.com'
    })
    if(user) {
        res.status(201).json({ user })
    } else {
        res.status(400).json({ error: 'Email already exists'})
    }
});

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([]);
    res.status(201).json({ ok: true });
});
