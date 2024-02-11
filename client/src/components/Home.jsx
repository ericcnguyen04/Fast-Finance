import { useAuth0 } from "@auth0/auth0-react";
import "bulma/css/bulma.min.css";
import { useEffect, useState } from "react";

export default function Home() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [checking, setChecking] = useState({});
    const [savings, setSavings] = useState({});
    const [credit_card, setCC] = useState({});
    const [total_spend, setSpend] = useState(0.0);
    const [usr, setUser] = useState({});

    let instruments = [
        {
            name: "360 Performance Savings",
            interest: 4.35,
            risk_score: "LOW",
            formula: (principal, monthly_contribution, time, interest) => {
                let rate = interest / 100;
                let months = time * 12;
                for (let i = 1; i <= months; i++) {
                    principal += monthly_contribution;
                    principal += principal * (rate / 12);
                }
                return principal.toFixed(2);
            },
        },
        {
            name: "360 CD Account",
            interest: 4.0,
            risk_score: "LOW",
            formula: (principal, monthly_contribution, time, interest) => {
                let rate = interest / 100;
                let months = time * 12;
                for (let i = 1; i <= months; i++) {
                    principal += monthly_contribution;
                    principal += principal * (rate / 12);
                }
                return principal.toFixed(2);
            },
        },
        {
            name: "5 Year Treasury Bond",
            interest: 4.101,
            risk_score: "LOW",
            formula: (principal, monthly_contribution, time, interest) => {
                let rate = interest / 100;
                let months = time * 12;
                for (let i = 1; i <= months; i++) {
                    principal += monthly_contribution;
                    if (months % 6 === 0) {
                        principal += principal * (rate / 12);
                    }
                }
                return principal.toFixed(2);
            },
        },
        {
            name: "5-Year HQM Corporate Bond",
            interest: 4.8,
            risk_score: "MEDIUM",
            formula: (principal, monthly_contribution, time, interest) => {
                let rate = interest / 100;
                let months = time * 12;
                for (let i = 1; i <= months; i++) {
                    principal += monthly_contribution;
                    if (months % 6 === 0) {
                        principal += principal * (rate / 12);
                    }
                }
                return principal.toFixed(2);
            },
        },
    ];

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
                setUser(dbUser);
                setChecking(accounts[0]);
                setSavings(accounts[1]);
                setCC(accounts[2]);
                setSpend(total_value);
            }
        })();
    }, []);

    return (
        <div>
            <h1 style={{ fontSize: 36, color: "black" }}>
                Your banking overview
            </h1>
            <h2 style={{ fontSize: 24, color: "black" }}>
                Good morning,{" "}
                {usr.hasOwnProperty("first_name") && usr.first_name}
            </h2>
            <table className="table is-fullwidth is-hoverable">
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

            <p style={{ color: "black" }}>
                Let's begin with $1000 and invest one half of your monthly food
                spending, ${total_spend.toFixed(2)}, every month.
            </p>
            <div class="column box is-two-third">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Financial Instrument</th>
                            <th>Interest Rate</th>
                            <th>Monthly Contribution</th>
                            <th>5 Year Total</th>
                            <th>Total Contribution</th>
                            <th>Profit</th>
                            <th>Risk Level</th>
                            {/* <th>YTD Interest</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {instruments.map((data, index) => (
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.interest}%</td>
                                <td>${total_spend.toFixed(2)}</td>
                                <td>
                                    $
                                    {data.formula(
                                        1000,
                                        total_spend,
                                        5,
                                        data.interest
                                    )}
                                </td>
                                <td>
                                    ${(1000 + 5 * 12 * total_spend).toFixed(2)}
                                </td>
                                <td>
                                    $
                                    {(
                                        data.formula(
                                            1000,
                                            total_spend,
                                            5,
                                            data.interest
                                        ) -
                                        (1000 + 5 * 12 * total_spend)
                                    ).toFixed(2)}
                                </td>
                                <td>{data.risk_score}</td>
                                {/* <td>{data.yearlyContribution}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/*<Whatif />*/}
            {/* <Graph/> */}
        </div>
    );
}
