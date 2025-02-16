export type withId<T> = T & { id: string };

export type withTimeStamps<T> = T & { createdAt: Date; updatedAt: Date };

export type OmitBaseProps<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
