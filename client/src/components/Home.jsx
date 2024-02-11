import { useAuth0 } from '@auth0/auth0-react';
import 'bulma/css/bulma.min.css';
import { useEffect } from 'react';}

export default function Home () {
    const { user, isAuthenticated, isLoading } = useAuth0()


    // will show all items
	useEffect(() => {
        const getUser = async() => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/api/users/${user.sub}`, {
                    method: "GET",
                    redirect: "follow",
                    mode: "cors"
                })

                const body = await response.json()

                return body
            } catch (err) {
                console.log(err)
            }
        }
		const getAccounts = async (nessie_id) => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/api/accounts/${nessie_id}`, {
                    method: "GET",
                    redirect: "follow",
                    mode: "cors"
                })

                const body = await response.json()
				console.log(response.data)
				// setItems(response.data)
			} catch (err) {
				console.log(err)
			}
		}
        (async() => {
            if (isAuthenticated && !isLoading) {
                let dbUser = await getUser()
                await getAccounts(dbUser.nessie_id)
            }
        })()
	}, [])

    return (
        <div>
            <table class="table is-hoverable">
                <thead>
                    <tr>
                    <th><abbr title="Checking">Checking</abbr></th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th>1</th>
                        <td>Dummy 1</td>
                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    <td>$69,420</td>
                </tr>
            </tbody>
            </table>

            <table class="table is-hoverable">
                <thead>
                    <tr>
                    <th><abbr title="Checking">Savings</abbr></th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th>1</th>
                        <td>Dummy 1</td>
                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    <td>$69,420</td>
                </tr>
            </tbody>
            </table>
            
            <table class="table is-hoverable">
                <thead>
                    <tr>
                    <th><abbr title="Credit">Credit </abbr></th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th>1</th>
                        <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">
                            dummy 1
                        </a>
                        </td>
                        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    <td>$69,420</td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}