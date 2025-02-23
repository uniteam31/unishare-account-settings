import type { IUser } from '@uniteam31/uni-shared-types';

export interface IPersonalData extends Omit<IUser, '_id'> {}

export type TPersonalDataField = keyof IPersonalData;
