const GetAllAppointments = async (did: number): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/api/Doctor/AllAppointments?did=${did}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetAllAppointments