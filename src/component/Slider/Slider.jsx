import './Slider.scss'
import { useState } from "react";

const Slider = ({value, onChange}) => {

    const handleChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <>
            <label htmlFor="budget" className="slider">Budget:</label>
            <div className="slider__container">
                <input
                    type="range"
                    id="budget"
                    name="budget"
                    min="0"
                    max="10000"
                    step="10"
                    value={value}
                    list="values"
                    onChange={handleChange}
                />
                <output className="slider__value" style={{ left: `${value / 100}%` }}>${value}</output>
                <datalist className="slider__value-range">
                    <option value="0" label="0"></option>
                    <option value="10000" label="10000"></option>
                </datalist>  
            </div>
        </>
      
    );
};
export default Slider;