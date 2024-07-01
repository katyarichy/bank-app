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
