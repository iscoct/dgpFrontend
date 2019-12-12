/* const url = 'http://localhost:8000/';

	function onRemoveUser(user: any) {
		fetch(`${url}api/usuario/${user.id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => res.json()).then((jsonResponse) => {
			console.log(`Response: ${JSON.stringify(jsonResponse)}`);
		});
    } */
export default function RemoveUser({ user }: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}