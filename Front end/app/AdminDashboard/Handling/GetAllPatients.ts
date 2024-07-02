const GetAllPatients = async () => {
    try {
        const response = await fetch('http://localhost:5221/AllPatients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log("Failed to fetch patients");
            throw new Error(`Failed to fetch patients: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Data fetched successfully:", data);
        return data;
    } catch (error) {
        console.error("Failed to fetch patients:", error);
        throw error;
    }
};

export default GetAllPatients;
