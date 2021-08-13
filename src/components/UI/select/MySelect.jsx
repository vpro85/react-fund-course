import React from 'react';

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select>
            <option disabled value="">{defaultValue}</option>
            {options.map(option => {
                return <option key={option.value} value={option.value}>{option.name}</option>
            })}
        </select>
    );
};

export default MySelect;