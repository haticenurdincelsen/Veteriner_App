import axios from "axios";
//Dataları Çektiğimiz Kısım
export const getAnimals= async () => {
    const {data} = await axios.get("http://localhost:8080/api/v1/animals");
    return data;
}
//Delete işlemi
export const deleteAnimal= async (id) => {
    const {data} = await axios.delete(`http://localhost:8080/api/v1/animals/${id}`
    );
    return data;
}

export const createAnimal = async (animal) =>{
    const {data} = await axios.post(`http://localhost:8080/api/v1/animals` , animal);
    return data;
}

export const updateAnimalFunc = async (animal) => {   
    const {data} =await axios.put(`http://localhost:8080/api/v1/animals/${animal.id}`, animal);
    return data;
};