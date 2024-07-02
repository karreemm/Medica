const CancelRequest = async (apid: number) => {
    const response = await fetch(`http://localhost:5221/DeleteAppointment?apid=${apid}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response;
  };

export function handelCancel(apid: number) {
    CancelRequest(apid).then((response) => {
    })
    .then(() => {
        window.location.reload();
    })
    .then(() => {
        alert("Appointment Cancelled");
    })
    .catch((error) => {
        console.error(error);
    });
}