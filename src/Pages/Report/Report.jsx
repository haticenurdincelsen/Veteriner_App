import React, { useState, useEffect } from "react";
import {
  getAllReports,
  createReport,
  updateReport,
  deleteReport,
  getAllAppointments
} from "../../API/Report";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";

function Report() {
  const [reports, setReports] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(true);
  const [newReport, setNewReport] = useState({
    diagnosis: "",
    price: "",
    appointment: { id: "" }
  });
  const [updateReportData, setUpdateReportData] = useState({
    id: "",
    diagnosis: "",
    price: "",
    appointment: { id: "" }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportData = await getAllReports();
        const appointmentData = await getAllAppointments();
        setReports(reportData);
        setAppointments(appointmentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setReload(false);
  }, [reload]);

  const handleCreate = () => {
    createReport(newReport).then(() => {
      setReload(true);
    });
    setNewReport({
      diagnosis: "",
      price: "",
      appointment: { id: "" }
    });
  };

  const handlenewReport = (e) => {
    const { name, value } = e.target;
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value
    }));
  };

  const handleDelete = (id) => {
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateReportData((prevUpdateReportData) => ({
      ...prevUpdateReportData,
      [name]: value
    }));
  };

  const handleUpdateBtn = (report) => {
    setUpdateReportData({
      id: report.id,
      diagnosis: report.diagnosis,
      price: report.price,
      appointment: { id: report.appointment.id }
    });
  };

  const handleUpdate = () => {
    updateReport(updateReportData).then(() => {
      setReload(true);
    });
    console.log("Güncelleme bitti");
    setUpdateReportData({
      id: "",
      diagnosis: "",
      price: "",
      appointment: { id: "" }
    });
  };

  return (
    <div>
      <h3>Reports</h3>
      <input
        type="text"
        name="diagnosis"
        placeholder="Diagnosis"
        value={newReport.diagnosis}
        onChange={handlenewReport}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newReport.price}
        onChange={handlenewReport}
      />
      <select
        name="appointment"
        value={newReport.appointment.id}
        onChange={handlenewReport}
      >
        <option value="" disabled>
          Select Appointment
        </option>
        {appointments.map((appointment) => (
          <option key={appointment.id} value={appointment.id}>
            {appointment.appointmentDate}
          </option>
        ))}
      </select>  <br />
      <button onClick={handleCreate}>Add Report</button> <br />
      <input
        type="text"
        name="diagnosis"
        placeholder="Diagnosis"
        value={updateReportData.diagnosis}
        onChange={handleUpdateChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={updateReportData.price}
        onChange={handleUpdateChange}
      />
      <select
        name="appointment"
        value={updateReportData.appointment.id}
        onChange={handleUpdateChange}
      >
        <option value="" disabled>
          Select Appointment
        </option>
        {appointments.map((appointment) => (
          <option key={appointment.id} value={appointment.id}>
            {appointment.appointmentDate}
          </option>
        ))}
      </select>{" "}
      <br />
      <button onClick={handleUpdate}>Update</button> <br />

      {reports.map((report) => (
        <div key={report.id}>
          {report.diagnosis} {report.price}{" "}
          <span id={report.id} onClick={() => handleDelete(report.id)}>
            <DeleteIcon />
          </span>
          <span onClick={() => handleUpdateBtn(report)}>
            <UpdateIcon />
          </span>
        </div>
      ))}
    </div>
  );
}

export default Report;
