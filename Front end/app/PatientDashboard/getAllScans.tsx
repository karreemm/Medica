const GetAllScans = async (pid: number): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/AllScans?p_id=${pid}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetAllScans;