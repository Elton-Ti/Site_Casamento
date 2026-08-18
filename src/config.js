/**
 * Configurações Principais do Casamento
 * 
 * Centralize aqui todas as informações do casal, data, chave PIX e credenciais de teste.
 * Essas variáveis são utilizadas em todo o site.
 */

export const weddingConfig = {
  // Nomes dos Noivos
  groomName: "Elton",
  brideName: "Ana Julia",

  // Data do Casamento (Formato: YYYY-MM-DDTHH:mm:ss)
  // 23 de Outubro de 2027
  weddingDate: "2027-10-23T18:00:00",

  // Local do Casamento
  weddingLocation: "Restaurante É da Pam",

  // Configurações do PIX para presentes
  pixKey: "[CHAVE PIX]", // Exemplo: seu-email@pix.com.br ou chave aleatória
  pixKeyType: "Chave Aleatória / E-mail / Telefone",
  pixBeneficiaryName: "Elton & Ana Julia",
  pixCity: "São Paulo",

  // Senha do Painel Administrativo (/admin)
  // ⚠️ IMPORTANTE: Esta é uma proteção provisória em LocalStorage/frontend.
  // Quando conectar a um backend real (Supabase/Firebase), substitua por autenticação JWT/OAuth segura.
  adminPassword: "123456",

  // Mensagens e Textos
  welcomeText: "Estamos muito felizes em compartilhar esse momento especial com vocês. Criamos esta lista de presentes para que você possa fazer parte desse novo capítulo das nossas vidas.",
  
  storyTitle: "Nossa História de Amor",
  storyText: "Estamos muito felizes em celebrar esse momento ao lado das pessoas que amamos. Nosso casamento no Restaurante É da Pam representa o início de uma linda etapa das nossas vidas, repleta de sonhos, companheirismo e muito amor. Cada detalhe foi pensado com carinho para receber você nesse dia inesquecível!",

  // Mensagem exibida no modal após confirmação do presente
  reservationSuccessMessage: "Ficamos imensamente felizes com o seu carinho e por fazer parte do nosso grande dia!",

  // Contato dos noivos para dúvidas
  contactEmail: "contato@casamento.com",
  contactPhone: "(11) 99999-9999"
};
