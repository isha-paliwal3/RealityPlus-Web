import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                onLogout();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('There was an error logging out', error);
        }
        setIsLoading(false);
    };

    return (<div  className="flex items-center justify-center">
        <button onClick={handleLogout}>
            Logout
        </button>
        {isLoading && (
            <div className="loader-container">
                <CircularProgress />
            </div>
        )}
    </div>
    );
};

export default LogoutButton;
