import axios from "axios";

// Tüm raporları al
export const getAllReports = async () => {
  const { data } = await axios.get("http://localhost:8080/api/v1/reports");
  return data;
};

// Yeni bir rapor oluştur
export const createReport = async (report) => {
  const { data } = await axios.post("http://localhost:8080/api/v1/reports", report);
  return data;
};

// Var olan bir raporu güncelle
export const updateReport = async (report) => {
  const { data } = await axios.put(`http://localhost:8080/api/v1/reports/${report.id}`, report);
  return data;
};

// Bir raporu ID'ye göre sil
export const deleteReport = async (id) => {
  const { data } = await axios.delete(`http://localhost:8080/api/v1/reports/${id}`);
  return data;
};
// Tüm randevuları al
export const getAllAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/appointments");
      console.log("Appointments:", response.data); // Verileri konsola yazdır
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  };
  
  