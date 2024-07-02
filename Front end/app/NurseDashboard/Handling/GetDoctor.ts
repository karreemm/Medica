const GetDoctor = async (did: string) => {
    try {
        const response = await fetch(`http://localhost:5221/api/Doctor/Doctor?did=${did}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default GetDoctor;
