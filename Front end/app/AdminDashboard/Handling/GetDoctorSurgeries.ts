const GetAllDoctorsSurgeries = async (did: string) => {
    try {
        const response = await fetch(`http://localhost:5221/api/Admin/DoctorSurgeries?did=${did}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default GetAllDoctorsSurgeries;
