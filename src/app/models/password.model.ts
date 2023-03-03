export interface IPassword {
  id: string;
  email: string;
  username: string;
  password: string;
}

export type createPasswordDTO = Omit<IPassword, 'id'>;

export type editPasswordDTO = Partial<IPassword>;
