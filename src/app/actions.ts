// src/app/actions.ts
'use server';

export async function generateDesignSystem(prompt: string) {
  // Це заглушка. Пізніше сюди можна підключити OpenAI
  console.log("Generating design for:", prompt);
  
  // Повертаємо фейкову тему
  return {
    primaryColor: '#3b82f6',
    font: 'Inter',
    style: 'modern'
  };
}