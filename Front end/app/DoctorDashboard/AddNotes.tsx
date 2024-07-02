const AddNotes = async (apid: number, Notes: string): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/api/Doctor/AddNotes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "apid": apid, "note": Notes })
        });
        
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export function handelNotes(Note: string, apid: number) {
    AddNotes(apid, Note)
        .then((res) => {
            if (res.status === 200) {
                console.log("Notes Updated");
            }
            else {
                console.log("here");
            }
        })
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            console.error(error);
        });
}
