
  export default async function deleteDoctor(doctorId: string): Promise<any> {
    try {
      const response = await fetch(`http://localhost:5221/api/Doctor/DeleteDoctor?did=${doctorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to delete doctor: ${errorData.message}`);
      }
    } catch (error: any) {
      console.error('Error deleting doctor:', error);
      return { success: false, message: error.message };
    }
  }
  