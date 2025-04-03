import {create} from 'zustand';
import AsyncStoreage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set)=>({
    user:null,
    token:null,
    isLoading:false,

    register:async (username, email, password)=>{
        set({isLoading:true});
        try{
            const response = await fetch('https://bookworm-4otg.onrender.com/api/auth/register', { 
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({username, email, password}),
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || 'Something went wrong!');
            }
            await AsyncStoreage.setItem('user', JSON.stringify(data.user));
            await AsyncStoreage.setItem('token', data.token);

            set({user:data.user, token:data.token, isLoading:false});
            return {success:true}
        }catch(error){
            set({isLoading:false});
            return {success:false, error:error.message}
        }

    },
    login:async (email, password)=>{
        set({isLoading:true});
        try {
           const response =  await fetch('https://bookworm-4otg.onrender.com/api/auth/login', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({email, password}),
            })

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || 'Something went wrong!');
            }
            await AsyncStoreage.setItem('user', JSON.stringify(data.user));
            await AsyncStoreage.setItem('token', data.token);

            set({user:data.user, token:data.token, isLoading:false});
            return {success:true}

        } catch (error) {
            
            set({isLoading:false});
            return {success:false, error:error.message}
        }
    },
    checkAuth: async () => {
        try {
            const token = await AsyncStoreage.getItem('token');
            const userJSON = await AsyncStoreage.getItem('user');
            const user = userJSON ? JSON.parse(userJSON) : null;
            if (token && user) {
                set({ token, user });
            } else {
                set({ token: null, user: null });
            }
        } catch (error) {
            console.log('Error checking auth:', error);
            set({ token: null, user: null });
            
        }
    },
    logout: async () => {
        await AsyncStoreage.removeItem('token');
        await AsyncStoreage.removeItem('user');
        set({ token: null, user: null });
    }
}))