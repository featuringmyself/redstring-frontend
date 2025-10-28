import { toast } from "react-toastify";

// Utility function to handle API response messages
export const handleApiResponse = (response: any, successMessage?: string) => {
    if (response.data) {
        // Handle success cases
        if (response.data.success === true || response.status === 200) {
            const message = response.data.message || successMessage || "Operation successful!";
            toast.success(message);
            return true;
        }

        // Handle error cases with success: false
        if (response.data.success === false) {
            const message = response.data.message || "Operation failed";
            toast.error(message);
            return false;
        }

        // Handle cases where there's a message but no success field
        if (response.data.message) {
            toast.info(response.data.message);
            return true;
        }
    }

    // Default success for 2xx status codes
    if (response.status >= 200 && response.status < 300) {
        toast.success(successMessage || "Operation successful!");
        return true;
    }

    return false;
};

// Utility function to handle API errors
export const handleApiError = (error: any, defaultMessage?: string) => {
    let message = defaultMessage || "An error occurred";

    if (error.response?.data?.message) {
        message = error.response.data.message;
    } else if (error.response?.data?.error) {
        message = error.response.data.error;
    } else if (error.message) {
        message = error.message;
    }

    toast.error(message);
};

// Utility function to show loading toast
export const showLoadingToast = (message: string = "Loading...") => {
    return toast.loading(message);
};

// Utility function to update loading toast
export const updateLoadingToast = (toastId: any, type: 'success' | 'error', message: string) => {
    toast.update(toastId, {
        render: message,
        type: type,
        isLoading: false,
        autoClose: 5000,
    });
};