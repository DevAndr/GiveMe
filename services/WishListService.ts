// 'use server'

import axiosInstance from '@/lib/axiosInstance';

export const getWishLists = async () => {
    const data = await axiosInstance.get('/wish-list/lists')
    return data.data;
}