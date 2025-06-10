const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função para converter o id BigInt para string
function convertIdToString(obj) {
  if (!obj) return obj;
  return { ...obj, id: obj.id.toString() };
}

module.exports = {
  async create(req, res) {
    try {
      const {
        name,
        author,
        publisher,
        genre,
        keywords,
        meaning,
        url
      } = req.body;

      console.log('Recebido no body:', req.body);

      if (!name || !meaning) {
        return res.status(400).json({ error: 'Nome e significado são obrigatórios.' });
      }

      const newEntry = await prisma.dictionary.create({
        data: {
          name,
          author,
          publisher,
          genre,
          keywords,
          meaning,
          url
        }
      });

      console.log('Criado no banco:', newEntry);

      return res.status(201).json(convertIdToString(newEntry));
    } catch (error) {
      console.error('Erro criando palavra:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async findAll(req, res) {
  try {
    const {
      limit,
      name,
      author,
      publisher,
      genre,
      logic = 'and' 
    } = req.query;

    const filters = [];

    if (name) {
      filters.push({ name: { contains: name, mode: 'insensitive' } });
    }
    if (author) {
      filters.push({ author: { contains: author, mode: 'insensitive' } });
    }
    if (publisher) {
      filters.push({ publisher: { contains: publisher, mode: 'insensitive' } });
    }
    if (genre) {
      filters.push({ genre: { contains: genre, mode: 'insensitive' } });
    }

    // Monta cláusula where com AND/OR
    const where = {
      deletedAt: null
    };

    if (filters.length > 0) {
      const logicalOperator = logic.toLowerCase() === 'or' ? 'OR' : 'AND';
      where[logicalOperator] = filters;
    }

    const options = { where };

    const take = parseInt(limit, 10);
    if (!isNaN(take) && take > 0) {
      options.take = take;
    }

    const items = await prisma.dictionary.findMany(options);

    res.json(items);
  } catch (error) {
    console.error('Erro ao buscar palavras:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
},


  async findOne(req, res) {
    try {
      const { id } = req.params;

      // Supondo que id seja bigint no banco
      const parsedId = BigInt(id);

      const item = await prisma.dictionary.findUnique({
        where: { id: parsedId }
      });

      if (!item || item.deletedAt) {
        return res.status(404).json({ error: 'Palavra não encontrada.' });
      }

      res.json(convertIdToString(item));
    } catch (error) {
      console.error('Erro ao buscar palavra:', error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const parsedId = BigInt(id);

      const updated = await prisma.dictionary.update({
        where: { id: parsedId },
        data
      });

      res.json(convertIdToString(updated));
    } catch (error) {
      console.error('Erro ao atualizar palavra:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
  async updatePatch(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    // Verifica se o ID é válido
    if (!id) {
      return res.status(400).json({ error: 'ID é obrigatório' });
    }

    // Converte o ID para BigInt, se necessário
    const parsedId = BigInt(id);

    // Verifica se a entrada existe e não está "deletada"
    const existingEntry = await prisma.dictionary.findUnique({
      where: { id: parsedId }
    });

    if (!existingEntry || existingEntry.deletedAt) {
      return res.status(404).json({ error: 'Palavra não encontrada.' });
    }

    // Atualiza apenas os campos enviados
    const updatedEntry = await prisma.dictionary.update({
      where: { id: parsedId },
      data
    });

    res.json(updatedEntry);
  } catch (error) {
    console.error('Erro no PATCH:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
},

  async softDelete(req, res) {
    try {
      const { id } = req.params;
      const parsedId = BigInt(id);

      const deleted = await prisma.dictionary.update({
        where: { id: parsedId },
        data: { deletedAt: new Date() }
      });

      res.json({ message: 'Palavra excluída com sucesso', deleted: convertIdToString(deleted) });
    } catch (error) {
      console.error('Erro ao excluir palavra:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
}
