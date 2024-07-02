const HandleSignup = async (formData: any) => {
    const response = await fetch('http://localhost:5221/api/Profile/CreateAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log(formData)
    return await response;
  };

 export default HandleSignup;