import { Message } from "@repo/dtos/message";

export const example = () => {
  const mensagem: Message = {
    message: 'Hello Application'
  }
  return mensagem.message
};