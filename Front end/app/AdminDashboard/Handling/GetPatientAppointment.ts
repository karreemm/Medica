const GetPatientAppointment = async (pid: string): Promise<any> => {
    const did = 0; 
    const url = `http://localhost:5221/AppointmentsCount?pid=${pid}&did=${did}`;
    console.log(`Fetching appointment count from URL: ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default GetPatientAppointment;
