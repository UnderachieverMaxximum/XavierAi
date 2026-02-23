// Type definitions for file system

type FileSystemEntry = {
    name: string;
    path: string;
    type: 'file' | 'directory';
    size?: number;
    lastModified?: Date;
};

// Type definitions for API responses

type ApiResponse<T> = {
    status: number;
    message: string;
    data?: T;
};

// Type definitions for database schemas

type UserSchema = {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
};

type PostSchema = {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
};

// Additional types can be added here as needed