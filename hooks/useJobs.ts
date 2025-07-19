import { useQuery } from "@tanstack/react-query";

import axios from "axios";

// Custom hook to debounce a value

const useJobs = () => {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get(`/api/job`);
      if (res) {
        return res.data.jobs;
      }
    },
  });

  return { jobs, isLoading };
};

export default useJobs;
