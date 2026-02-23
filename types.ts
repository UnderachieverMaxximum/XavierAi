
export interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export enum AppState {
  LANDING = 'LANDING',
  FILE_MANAGER = 'FILE_MANAGER',
}

export enum FileManagerView {
  EXPLORER = 'EXPLORER',
  SETTINGS = 'SETTINGS',
  GRAPHS = 'GRAPHS',
  SECURITY = 'SECURITY',
  CHAT = 'CHAT',
  OPTIMIZE = 'OPTIMIZE',
  LOGS = 'LOGS',
  MONITOR = 'MONITOR',
}

export interface LogFile {
  id: string;
  name: string;
  type: 'file';
  size: string;
  date: string;
  content?: string;
}

export interface LogFolder {
  id: string;
  name: string;
  type: 'folder';
  items: (LogFile | LogFolder)[];
}

export interface TranscriptionItem {
  type: 'input' | 'output';
  text: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'apk' | 'zip';
  modifiedDate: string;
  path: string;
  isFavorite?: boolean;
}

export interface StorageCategory {
  name: string;
  size: string;
  color: string;
  count: number;
}

export interface StorageStats {
  total: string;
  used: string;
  percentage: number;
  categories: StorageCategory[];
}
