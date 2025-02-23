import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTasks = () => {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosPublic.get("/tasks"); 
      return response.data;
    },
  });
};

export default useTasks;
