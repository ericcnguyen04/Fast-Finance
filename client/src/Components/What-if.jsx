import { useState } from "react";

export default function Whatif() {
    let [currentSavings, setCurrentSavings] = useState(null);
    let [monthlyContribution, setmonthlyContribution] = useState(null);
    let [expectedReturn, setexpectedReturn] = useState(null);
    let [duration, setduration] = useState(null);

    // let [resultData, setResultData] = useState([]);
    const [resultData, setResultData] = useState([]);



    const handleInvestment = () => {
        let yearlyContribution = monthlyContribution * 12
        let newData = [];

        for (let i = 0; i < duration; i++) {
            let yearlyInterest = currentSavings * (expectedReturn / 100);
            currentSavings += yearlyInterest + yearlyContribution;
            newData.push(({
              setyear: i + 1,
              yearlyInterest: yearlyInterest,
              savingsEndOfYear: currentSavings,
              yearlyContribution: yearlyContribution,
            }));
          }

        setResultData(newData)
    }

    return (
    <div class="columns">
        <div class="column box is-one-third">

        <div class="field">
            <label class="label is-medium">
                What if you set a budget for investments?
            </label>
            <div class="control has-icons-left has-icons-right">
            <h2>How much are you investing currently?</h2>
                <input class="input is-medium" type="initial" placeholder="Current Investment"
                    onChange={e => setCurrentSavings(e.target.value)}
                />
                <span class="icon is-small is-left">
                <i class="fas fa-envelope fa-xs"></i>
                </span>
                <span class="icon is-small is-right">
                <i class="fas fa-check fa-xs"></i>
                </span>
            </div>
            </div>

            <div class="field">
            <div class="control has-icons-left has-icons-right">
            <h2>How much will you invest monthly?</h2>
                <input class="input is-medium" type="monthly" placeholder="Monthly Investment"
					onChange={e => setmonthlyContribution(e.target.value)}
                />
                <span class="icon is-left">
                <i class="fas fa-envelope fa-sm"></i>
                </span>
                <span class="icon is-right">
                <i class="fas fa-check fa-sm"></i>
                </span>
            </div>
            </div>

            <div class="field">
            <div class="control has-icons-left has-icons-right">
            <h2>What will the annual rate be?</h2>
                <input class="input is-medium" type="email" placeholder="Annual rate"
					onChange={e => setexpectedReturn(e.target.value)}
                />
                <span class="icon is-medium is-left">
                <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-medium is-right">
                <i class="fas fa-check"></i>
                </span>
            </div>
            </div>

            <div class="field">
            <div class="control has-icons-left has-icons-right">
            <h2>How many years will the money be growing?</h2>
                <input class="input is-medium" type="email" placeholder="Years "
					onChange={e => setduration(e.target.value)}
                />
                <span class="icon is-medium is-left">
                <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-medium is-right">
                <i class="fas fa-check"></i>
                </span>
            </div>
            </div>

            <button class="button is-primary" onClick={handleInvestment}>Primary</button>

        </div>
        <div class="column box is-one-third">
        <table class="table">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Yearly Interest</th>
                    <th>Savings End of Year</th>
                    <th>Yearly Contribution</th>
                </tr>
            </thead>
            <tbody>
                {resultData.map((data, index) => (
                    <tr key={index}>
                        <td>{data.setyear}</td>
                        <td>{data.yearlyInterest}</td>
                        <td>{data.savingsEndOfYear}</td>
                        <td>{data.yearlyContribution}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    </div>
    ) 
}