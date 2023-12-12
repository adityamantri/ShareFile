import axios from 'axios';

const API_URL = 'http://localhost:8000';
export const getSignedUrl = async () => {
    try{
        const response = await axios.get(`${API_URL}/image-url`);
        return response.data;
    } catch (error){
        console.log('Error while calling the api', error.message);
        return error.response.data;
    }
}

export const uploadFile = async (url, file) => {
    try{
        const response = await axios.put(url, file, { 'Content-Type': 'multipart/form-data'});
        return response.data;
    } catch (error){
        console.log('Error while calling the api', error.message);
        return error.response.data;
    }
}