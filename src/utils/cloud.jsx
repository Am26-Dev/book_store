import { v2 as cloudinary } from "cloudinary";


export const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name:import.meta.env.VITE_CLOUD_NAME,
        api_key:import.meta.env.VITE_CLOUD_API_KEY,
        api_secret:import.meta.env.VITE_CLOUD_API_SECRET_KEY,    
    })

}