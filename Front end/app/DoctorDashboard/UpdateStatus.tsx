const updateStatus = async (apid: number, status: string): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/api/Admin/updateStatus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "apid": apid, "status": status })
        });
        
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export function handelStatus(status: string, apid: number) {
    updateStatus(apid, status)
        .then((res) => {
            if (res.status === 200) {
                console.log("Status Updated");
            }
            else {
                console.log("here");
            }
        })
        .catch(error => {
            console.error(error);
        });
}
