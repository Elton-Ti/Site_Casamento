/**
 * Camada de Serviços: Gerenciamento de Presentes
 * 
 * Atualmente utiliza LocalStorage para persistência de dados.
 * Esta camada foi arquitetada para ser 100% desacoplada: futuramente, 
 * as funções assíncronas podem ser substituídas por chamadas ao Supabase,
 * Firebase Firestore ou qualquer API REST sem alterar a interface dos componentes.
 */

import { initialGifts } from '../data/gifts';

const STORAGE_KEY = 'wedding_gift_list_data_v1';

/**
 * Inicializa os dados no LocalStorage se ainda não existirem
 */
const initializeStorage = () => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialGifts));
      return initialGifts;
    }
    return JSON.parse(existing);
  } catch (error) {
    console.error('Erro ao ler LocalStorage:', error);
    return initialGifts;
  }
};

/**
 * Salva a lista completa no LocalStorage
 */
const saveToStorage = (gifts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
  } catch (error) {
    console.error('Erro ao salvar no LocalStorage:', error);
  }
};

/**
 * Retorna todos os presentes da lista
 * @returns {Promise<Array>}
 */
export const getGifts = async () => {
  return new Promise((resolve) => {
    // Simula uma pequena latência assíncrona para UX realista
    setTimeout(() => {
      const gifts = initializeStorage();
      resolve(gifts);
    }, 150);
  });
};

/**
 * Busca um presente pelo seu ID
 * @param {number|string} id 
 * @returns {Promise<Object|null>}
 */
export const getGiftById = async (id) => {
  return new Promise((resolve) => {
    const gifts = initializeStorage();
    const gift = gifts.find((g) => String(g.id) === String(id));
    resolve(gift || null);
  });
};

/**
 * Adiciona um novo presente à lista
 * @param {Object} giftData 
 * @returns {Promise<Object>}
 */
export const addGift = async (giftData) => {
  return new Promise((resolve) => {
    const gifts = initializeStorage();
    const newId = gifts.length > 0 ? Math.max(...gifts.map((g) => Number(g.id) || 0)) + 1 : 1;
    
    const newGift = {
      id: newId,
      name: giftData.name.trim(),
      description: giftData.description ? giftData.description.trim() : "",
      category: giftData.category || "Outros",
      price: parseFloat(giftData.price) || 0,
      image: giftData.image || "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80",
      available: true,
      reservedBy: null,
      guestEmail: null,
      guestPhone: null,
      guestMessage: null,
      reservedAt: null
    };

    const updated = [newGift, ...gifts];
    saveToStorage(updated);
    resolve(newGift);
  });
};

/**
 * Atualiza os dados de um presente existente
 * @param {number|string} id 
 * @param {Object} updatedFields 
 * @returns {Promise<Object>}
 */
export const updateGift = async (id, updatedFields) => {
  return new Promise((resolve, reject) => {
    const gifts = initializeStorage();
    const index = gifts.findIndex((g) => String(g.id) === String(id));

    if (index === -1) {
      reject(new Error("Presente não encontrado"));
      return;
    }

    const current = gifts[index];
    const updatedGift = {
      ...current,
      ...updatedFields,
      price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : current.price
    };

    gifts[index] = updatedGift;
    saveToStorage(gifts);
    resolve(updatedGift);
  });
};

/**
 * Remove um presente da lista
 * @param {number|string} id 
 * @returns {Promise<boolean>}
 */
export const deleteGift = async (id) => {
  return new Promise((resolve) => {
    const gifts = initializeStorage();
    const filtered = gifts.filter((g) => String(g.id) !== String(id));
    saveToStorage(filtered);
    resolve(true);
  });
};

/**
 * Reserva um presente em nome de um convidado
 * @param {number|string} id 
 * @param {Object} guestInfo { guestName, guestEmail, guestPhone, guestMessage }
 * @returns {Promise<Object>}
 */
export const reserveGift = async (id, guestInfo) => {
  return new Promise((resolve, reject) => {
    const gifts = initializeStorage();
    const index = gifts.findIndex((g) => String(g.id) === String(id));

    if (index === -1) {
      reject(new Error("Presente não encontrado"));
      return;
    }

    const current = gifts[index];
    if (!current.available) {
      reject(new Error("Este presente já foi reservado por outro convidado."));
      return;
    }

    const reservedGift = {
      ...current,
      available: false,
      reservedBy: guestInfo.guestName.trim(),
      guestEmail: guestInfo.guestEmail ? guestInfo.guestEmail.trim() : null,
      guestPhone: guestInfo.guestPhone ? guestInfo.guestPhone.trim() : null,
      guestMessage: guestInfo.guestMessage ? guestInfo.guestMessage.trim() : null,
      reservedAt: new Date().toISOString()
    };

    gifts[index] = reservedGift;
    saveToStorage(gifts);
    resolve(reservedGift);
  });
};

/**
 * Libera a reserva de um presente, tornando-o disponível novamente (ação de Admin)
 * @param {number|string} id 
 * @returns {Promise<Object>}
 */
export const releaseGift = async (id) => {
  return new Promise((resolve, reject) => {
    const gifts = initializeStorage();
    const index = gifts.findIndex((g) => String(g.id) === String(id));

    if (index === -1) {
      reject(new Error("Presente não encontrado"));
      return;
    }

    const releasedGift = {
      ...gifts[index],
      available: true,
      reservedBy: null,
      guestEmail: null,
      guestPhone: null,
      guestMessage: null,
      reservedAt: null
    };

    gifts[index] = releasedGift;
    saveToStorage(gifts);
    resolve(releasedGift);
  });
};

/**
 * Restaura os presentes para o estado inicial padrão (útil para testes)
 * @returns {Promise<Array>}
 */
export const resetToDefaultGifts = async () => {
  return new Promise((resolve) => {
    saveToStorage(initialGifts);
    resolve(initialGifts);
  });
};
