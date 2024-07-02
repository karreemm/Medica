export const GetActivity = async (pid: number): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5221/api/Doctor/AllActivities?did=${pid}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export function AllActivities(uid :number){
    return GetActivity(uid)
    .then(res => {
        if(res.status === 200){
            return res.json();
        }
    })
    .catch(err => {
        console.error(err);
    })
}