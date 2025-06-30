import { registerWebComponents } from './register';
import { parseChatbot, injectChatbotInWindow } from './window';

registerWebComponents();

const chatbot = parseChatbot();

injectChatbotInWindow(chatbot);

// Force bundling of DefaultAvatar component (prevents tree-shaking)
import { DefaultAvatar } from '@/components/avatars/DefaultAvatar';

export default chatbot;
