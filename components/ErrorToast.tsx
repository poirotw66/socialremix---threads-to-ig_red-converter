import React, { useEffect } from 'react';

export interface ErrorToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    type?: 'error' | 'warning' | 'info';
    duration?: number;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({
    message,
    isVisible,
    onClose,
    type = 'error',
    duration = 5000,
}) => {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const bgColor =
        type === 'error'
            ? 'bg-red-50 border-red-200 text-red-800'
            : type === 'warning'
            ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
            : 'bg-blue-50 border-blue-200 text-blue-800';

    const iconColor =
        type === 'error'
            ? 'text-red-600'
            : type === 'warning'
            ? 'text-yellow-600'
            : 'text-blue-600';

    return (
        <div
            className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-xl border shadow-lg ${bgColor} animate-in slide-in-from-right-4 fade-in duration-300`}
            role="alert"
        >
            <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 ${iconColor}`}>
                    {type === 'error' ? (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    ) : type === 'warning' ? (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className={`flex-shrink-0 ${iconColor} hover:opacity-70 transition-opacity`}
                    aria-label="Close error message"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
