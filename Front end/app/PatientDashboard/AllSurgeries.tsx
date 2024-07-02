const GetAllSurgeries = async (pid: number): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/AllSurgeries?pid=${pid}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetAllSurgeries
