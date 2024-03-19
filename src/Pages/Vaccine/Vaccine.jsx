import { useState, useEffect } from "react";
import { getAllVaccines, createVaccine, updateVaccine, deleteVaccine } from "../../API/Vaccine";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from '@mui/icons-material/Delete';


function Vaccine() {
    const [vaccines, setVaccines] = useState([]);
    const [reload, setReload] = useState(true);
    const [newVaccine, setNewVaccine] = useState({
      name: "",
      code: "",
      protectionStartDate: "",
      protectionFinishDate: "",
      animal: { id: "" },
    });
    const [updateVaccineData, setUpdateVaccineData]= useState({
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: "",
        animal: { id: "" },
      });
    const [animals, setAnimals] = useState([]); // Hayvan verileri

    useEffect(() => {
        getAllVaccines().then((data) => {
          setVaccines(data);
        });
        // Tüm hayvanları al
        getAllAnimals().then((data) => {
          setAnimals(data);
        });
        setReload(false);
      }, [reload]);
      
    // Tüm hayvanları getiren fonksiyon
    const getAllAnimals = async () => {
      const response = await fetch("http://localhost:8080/api/v1/animals");
      const data = await response.json();
      return data;
    };

      const handleCreate = () => {
        createVaccine(newVaccine).then(() => {
          setReload(true);
        });
        setNewVaccine((prevVaccine) => ({
          ...prevVaccine,
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
        }));
      };

      const handlenewVaccine = (e) => {
        const { name, value } = e.target;
        if (name === "animal" ) {
          setNewVaccine((prevVaccine) => ({
            ...prevVaccine,
            [name]: { id: value },
          }));
        } else {
            setNewVaccine((prevVaccine) => ({
            ...prevVaccine,
            [name]: value,
          }));
        }
      };

      const handleDelete = (id) => {
      
        deleteVaccine(id).then(() => {
          setReload(true);
        });
      };

      const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        if (name === "animal") {
          setUpdateVaccineData((prevUpdateVaccineData) => ({
            ...prevUpdateVaccineData,
            [name]: { id: value },
          }));
        } else {
          setUpdateVaccineData((prevUpdateVaccineData) => ({
            ...prevUpdateVaccineData,
            [name]: value,
          }));
        }
      };
      
      
    const handleUpdateBtn =(vaccine) =>{
    
        setUpdateVaccineData({
          name: vaccine.name,
          code: vaccine.code,
          protectionStartDate: vaccine.protectionStartDate,
          protectionFinishDate: vaccine.protectionFinishDate,
          animal: { id: vaccine.animal.id }
        });
    
      };
      
      const handleUpdate = () => {
        updateVaccine(updateVaccineData).then(() => {
          setReload(true);
        });
        console.log("Güncelleme bitti");
        setUpdateVaccineData({
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animal: { id: "" },
        });
      };
      
      

    return (
        <div>
          <h3>Vaccines</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newVaccine.name}
            onChange={handlenewVaccine}
          />
          <input
            type="text"
            name="code"
            placeholder="Code"
            value={newVaccine.code}
            onChange={handlenewVaccine}
          />
          <input
            type="date"
            name="protectionStartDate"
            value={newVaccine.protectionStartDate}
            onChange={handlenewVaccine}
          />
          <input
            type="date"
            name="protectionFinishDate"
            value={newVaccine.protectionFinishDate}
            onChange={handlenewVaccine}
          />
          <select
            name="animal"
            value={newVaccine?.animal?.id}
            onChange={handlenewVaccine}
          >
            <option value="" disabled>
              Select Animal
            </option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select> <br />
          <button onClick={handleCreate}>Add Vaccine</button> <br />
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={updateVaccineData.name}
            onChange={handleUpdateChange}
          />
          <input
            type="text"
            name="code"
            placeholder="Code"
            value={updateVaccineData.code}
            onChange={handleUpdateChange}
          />
          <input
            type="date"
            name="protectionStartDate"
            value={updateVaccineData.protectionStartDate}
            onChange={handleUpdateChange}
          />
          <input
            type="date"
            name="protectionFinishDate"
            value={updateVaccineData.protectionFinishDate}
            onChange={handleUpdateChange}
          />
          <select name="animal" 
            value={updateVaccineData?.animal?.id} 
            onChange={handleUpdateChange}>
            <option value="" disabled> Select Animal
            </option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select> <br />
          <button onClick={handleUpdate}>Update</button> <br />
          <h3>Aşı Listesi </h3> <br />
          {vaccines.map((vaccine) => (
            <div key={vaccine.id}>
              {vaccine.name} {vaccine.code} {vaccine.protectionStartDate} {vaccine.protectionFinishDate}{" "}
              <span id={vaccine.id} onClick={() => handleDelete(vaccine.id)}>
                <DeleteIcon/>
              </span>
              <span onClick={() => handleUpdateBtn(vaccine)}>
                <UpdateIcon/>
              </span>
            </div>
          ))}
        </div>
      );

}

export default Vaccine;

