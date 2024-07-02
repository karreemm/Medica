const GetAllSurgeries = async (did: number): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/api/Doctor/AllSurgeries?did=${did}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetAllSurgeries
