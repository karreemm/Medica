const HandleAddDoctor = async (formData: any) => {
    const response = await fetch('http://localhost:5221/api/Admin/AddDoctor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(formData)
    return  response;
  };
  
export default HandleAddDoctor;