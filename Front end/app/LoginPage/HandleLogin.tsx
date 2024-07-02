const HandleLogin = async (formData: any) => {
    const response = await fetch('http://localhost:5221/api/Profile/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return await response;
  };

 export default HandleLogin;