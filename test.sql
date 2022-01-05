
create store procedure

select CONCAT(patient.name," " ,patient.last_name) as name,
		patient.age, patient.sex, data.spo2, data.heart_rate, data.date_time
 from patient_monitoring.data, patient where data.id_patient=patient.id_patient
 and date_time between '2021-11-26 04:41:00' and '2021-11-26 07:30:00'
 
 
 select * from data
 

 
HistoryDataByPatientId DELIMITER //

CREATE PROCEDURE HistoryDataByPatientId (id_patient int, startdatetime datetime, enddatetime datetime)
 BEGIN
select CONCAT(patient.name," " ,patient.last_name) as name,
		patient.age, patient.sex, data.spo2, data.heart_rate, data.date_time
 from patient_monitoring.data, patient where data.id_patient=patient.id_patient
 and patient.id_patient=id_patient
 and date_time between startdatetime and enddatetime;
 END;
//

DELIMITER ;

CALL HistoryDataByPatientId(1,'2021-11-26 04:46:00', '2021-11-26 07:46:00');