import { createContext, useState } from "react";

export const ShipmentContext = createContext();

export const ShipmentContextProvider = ({ children }) => {
    const [isCheckModalVisible, setIsCheckModalVisible] = useState(false);

    const showCheckModal = () => {
        setIsCheckModalVisible(true);
    };

    const hideCheckModal = () => {
        setIsCheckModalVisible(false);
    };

    return (
        <ShipmentContext.Provider
            value={{
                isCheckModalVisible,
                hideCheckModal,
                showCheckModal,
            }}
        >
            {children}
        </ShipmentContext.Provider>
    );
};
