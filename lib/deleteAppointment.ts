export default async function deleteAppointment(id: string){
    return fetch(`/api/appointments?id=${id}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to delete appointment');
            }
            return res.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error)
            }
            return data;
        })
        .catch(err => console.error(err))
}