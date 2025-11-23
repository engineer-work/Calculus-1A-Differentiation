export interface TopicNode {
  id: string;
  title: string;
  children?: TopicNode[];
  type: 'category' | 'topic';
  imageUrl?: string;
  content?: string;
}

export interface LessonState {
  topicId: string | null;
  topicTitle: string;
  content: string;
  imageUrl?: string | null;
  isLoading: boolean;
  error: string | null;
}

export enum GeminiModel {
  FLASH = 'gemini-2.5-flash',
  PRO = 'gemini-3-pro-preview',
}