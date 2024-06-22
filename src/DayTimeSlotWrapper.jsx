import React from 'react';

const DayTimeSlotWrapper = ({ children, value, openModal }) => {
    const handleClick = () => {
        openModal(value.getHours());
    };

    return (
        <div
            onClick={handleClick}
            style={{
                cursor: 'pointer',
                height: '100%',
                backgroundColor: value.getDay() === 0 || value.getDay() === 1 ? 'transparent' : '#ffffff',
                pointerEvents: value.getDay() === 0 || value.getDay() === 1 ? 'none' : 'auto',
                borderLeft: '1px solid #ddd', // Añade borde izquierdo para separar las columnas
            }}
        >
            {children}
        </div>
    );
};

export default DayTimeSlotWrapper;
