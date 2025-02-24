import type { IUser } from '@uniteam31/uni-shared-types';

export interface IPersonalData extends Omit<IUser, '_id'> {}

export type TNameFormFields = Pick<IPersonalData, 'firstName' | 'lastName'>;

export type TUsernameFormFields = Pick<IPersonalData, 'username'>;
