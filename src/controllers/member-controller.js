const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
async findAll(req, res) {
  try {
    // Buscar membros não deletados e ordenar por nome
    const members = await prisma.member.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        url: true,
        role: true,
        team: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    res.json(members)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

  async create(req, res) {
    try {
      const data = req.body;
      const member = await prisma.member.create({ data });
      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await prisma.member.update({
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
      const deleted = await prisma.member.update({
        where: { id: parseInt(id) },
        data: { deletedAt: new Date() }
      });
      res.json({ message: 'Membro Deletado com Sucesso', deleted });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
