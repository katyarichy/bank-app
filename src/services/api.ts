import axios from 'axios';
import { Account } from '../types';

const API_URL = 'http://localhost:3001';

export const getAccounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/accounts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const createAccount = async (account: Omit<Account, 'id'>) => {
  try {
    const response = await axios.post(`${API_URL}/accounts`, account);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const updateAccount = async (id: number, account: Account) => {
  try {
    const response = await axios.put(`${API_URL}/accounts/${id}`, account);
    return response.data;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};

export const deleteAccount = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/accounts/${id}`);
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

export const isOwnerIdDuplicate = async (ownerId: number) => {
  try {
    const accounts = await getAccounts();
    return accounts.some((account: any) => account.ownerId === ownerId);
  } catch (error) {
    console.error('Error checking for duplicate owner ID:', error);
    throw error;
  }
};

export const getAccountByOwnerId = async (
  ownerId: number
): Promise<Account | null> => {
  try {
    const response = await axios.get(`${API_URL}/accounts?ownerId=${ownerId}`);
    const accounts = response.data;
    if (!accounts.length) {
      throw new Error('Account not found');
    }
    return accounts[0];
  } catch (error) {
    console.error('Error fetching account:', error);
    return null;
  }
};

export const transferFunds = async (
  fromOwnerId: number,
  toOwnerId: number,
  amount: number
) => {
  if (fromOwnerId === toOwnerId) {
    throw new Error('Sender and recipient IDs must be different');
  }

  const fromAccount = await getAccountByOwnerId(fromOwnerId);
  const toAccount = await getAccountByOwnerId(toOwnerId);

  if (!fromAccount || !toAccount) {
    throw new Error('Account not found');
  }

  if (fromAccount.currency !== toAccount.currency) {
    throw new Error('Currencies do not match');
  }

  if (fromAccount.balance < amount) {
    throw new Error('Insufficient funds');
  }

  fromAccount.balance -= amount;
  toAccount.balance += amount;

  await updateAccount(fromAccount.id, fromAccount);
  await updateAccount(toAccount.id, toAccount);
};
