import React, { createContext, useContext, useState } from 'react';
const ConfirmationContext = createContext();

export const useConfirmation = () => useContext(ConfirmationContext);

export const ConfirmationProvider = ({ children }) => {
    const [confirmation, setConfirmation] = useState({
        isOpen: false,
        message: '',
        onConfirm: null,
        onCancel: null,
    });

    const requestConfirmation = (message) => {
        return new Promise((resolve, reject) => {
            setConfirmation({
                isOpen: true,
                message,
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false),
            });
        });
    };

    const handleClose = () => setConfirmation({ ...confirmation, isOpen: false });

    return (
        <ConfirmationContext.Provider value={{ requestConfirmation }}>
            {children}
            {confirmation.isOpen && (
                <div className="mailPopUpLayer addCategory">
                    <div className="popUpBox">
                        <h3 className="confirmationMessage">{confirmation.message}</h3>
                        <div className="btn-container confirmation">
                            <button onClick={() => { confirmation.onConfirm(); handleClose(); }}>
                                Yes
                            </button>
                            <button className="btn-secondary" onClick={() => { confirmation.onCancel(); handleClose(); }}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmationContext.Provider>
    );
};
