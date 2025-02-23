import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://yn-alpha.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;