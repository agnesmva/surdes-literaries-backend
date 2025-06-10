const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async findAll(req, res) {
    try {
      const events = await prisma.event.findMany({
        where: { deletedAt: null }
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = req.body;
      const event = await prisma.event.create({ data });
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updatePut(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await prisma.event.update({
        where: { id: parseInt(id) },
        data
      });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  


async softDelete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await prisma.event.update({
        where: { id: parseInt(id) },
        data: { deletedAt: new Date() }
      });
      res.json({ message: 'EEvento Deletado com Sucesso', deleted });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
