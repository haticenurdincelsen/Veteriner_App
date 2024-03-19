import axios from "axios";

export const getCustomer= async () =>{
    const {data} = await axios.get("http://localhost:8080/api/v1/customers");
    return data;
};

export const deleteCustomer = async (id) => {
    const {data} = await axios.delete(`http://localhost:8080/api/v1/customers/${id}`);
    return data;
};

export const createCustomer = async (customer) => {
    const {data} = await axios.post(`http://localhost:8080/api/v1/customers` , customer);
    return data;
};

export const updateCustomerFunc = async (customer) => {   
    const {data} =await axios.put(`http://localhost:8080/api/v1/customers/${customer.id}`, customer);
    
    return data;
};