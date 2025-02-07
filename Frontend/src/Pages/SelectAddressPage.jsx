import axios from "axios";
import React, { useEffect, useState } from "react";
import AddressList from "../Components/Profile/AddressList";

const SelectAddressPage = () => {
    const [allAddresses, setAllAddress] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("token missing");
            }

            const response = await axios.get(
                `http://localhost8080/user/get-addresses?token=${token}`
            );

            setAllAddress(response.data.userInfo.address);
        };

        fetchAddresses();
    }, []);

    return (
        <div>
            <AddressList addresses={allAddresses} />
        </div>
    );
};

export default SelectAddressPage;
