import React from 'react';

interface LogoutButtonProps {
    onLogout: () => void; // Callback function to handle any additional actions after logout
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {

    const handleLogout = async () => {
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
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
