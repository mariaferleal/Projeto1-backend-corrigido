import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import connectDB from './db.js';
import { User } from './User.js';
import { Task } from './Task.js';
import { Tag } from './Tag.js';
import { Schedule } from './Schedule.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

// helper para ler o corpo JSON
async function getBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => resolve(body ? JSON.parse(body) : {}));
  });
}

// helper para extrair ID da URL
function getIdFromUrl(url) {
  const parts = url.split('/');
  return parts.length > 2 ? parts[2] : null;
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    // ========== USERS ==========
    if (req.url.startsWith('/users')) {
      const id = getIdFromUrl(req.url);

      if (req.method === 'GET') {
        if (id) {
          const user = await User.getById(id);
          res.end(JSON.stringify(user || { message: 'Usuário não encontrado' }));
        } else {
          const users = await User.getAll();
          res.end(JSON.stringify(users));
        }
      }

      else if (req.method === 'POST') {
        const data = await getBody(req);
        const newUser = await User.create(data);
        res.end(JSON.stringify(newUser));
      }

      else if (req.method === 'PUT' && id) {
        const data = await getBody(req);
        const updated = await User.update(id, data);
        res.end(JSON.stringify(updated));
      }

      else if (req.method === 'DELETE' && id) {
        await User.remove(id);
        res.end(JSON.stringify({ message: 'Usuário removido com sucesso' }));
      }

      else {
        res.writeHead(405);
        res.end(JSON.stringify({ message: 'Método não permitido' }));
      }
      return;
    }

    // ========== TASKS ==========
    if (req.url.startsWith('/tasks')) {
      const id = getIdFromUrl(req.url);

      if (req.method === 'GET') {
        if (id) {
          const task = await Task.getById(id);
          res.end(JSON.stringify(task || { message: 'Tarefa não encontrada' }));
        } else {
          const tasks = await Task.getAll();
          res.end(JSON.stringify(tasks));
        }
      }

      else if (req.method === 'POST') {
        const data = await getBody(req);
        const newTask = await Task.create(data);
        res.end(JSON.stringify(newTask));
      }

      else if (req.method === 'PUT' && id) {
        const data = await getBody(req);
        const updated = await Task.update(id, data);
        res.end(JSON.stringify(updated));
      }

      else if (req.method === 'DELETE' && id) {
        await Task.remove(id);
        res.end(JSON.stringify({ message: 'Tarefa removida com sucesso' }));
      }

      else {
        res.writeHead(405);
        res.end(JSON.stringify({ message: 'Método não permitido' }));
      }
      return;
    }

    // ========== TAGS ==========
    if (req.url.startsWith('/tags')) {
      const id = getIdFromUrl(req.url);

      if (req.method === 'GET') {
        if (id) {
          const tag = await Tag.getById(id);
          res.end(JSON.stringify(tag || { message: 'Tag não encontrada' }));
        } else {
          const tags = await Tag.getAll();
          res.end(JSON.stringify(tags));
        }
      }

      else if (req.method === 'POST') {
        const data = await getBody(req);
        const newTag = await Tag.create(data);
        res.end(JSON.stringify(newTag));
      }

      else if (req.method === 'PUT' && id) {
        const data = await getBody(req);
        const updated = await Tag.update(id, data);
        res.end(JSON.stringify(updated));
      }

      else if (req.method === 'DELETE' && id) {
        await Tag.remove(id);
        res.end(JSON.stringify({ message: 'Tag removida com sucesso' }));
      }

      else {
        res.writeHead(405);
        res.end(JSON.stringify({ message: 'Método não permitido' }));
      }
      return;
    }

    // ========== SCHEDULES ==========
    if (req.url.startsWith('/schedules')) {
      const id = getIdFromUrl(req.url);

      if (req.method === 'GET') {
        if (id) {
          const schedule = await Schedule.getById(id);
          res.end(JSON.stringify(schedule || { message: 'Agenda não encontrada' }));
        } else {
          const schedules = await Schedule.getAll();
          res.end(JSON.stringify(schedules));
        }
      }

      else if (req.method === 'POST') {
        const data = await getBody(req);
        const newSchedule = await Schedule.create(data);
        res.end(JSON.stringify(newSchedule));
      }

      else if (req.method === 'PUT' && id) {
        const data = await getBody(req);
        const updated = await Schedule.update(id, data);
        res.end(JSON.stringify(updated));
      }

      else if (req.method === 'DELETE' && id) {
        await Schedule.remove(id);
        res.end(JSON.stringify({ message: 'Agenda removida com sucesso' }));
      }

      else {
        res.writeHead(405);
        res.end(JSON.stringify({ message: 'Método não permitido' }));
      }
      return;
    }

    // ========== 404 DEFAULT ==========
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Endpoint não encontrado' }));

  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end(JSON.stringify({ message: 'Erro interno do servidor', error: err.message }));
  }
});

mongoose.connection.once('open', () => {
  console.log('✅ Conectado ao MongoDB');
  server.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
});
