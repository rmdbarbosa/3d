import type { AdminMessage } from "@/features/admin-gallery/types";

const LOGIN_MESSAGES = new Map<string, AdminMessage>([
  [
    "invalid-password",
    {
      text: "Senha incorreta. Tente novamente.",
      variant: "error",
    },
  ],
  [
    "missing-config",
    {
      text: "Configuração do admin incompleta. Verifique as variáveis de ambiente.",
      variant: "error",
    },
  ],
  [
    "session-expired",
    {
      text: "Sua sessão expirou. Entre novamente para continuar.",
      variant: "error",
    },
  ],
]);

const UPLOAD_MESSAGES = new Map<string, AdminMessage>([
  [
    "success",
    {
      text: "Imagem cadastrada com sucesso.",
      variant: "success",
    },
  ],
  [
    "missing-fields",
    {
      text: "Preencha todos os campos obrigatórios.",
      variant: "error",
    },
  ],
  [
    "missing-file",
    {
      text: "Selecione uma imagem para enviar.",
      variant: "error",
    },
  ],
  [
    "invalid-file-type",
    {
      text: "Use uma imagem JPG, PNG, WEBP ou GIF.",
      variant: "error",
    },
  ],
  [
    "file-too-large",
    {
      text: "A imagem deve ter no máximo 5MB.",
      variant: "error",
    },
  ],
  [
    "invalid-sort-order",
    {
      text: "A ordem precisa ser um número inteiro.",
      variant: "error",
    },
  ],
  [
    "missing-config",
    {
      text: "Configuração do Supabase incompleta. Verifique as variáveis de ambiente.",
      variant: "error",
    },
  ],
  [
    "storage-error",
    {
      text: "Não foi possível enviar a imagem. Tente novamente.",
      variant: "error",
    },
  ],
  [
    "database-error",
    {
      text: "Não foi possível cadastrar a imagem. Tente novamente.",
      variant: "error",
    },
  ],
]);

const MANAGE_MESSAGES = new Map<string, AdminMessage>([
  [
    "update-success",
    {
      text: "Item atualizado com sucesso.",
      variant: "success",
    },
  ],
  [
    "delete-success",
    {
      text: "Item excluÃ­do com sucesso.",
      variant: "success",
    },
  ],
  [
    "missing-fields",
    {
      text: "Preencha todos os campos obrigatÃ³rios.",
      variant: "error",
    },
  ],
  [
    "missing-item",
    {
      text: "Item invÃ¡lido. Atualize a pÃ¡gina e tente novamente.",
      variant: "error",
    },
  ],
  [
    "not-found",
    {
      text: "Item nÃ£o encontrado. Atualize a pÃ¡gina e tente novamente.",
      variant: "error",
    },
  ],
  [
    "invalid-file-type",
    {
      text: "Use uma imagem JPG, PNG, WEBP ou GIF.",
      variant: "error",
    },
  ],
  [
    "file-too-large",
    {
      text: "A imagem deve ter no mÃ¡ximo 5MB.",
      variant: "error",
    },
  ],
  [
    "invalid-sort-order",
    {
      text: "A ordem precisa ser um nÃºmero inteiro.",
      variant: "error",
    },
  ],
  [
    "missing-config",
    {
      text: "ConfiguraÃ§Ã£o do Supabase incompleta. Verifique as variÃ¡veis de ambiente.",
      variant: "error",
    },
  ],
  [
    "storage-error",
    {
      text: "NÃ£o foi possÃ­vel atualizar o arquivo da imagem. Tente novamente.",
      variant: "error",
    },
  ],
  [
    "database-error",
    {
      text: "NÃ£o foi possÃ­vel salvar a alteraÃ§Ã£o. Tente novamente.",
      variant: "error",
    },
  ],
]);

export function getAdminLoginMessage(code: string | undefined) {
  if (!code) {
    return null;
  }

  return LOGIN_MESSAGES.get(code) ?? null;
}

export function getGalleryUploadMessage(code: string | undefined) {
  if (!code) {
    return null;
  }

  return UPLOAD_MESSAGES.get(code) ?? null;
}

export function getGalleryManageMessage(code: string | undefined) {
  if (!code) {
    return null;
  }

  return MANAGE_MESSAGES.get(code) ?? null;
}
