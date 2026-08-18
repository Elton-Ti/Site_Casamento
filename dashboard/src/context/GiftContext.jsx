import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as giftService from '../services/giftService';
import { useToast } from './ToastContext';

const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const loadGifts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await giftService.getGifts();
      setGifts(data);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar presentes:', err);
      setError('Não foi possível carregar a lista de presentes.');
      addToast('Erro ao carregar lista de presentes', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadGifts();
  }, [loadGifts]);

  const reserveGift = async (id, guestInfo) => {
    try {
      const updated = await giftService.reserveGift(id, guestInfo);
      setGifts((prev) => prev.map((g) => (String(g.id) === String(id) ? updated : g)));
      return { success: true, gift: updated };
    } catch (err) {
      const msg = err.message || 'Erro ao reservar o presente.';
      addToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const addGift = async (giftData) => {
    try {
      const created = await giftService.addGift(giftData);
      setGifts((prev) => [created, ...prev]);
      addToast('Presente adicionado com sucesso!', 'success');
      return { success: true, gift: created };
    } catch (err) {
      const msg = err.message || 'Erro ao adicionar presente.';
      addToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const updateGift = async (id, giftData) => {
    try {
      const updated = await giftService.updateGift(id, giftData);
      setGifts((prev) => prev.map((g) => (String(g.id) === String(id) ? updated : g)));
      addToast('Presente atualizado com sucesso!', 'success');
      return { success: true, gift: updated };
    } catch (err) {
      const msg = err.message || 'Erro ao atualizar presente.';
      addToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const deleteGift = async (id) => {
    try {
      await giftService.deleteGift(id);
      setGifts((prev) => prev.filter((g) => String(g.id) !== String(id)));
      addToast('Presente removido com sucesso!', 'success');
      return { success: true };
    } catch (err) {
      const msg = err.message || 'Erro ao remover presente.';
      addToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const releaseGift = async (id) => {
    try {
      const released = await giftService.releaseGift(id);
      setGifts((prev) => prev.map((g) => (String(g.id) === String(id) ? released : g)));
      addToast('Presente marcado como disponível novamente!', 'success');
      return { success: true, gift: released };
    } catch (err) {
      const msg = err.message || 'Erro ao liberar presente.';
      addToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  const resetDefaults = async () => {
    try {
      const defaults = await giftService.resetToDefaultGifts();
      setGifts(defaults);
      addToast('Lista restaurada para os dados padrão com sucesso!', 'success');
      return { success: true };
    } catch (err) {
      const msg = err.message || 'Erro ao restaurar dados padrão.';
      addToast(msg, 'error');
      return { success: false, error: msg };
    }
  };

  return (
    <GiftContext.Provider
      value={{
        gifts,
        loading,
        error,
        refreshGifts: loadGifts,
        reserveGift,
        addGift,
        updateGift,
        deleteGift,
        releaseGift,
        resetDefaults
      }}
    >
      {children}
    </GiftContext.Provider>
  );
};

export const useGifts = () => {
  const context = useContext(GiftContext);
  if (!context) {
    throw new Error('useGifts deve ser usado dentro de um GiftProvider');
  }
  return context;
};
