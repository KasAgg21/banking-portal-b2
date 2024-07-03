import React, { useState } from 'react';
import axios from 'axios';
import '../styles/homeAddressForm.css'

const HomeAddress = () => {
    const [userAddress, setUserAddress] = useState({
        locality: "",
        sub_area: "",
        house_no: "",
        street: "",
        sec_street: "",
        city: "",
        postcode: ""
    });

    const [address, setAddress] = useState([]);
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const name = e.target.name; // Use the parameter 'e' instead of 'event'
        const value = e.target.value; // Define 'value' from 'e.target'
    
        setUserAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    }

    const validate = () => {
        const newErrors = {};
        Object.keys(userAddress).forEach((key) => {
            if (!userAddress[key] && key !== 'sub_area' && key !== 'sec_street') {
                newErrors[key] = `${key} is required`;
            }
        });
        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const currUserAddress = {...userAddress};
            setAddress([...address, currUserAddress]);
            try{
                const response = await axios.post('http://localhost:5000/userbase/user-address', userAddress);
                console.log('Response:', response.data);
            } catch (err) {
                console.log('Address submission error:', err);
            }
            setUserAddress({
                locality:"",
                sub_area: "",
                house_no: "",
                street: "",
                sec_street: "",
                city: "",
                postcode: ""
            });
            setErrors({});
        }
    }

    return (
        <form action="" onSubmit = {handleSubmit}>
            <div>
                <label htmlFor='locality'>Locality</label>
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={userAddress.locality}
                    onChange={handleInput}
                    name="locality" 
                    placeholder='locality'
                />
                {errors.locality && <p className="error">{errors.locality}</p>}
            </div>
            <div>
                <label htmlFor='sub_area'>Sub Area</label>
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={userAddress.sub_area}
                    onChange={handleInput}
                    name="sub_area" 
                    placeholder='sub_area'
                />
                {errors.sub_area && <p className="error">{errors.sub_area}</p>}
            </div>
            <div>
                <label htmlFor='house_no'>House No</label>
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={userAddress.house_no}
                    onChange={handleInput}
                    name="house_no" 
                    placeholder='house_no'
                />
                {errors.house_no && <p className="error">{errors.house_no}</p>}
            </div>
            <div>
                <label htmlFor='street'>Street</label>
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={userAddress.street}
                    onChange={handleInput}
                    name="street" 
                    placeholder='street'
                />
                {errors.street && <p className="error">{errors.street}</p>}
            </div>
            <div>
                <label htmlFor='sec_street'>Sec Street</label>
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={userAddress.sec_street}
                    onChange={handleInput}
                    name="sec_street" 
                    placeholder='sec_street'
                />
                {errors.sec_street && <p className="error">{errors.sec_street}</p>}
            </div>
            <div>
                <label htmlFor='city'>City</label>
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={userAddress.city}
                    onChange={handleInput}
                    name="city" 
                    placeholder='city'
                />
                {errors.city && <p className="error">{errors.city}</p>}
            </div>
            <div>
                <label htmlFor='postcode'>Postcode</label>
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={userAddress.postcode}
                    onChange={handleInput}
                    name="postcode" 
                    placeholder='postcode'
                />
                {errors.postcode && <p className="error">{errors.postcode}</p>}
            </div>

            <button type="submit">Add Address</button>
        </form>
    )
}

export default HomeAddress;
