const GetSurgeryNurses = async (sid: number): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/api/Nurse/SurgeryNurses?sid=${sid}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetSurgeryNurses