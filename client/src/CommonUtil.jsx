import axios from 'axios';
import { toast } from 'react-toastify';

const apiRequest = async (url, method = 'GET', payload = null, options = {}, silent = false) => {
  try {
    const config = {
      method,
      url,
      data: payload,
      ...options,
    };

    const response = await axios(config);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    // console.error('API Error:', error);

    if (!silent) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong!',
        { position: 'top-right' }
      );
    }
    throw error;
  }
};

export default apiRequest;
