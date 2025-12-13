import {create} from 'zustand';

export const userStore=create((set) => ({
    user:{
        name: 'joshiji',
    }
}));