import { createContext, Dispatch, SetStateAction } from 'react';
import { IUserData } from '../interfaces/userData';
type UserContextType = [IUserData | null, Dispatch<SetStateAction<any>>];

export const UserContext = createContext<UserContextType>([null, () => {}]);
