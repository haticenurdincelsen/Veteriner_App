import axios from "axios";

// Get all vaccines
export const getAllVaccines = async () => {
    const { data } = await axios.get("http://localhost:8080/api/v1/vaccines");
    return data;
};

// Create a new vaccine
export const createVaccine = async (vaccine) => {
    const { data } = await axios.post("http://localhost:8080/api/v1/vaccines", vaccine);
    return data;
};

// Update an existing vaccine
export const updateVaccine = async (vaccine) => {
    const { data } = await axios.put(`http://localhost:8080/api/v1/vaccines/${vaccine.id}`, vaccine);
    return data;
};

// Delete a vaccine by ID
export const deleteVaccine = async (id) => {
    const { data } = await axios.delete(`http://localhost:8080/api/v1/vaccines/${id}`);
    return data;
};
