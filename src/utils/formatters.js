/**
 * Utilitários de Formatação para a aplicação
 */

/**
 * Formata um número para moeda brasileira Real (R$)
 * @param {number|string} value 
 * @returns {string} Ex: "R$ 349,90"
 */
export const formatCurrency = (value) => {
  const number = Number(value) || 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};

/**
 * Formata uma data para o padrão legível brasileiro
 * @param {string|Date} dateValue 
 * @param {boolean} includeTime 
 * @returns {string} Ex: "28 de Novembro de 2026" ou "28/11/2026 às 17:00"
 */
export const formatDate = (dateValue, includeTime = false) => {
  if (!dateValue) return '';
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return String(dateValue);

  if (includeTime) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

/**
 * Formata o telefone / WhatsApp para visualização limpa
 * @param {string} phone 
 * @returns {string}
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};
