import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image as ImageIcon, DollarSign, Tag, FileText } from 'lucide-react';
import { GIFT_CATEGORIES } from '../../data/gifts';
import { useToast } from '../../context/ToastContext';

export const GiftFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Casa');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = GIFT_CATEGORIES.filter((c) => c !== 'Todos');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setCategory(initialData.category || 'Casa');
      setPrice(initialData.price !== undefined ? String(initialData.price) : '');
      setImage(initialData.image || '');
    } else {
      setName('');
      setDescription('');
      setCategory('Casa');
      setPrice('');
      setImage('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Informe o nome do presente.', 'error');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      addToast('Informe um valor válido maior que zero.', 'error');
      return;
    }

    setIsSubmitting(true);

    const giftData = {
      name: name.trim(),
      description: description.trim(),
      category,
      price: parsedPrice,
      image: image.trim() || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
    };

    await onSave(giftData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-cream-200 animate-fade-in-up">
        
        {/* Header */}
        <div className="p-6 border-b border-cream-200 flex items-center justify-between bg-cream-50/50">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900">
              {initialData ? 'Editar Presente' : 'Adicionar Novo Presente'}
            </h3>
            <p className="text-xs text-charcoal-500">
              Preencha as informações do item para a lista de presentes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-cream-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Nome */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Nome do Presente *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Jogo de Panelas Antiaderente"
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
          </div>

          {/* Categoria & Preço */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                Categoria *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                Valor (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 349.90"
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </div>

          {/* Imagem URL */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              URL da Imagem
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
            />
            {image && (
              <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-cream-50 border border-cream-200">
                <img
                  src={image}
                  alt="Prévia"
                  className="w-12 h-12 rounded-lg object-cover border border-white"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <span className="text-xs text-charcoal-500">Prévia da imagem informada</span>
              </div>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
              Descrição
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva por que esse presente é importante para a casa nova..."
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-cream-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-cream-300 text-charcoal-600 hover:bg-cream-100 text-xs sm:text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white text-xs sm:text-sm font-semibold shadow-gold transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : initialData ? 'Salvar Alterações' : 'Criar Presente'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
