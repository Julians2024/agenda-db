import React from 'react';

const MonthCellWrapper = (props) => {
    const { children, setSelectedDate, setView, ...restProps } = props;

    const handleClick = (value) => {
        setSelectedDate(value);
        setView('day');
    };

    return (
        <div
            {...restProps}
            className={`custom-date-cell ${restProps.value.getDate() === props.selectedDate?.getDate() ? 'selected' : ''}`}
            onClick={() => handleClick(restProps.value)}
        >
            {children}
        </div>
    );
};

export default MonthCellWrapper;

