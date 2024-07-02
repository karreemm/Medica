const AddRequest = async (formData: any) => {
    const response = await fetch('http://localhost:5221/RequestAppointment', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return await response;
  };

 export default AddRequest;
//  accept
// : 
// false
// apdate
// : 
// "2024-06-21T18:57:08Z"
// apid
// : 
// 4
// did
// : 
// 6
// docAddress
// : 
// "string"
// docBdate
// : 
// "2024-06-20T14:53:42Z"
// docEmail
// : 
// "S@gmail.com"
// docFirstName
// : 
// "string"
// docGender
// : 
// "string"
// docId
// : 
// 6
// docLastName
// : 
// "string"
// docPhone
// : 
// "string"
// docProfileImage
// : 
// "string"
// docRole
// : 
// "doctor"
// notes
// : 
// null
// pid
// : 
// 4
// status
// : 
// null