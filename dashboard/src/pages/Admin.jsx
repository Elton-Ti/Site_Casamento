import React, { useState, useEffect } from 'react';
import { Shield, Lock, LogOut, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { weddingConfig } from '../config';
import { useGifts } from '../context/GiftContext';
import { useToast } from '../context/ToastContext';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { GiftTable } from '../components/admin/GiftTable';
import { GiftFormModal } from '../components/admin/GiftFormModal';
import { ConfirmModal } from '../components/admin/ConfirmModal';
import { GuestDetailsModal } from '../components/admin/GuestDetailsModal';

const AUTH_STORAGE_KEY = 'wedding_admin_authenticated_session';

export const Admin = () => {
  const { gifts, addGift, updateGift, deleteGift, releaseGift, resetDefaults } = useGifts();
  const { addToast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState(null);

  const [confirmModalConfig, setConfirmModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    isDanger: false,
    confirmText: 'Confirmar'
  });

  const [viewingGuestGift, setViewingGuestGift] = useState(null);

  // Check saved session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === weddingConfig.adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setAuthError('');
      addToast('Acesso administrativo autorizado!', 'success');
    } else {
      setAuthError('Senha incorreta. Tente novamente.');
      addToast('Senha incorreta', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setPasswordInput('');
    addToast('Sessão encerrada.', 'info');
  };

  // Handlers for Gift Actions
  const handleOpenAddModal = () => {
    setEditingGift(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (gift) => {
    setEditingGift(gift);
    setIsFormModalOpen(true);
  };

  const handleSaveGift = async (giftData) => {
    if (editingGift) {
      await updateGift(editingGift.id, giftData);
    } else {
      await addGift(giftData);
    }
  };

  const handleDeletePrompt = (gift) => {
    setConfirmModalConfig({
      isOpen: true,
      title: 'Excluir Presente',
      message: `Tem certeza que deseja excluir "${gift.name}" da lista de presentes? Esta ação não pode ser desfeita.`,
      confirmText: 'Excluir',
      isDanger: true,
      onConfirm: async () => {
        await deleteGift(gift.id);
        setConfirmModalConfig((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleReleasePrompt = (gift) => {
    setConfirmModalConfig({
      isOpen: true,
      title: 'Liberar Presente',
      message: `Deseja cancelar a reserva de "${gift.name}" feita por ${gift.reservedBy || 'convidado'} e torná-lo disponível novamente para outros convidados?`,
      confirmText: 'Tornar Disponível',
      isDanger: false,
      onConfirm: async () => {
        await releaseGift(gift.id);
        setConfirmModalConfig((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  const handleResetDefaultsPrompt = () => {
    setConfirmModalConfig({
      isOpen: true,
      title: 'Restaurar Lista Padrão',
      message: 'Esta ação irá restaurar os 18 presentes fictícios originais e limpar todas as reservas atuais. Deseja continuar?',
      confirmText: 'Restaurar Padrão',
      isDanger: true,
      onConfirm: async () => {
        await resetDefaults();
        setConfirmModalConfig((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  // 1. Password Protection View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-cream-200 shadow-xl text-center animate-fade-in">
          
          <div className="w-16 h-16 rounded-2xl bg-gold-50 border border-gold-200 text-gold-600 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-olive-700 block mb-1">
            Área Restrita
          </span>
          <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
            Painel dos Noivos
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mb-6">
            Digite a senha configurada em <code className="bg-cream-100 px-1.5 py-0.5 rounded text-charcoal-800">src/config.js</code> para gerenciar a lista de presentes.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-pass" className="sr-only">
                Senha de Acesso
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Senha de acesso (Padrão: 123456)"
                className="w-full px-4 py-3 rounded-xl border border-cream-300 text-sm text-center text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-gold-400 placeholder:text-charcoal-400 font-medium"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-white font-semibold text-sm shadow-gold transition-all duration-200"
            >
              Acessar Painel
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-cream-100">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-500 hover:text-gold-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para o site</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. Full Authenticated Admin Dashboard View
  return (
    <div className="pt-28 pb-20 sm:pt-32 sm:pb-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Navigation Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-cream-200 shadow-soft mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 leading-tight">
                Painel Administrativo dos Noivos
              </h1>
              <span className="text-xs text-charcoal-500">
                {weddingConfig.groomName} & {weddingConfig.brideName} • Gerenciamento da Lista
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <Link
              to="/"
              className="text-xs font-semibold text-charcoal-600 hover:text-gold-600 px-3 py-2 rounded-lg hover:bg-cream-50"
            >
              Visualizar Site
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-cream-300 text-charcoal-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Security / Prototype Notice Banner */}
        <div className="p-4 rounded-2xl bg-gold-50/70 border border-gold-200 text-charcoal-800 text-xs leading-relaxed mb-8 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-gold-600 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="font-semibold block text-gold-900 mb-0.5">
              Ambiente de Armazenamento Local (LocalStorage)
            </strong>
            <span>
              Todas as alterações de presentes e reservas estão sendo salvas no navegador local. A camada de serviços (<code className="font-mono bg-white/70 px-1 py-0.5 rounded">src/services/giftService.js</code>) está preparada para ser conectada diretamente ao Supabase ou Firebase quando desejado.
            </span>
          </div>
        </div>

        {/* Dashboard KPI Stats */}
        <AdminDashboard
          gifts={gifts}
          onOpenAddModal={handleOpenAddModal}
          onResetDefaults={handleResetDefaultsPrompt}
        />

        {/* Management Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Gerenciar Itens da Lista
            </h3>
            <span className="text-xs text-charcoal-500">
              {gifts.length} presentes cadastrados
            </span>
          </div>

          <GiftTable
            gifts={gifts}
            onEditGift={handleOpenEditModal}
            onDeleteGift={handleDeletePrompt}
            onReleaseGift={handleReleasePrompt}
            onViewGuest={(gift) => setViewingGuestGift(gift)}
          />
        </div>

      </div>

      {/* Gift Create / Edit Form Modal */}
      <GiftFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveGift}
        initialData={editingGift}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModalConfig.isOpen}
        onClose={() => setConfirmModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModalConfig.onConfirm}
        title={confirmModalConfig.title}
        message={confirmModalConfig.message}
        confirmText={confirmModalConfig.confirmText}
        isDanger={confirmModalConfig.isDanger}
      />

      {/* Guest Details Modal */}
      <GuestDetailsModal
        isOpen={!!viewingGuestGift}
        onClose={() => setViewingGuestGift(null)}
        gift={viewingGuestGift}
      />
    </div>
  );
};
