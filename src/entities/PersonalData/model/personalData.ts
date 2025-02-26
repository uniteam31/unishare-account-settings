import type { TPublicUser } from 'shared/types';

export interface IPersonalData extends Omit<TPublicUser, '_id'> {}

export type TNameFormFields = Pick<IPersonalData, 'firstName' | 'lastName'>;

export type TUsernameFormFields = Pick<IPersonalData, 'username'>;
