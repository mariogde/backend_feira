// itemModel.js
// const prisma = require('../prisma'); 
// Funções da lógica de acesso ao banco de dados.
const prisma = {
    item: {
        findMany: async (options) => {
            console.log('Simulando busca de todos os itens com Prisma.', options);
            // Retorna dados de exemplo
            return [
                { id_item: 1, nome: "Livro de Node.js", descricao: "Um livro sobre desenvolvimento web com Node.js e Express.", categoria: "Linguagens" },
                { id_item: 2, nome: "Curso de React", descricao: "Curso online para iniciantes em React.", categoria: "Frameworks" }
            ];
        },
        findUnique: async ({ where }) => {
            console.log(`Simulando busca de item com id ${where.id_item} com Prisma.`);
            // Retorna um item de exemplo ou null.
            return { id_item: where.id_item, nome: "Item de Teste", descricao: "Descrição", categoria: "Categoria" };
        },
        create: async ({ data }) => {
            console.log('Simulando a criação de um novo item com Prisma.', data);
            // retorna o item criado com um ID.
            return { id_item: 3, ...data };
        },
        update: async ({ where, data }) => {
            console.log(`Simulando a atualização do item com id ${where.id_item} com Prisma.`, data);
            // Retorna o item atualizado.
            return { id_item: where.id_item, ...data };
        },
        delete: async ({ where }) => {
            console.log(`Simulando a deleção do item com id ${where.id_item} com Prisma.`);
            // Retorna o item deletado.
            return { id_item: where.id_item, nome: "Item Deletado", descricao: "", categoria: "" };
        }
    }
};

/**
 * "Busca todos os itens no banco de dados.
 */
const getAllItems = async () => {
    return prisma.item.findMany({
        orderBy: {
            nome: 'desc'
        }
    });
};

/**
 * Busca um item pelo seu ID.
 * @param {string} id_item O ID do item a ser buscado.
 */
const getItemById = async (id_item) => {
    return prisma.item.findUnique({
        where: {
            id_item: parseInt(id_item)
        }
    });
};

/**
 * Adiciona um novo item no banco de dados.
 * @param {string} nome O nome do item.
 * @param {string} descricao A descrição do item.
 * @param {string} categoria A categoria do item.
 */
const addItem = async (nome, descricao, categoria) => {
    return prisma.item.create({
        data: {
            nome: nome,
            descricao: descricao,
            categoria: categoria
        }
    });
};

/**
 * Atualiza um item existente no banco de dados.
 * @param {string} id_item O ID do item a ser atualizado.
 * @param {string} nome O novo nome do item.
 * @param {string} descricao A nova descrição do item.
 * @param {string} categoria A nova categoria do item.
 */
const updateItem = async (id_item, nome, descricao, categoria) => {
    const item = await getItemById(id_item);

    if (!item) {
        throw new Error('Item não encontrado');
    }

    return prisma.item.update({
        where: {
            id_item: parseInt(id_item)
        },
        data: {
            nome: nome,
            descricao: descricao,
            categoria: categoria
        }
    });
};

/**
 * Deleta item do banco de dados.
 * @param {string} id_item O ID do item a ser deletado.
 */
const deleteItem = async (id_item) => {
    const item = await getItemById(id_item);

    if (!item) {
        throw new Error('Item não encontrado');
    }

    return prisma.item.delete({
        where: {
            id_item: parseInt(id_item)
        }
    });
};

// Exporta todas as funções para serem usadas no controlador.
module.exports = {
    getAllItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem
};
