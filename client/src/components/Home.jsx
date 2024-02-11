import { useAuth0 } from "@auth0/auth0-react";
import "bulma/css/bulma.min.css";
import { useEffect, useState } from "react";

export default function Home() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [checking, setChecking] = useState({});
    const [savings, setSavings] = useState({});
    const [credit_card, setCC] = useState({});
    const [total_spend, setSpend] = useState(0.0);

    // will show all items
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/users/${user.sub}`,
                    {
                        method: "GET",
                        redirect: "follow",
                        mode: "cors",
                    }
                );

                const body = await response.json();

                return body;
            } catch (err) {
                console.log(err);
            }
        };
        const getAccounts = async (nessie_id) => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/accounts/${nessie_id}`,
                    {
                        method: "GET",
                        redirect: "follow",
                        mode: "cors",
                    }
                );

                const body = await response.json();
                return body;
                // setItems(response.data)
            } catch (err) {
                console.log(err);
            }
        };

        const getTotalSpend = async (account_id) => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/accounts/spend/${account_id}`,
                    {
                        method: "GET",
                        redirect: "follow",
                        mode: "cors",
                    }
                );

                const body = await response.json();
                return body;
            } catch (err) {
                console.log(err);
            }
        };
        (async () => {
            if (isAuthenticated && !isLoading) {
                let dbUser = await getUser();
                let accounts = await getAccounts(dbUser.nessie_id);

                let total_value = 0.0;

                for (let account of accounts) {
                    let spend = await getTotalSpend(account["_id"]);
                    total_value += spend.total_spend;
                }
                setChecking(accounts[0]);
                setSavings(accounts[1]);
                setCC(accounts[2]);
                setSpend(total_value);
            }
        })();
    }, []);

    return (
        <div>
            <table className="table is-hoverable">
                <thead>
                    <tr>
                        <th>
                            <abbr title="Checking">Checking</abbr>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{checking.nickname}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            $
                            {checking.hasOwnProperty("balance") &&
                                checking.balance.toLocaleString()}
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>
                            <abbr title="Checking">Savings</abbr>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{savings.nickname}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            $
                            {savings.hasOwnProperty("balance") &&
                                savings.balance.toLocaleString()}
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>
                            <abbr title="Credit">Credit Cards</abbr>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{credit_card.nickname}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            $
                            {credit_card.hasOwnProperty("balance") &&
                                credit_card.balance.toLocaleString()}
                        </td>
                    </tr>
                </tbody>
                <thead>
                    <tr>
                        <th>
                            <abbr title="Credit">Spending Update</abbr>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <b>Food</b> Spending over the last
                            <i>14 days</i>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>${total_spend.toLocaleString()}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>
                            <b>Total</b> Spending over the last
                            <i>14 days</i>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            $
                            {(
                                total_spend + credit_card.balance
                            ).toLocaleString()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
