const GetNurses = async (): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/api/Nurse/AllNurses`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetNurses