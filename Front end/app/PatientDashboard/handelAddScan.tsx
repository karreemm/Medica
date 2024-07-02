const handelAddScan = async (formData: any) => {
    const response = await fetch('http://localhost:5221/AddScan', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return await response;
  };

 export default handelAddScan;