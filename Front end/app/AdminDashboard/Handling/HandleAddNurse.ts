const HandleAddNurse = async (nurse: any) => {
    const response = await fetch('http://localhost:5221/api/Admin/AddNurse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nurse),
    });
    return response;
};
export default HandleAddNurse;