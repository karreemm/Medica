const GetAllDoctors = async (): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/api/Doctor/AllDoctors`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetAllDoctors