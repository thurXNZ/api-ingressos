const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Rota para obter todos os ingressos
router.get('/', async (req, res) => {
  try {
    const ingressos = await prisma.ingresso.findMany();
    res.json(ingressos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ingressos' });
  }
});

// Rota para obter um ingresso por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const ingresso = await prisma.ingresso.findUnique({
      where: { id: parseInt(id) },
    });
    if (!ingresso) {
      return res.status(404).json({ message: 'Ingresso não encontrado' });
    }
    res.json(ingresso);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ingresso por ID' });
  }
});

// Rota para criar um novo ingresso
router.post('/', async (req, res) => {
  const { nome, preco } = req.body;
  try {
    const novoIngresso = await prisma.ingresso.create({
      data: {
        nome,
        preco,
      },
    });
    res.json(novoIngresso);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ingresso' });
  }
});

// Rota para atualizar um ingresso por ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  try {
    const ingressoAtualizado = await prisma.ingresso.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        preco,
      },
    });
    res.json(ingressoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ingresso' });
  }
});

// Rota para deletar um ingresso por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const ingressoExcluido = await prisma.ingresso.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Ingresso removido com sucesso', ingressoExcluido });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar ingresso' });
  }
});

module.exports = router;