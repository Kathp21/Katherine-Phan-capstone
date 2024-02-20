import ReactSlider from "react-slider"
import './Slider.scss'
import { useState } from "react";

const Slider = () => {
    const [value, setValue] = useState(0);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        // Update the custom property for styling
        document.documentElement.style.setProperty('--slider__value', newValue);
    };

    return (
        <>
            <label htmlFor="budget" className="slider">Budget:</label><br />
            <div className="slider__container">
                <input
                    type="range"
                    id="budget"
                    name="budget"
                    min="0"
                    max="10000"
                    step="100"
                    value={value}
                    list="values"
                    onInput={handleInputChange}
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