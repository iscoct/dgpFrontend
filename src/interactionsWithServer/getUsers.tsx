/* useEffect(() => {
		fetch(`${url}api/usuarios`, {
			method: 'GET',
			credentials: 'include'
		}).then((response) => response.json()).then(({ usuarios }) => {
			if (JSON.stringify(usuarios) !== JSON.stringify(users)) {
				setUsers(usuarios);
			}
		});
    }, [users]);
    Was in userManagement */

export default function GetUsers({ user }: any): Promise<void> {
    return new Promise((resolver) => {
        resolver();
    });
}