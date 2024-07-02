const GetAllDoctors = async () => {
    try {
        const response = await fetch('http://localhost:5221/api/Doctor/AllDoctors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log("Failed to fetch doctors");
            throw new Error(`Failed to fetch doctors: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Data fetched successfully:", data);
        return data;
    } catch (error) {
        console.error("Failed to fetch doctors:", error);
        throw error;
    }
};

export default GetAllDoctors;
