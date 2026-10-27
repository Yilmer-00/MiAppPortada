import { useState } from 'react';
import api from '../config/env';

export const useApiMutation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async ({ method = 'post', endpoint, body = null }) => {
        try {
            setLoading(true);
            setError(null);
            const response = await api[method.toLowerCase()](endpoint, body);
            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error en la operación';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { execute, loading, error };
};