const axios = require("axios");

const ResponseType = {
    SUCCESS: 0,
    EXCEPTION: 1,
    SERVER_FAILURE: 2,
};

/*
 * Class for a Customer Object
 * first_name -        string
 * last_name -         string
 * street_number -     number
 * street_name -       string
 * city -              string
 * state -             string
 * zip -               string
 */
class Customer {
    constructor(
        first_name,
        last_name,
        street_number,
        street_name,
        city,
        state,
        zip
    ) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.street_number = street_number;
        this.street_name = street_name;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    toJSON() {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            address: {
                street_number: this.street_number,
                street_name: this.street_name,
                city: this.city,
                state: this.state,
                zip: this.zip,
            },
        };
    }
}

/*
 * Class for an Account Object
 * type -            string
 * nickname -        string
 * rewards -         number
 * balance -         number
 * account_number -  string [INVALID ARGUMENT!] [REPORT TO CAPITAL ONE]
 */
class Account {
    constructor(type, nickname, rewards, balance) {
        this.type = type;
        this.nickname = nickname;
        this.rewards = rewards;
        this.balance = balance;
    }
}

/*
 * Class for a purchase Object
 * merchant_id -     string
 * medium -          string
 * purchase_date -   string
 * amount -          number
 * status -          string
 * description -     string
 */
class Purchase {
    constructor(
        merchant_id,
        medium,
        purchase_date,
        amount,
        status,
        description
    ) {
        this.merchant_id = merchant_id;
        this.medium = medium;
        this.purchase_date = purchase_date;
        this.amount = amount;
        this.status = status;
        this.description = description;
    }
}

/*
 * API Wrapper for Nessie by Capital One
 * Created by Stephen D. Sulimani, 2024
 */
class Nessie {
    constructor(api_key) {
        this.API_KEY = api_key;
        this.BASE_URL = "http://api.nessieisreal.com";
        this.APPEND_API = `?key=${this.API_KEY}`;
        this.session = axios.create({
            headers: {
                Accept: "application/json",
                "Accept-Language": "en-US,en;q=0.9",
                "Content-Type": "application/json",
            },
            validateStatus: (status) => true,
        });
    }

    // BEGIN HELPER METHODS

    /*
     * Method to send a POST/PUT request to the API
     * endpoint - string
     * data - JSON string
     * Return AxiosResponse || ResponseType.EXCEPTION
     */
    async POST(endpoint, data, method = "POST") {
        try {
            let response;
            if (method == "POST") {
                response = await this.session.post(
                    `${this.BASE_URL}${endpoint}${this.APPEND_API}`,
                    data
                );
            } else if (method == "PUT") {
                response = await this.session.put(
                    `${this.BASE_URL}${endpoint}${this.APPEND_API}`,
                    data
                );
            }

            return response;
        } catch (e) {
            console.log(e);
            return ResponseType.EXCEPTION;
        }
    }

    /*
     * Method to send GET/DELETE request to the API
     * endpoint - string
     * Return AxiosResponse || ResponseType.EXCEPTION
     */
    async GET(endpoint, method = "GET") {
        try {
            let response;
            if (method == "GET") {
                response = await this.session.get(
                    `${this.BASE_URL}${endpoint}${this.APPEND_API}`
                );
            } else if (method == "DELETE") {
                response = await this.session.delete(
                    `${this.BASE_URL}${endpoint}${this.APPEND_API}`
                );
            }

            return response;
        } catch (e) {
            console.log(e);
            return ResponseType.EXCEPTION;
        }
    }

    // END HELPER METHODS

    // BEGIN CUSTOMERS

    /*
     * Fetch all customers.
     * Returns [] || ResponseType
     */
    async get_customers() {
        let response = await this.GET("/customers");

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status != 200) {
            return ResponseType.SERVER_FAILURE;
        }

        return response.data;
    }

    /*
     * Fetch customer by id.
     * id - number
     * Return {} || null
     */
    async get_customer(id) {
        let response = await this.GET(`/customers/${id}`);

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 404) {
            return null;
        }

        if (response.status != 200) {
            return ResponseType.SERVER_FAILURE;
        }

        return response.data;
    }

    /*
     * Create customer in Nessie API
     * customer - Valid customer object
     * Return {} | ResponseType
     */
    async create_customer(customer) {
        let response = await this.POST("/customers", JSON.stringify(customer));

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 201) {
            console.log(response);
            return response.data;
        }

        return ResponseType.SERVER_FAILURE;
    }

    // END CUSTOMERS

    // BEGIN ACCOUNTS

    /*
     * Fetch all accounts.
     * Return [] || ResponseType
     */
    async get_accounts() {
        let response = await this.GET("/accounts");

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status != 200) {
            return ResponseType.SERVER_FAILURE;
        }

        return response.data;
    }

    /*
     * Fetch account by id.
     * account_id - number
     * Return {} || null
     */
    async get_account(account_id) {
        let response = await this.GET(`/accounts/${account_id}`);

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 404) {
            return null;
        }

        if (response.status != 200) {
            return ResponseType.SERVER_FAILURE;
        }

        return response.data;
    }

    /*
     * Fetch all accounts belonging to given customer.
     * customer_id - number
     * Return [] || ResponseType | null
     */
    async get_customer_accounts(customer_id) {
        let response = await this.GET(`/customers/${customer_id}/accounts`);

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 404) {
            return null;
        }

        if (response.status != 200) {
            return ResponseType.SERVER_FAILURE;
        }

        return response.data;
    }

    /*
     * Create account for given customer.
     * customer_id - number
     * account - Account object
     * Return ResponseType
     */
    async create_account(customer_id, account) {
        console.log(JSON.stringify(account, null, 4));
        let response = await this.POST(
            `/customers/${customer_id}/accounts`,
            JSON.stringify(account)
        );

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 201) {
            return ResponseType.SUCCESS;
        }

        console.log(response.data);

        return ResponseType.SERVER_FAILURE;
    }

    /*
     * Update account by id.
     * account_id - number
     * account - Account object
     * Return ResponseType
     */
    async update_account(account_id, account) {
        let response = await this.POST(
            `/accounts/${account_id}`,
            JSON.stringify(account),
            "PUT"
        );

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 202) {
            return ResponseType.SUCCESS;
        }

        return ResponseType.SERVER_FAILURE;
    }

    /*
     * Delete account for a given id.
     * account_id - number
     * Return ResponseType || null
     */
    async delete_account(account_id) {
        let response = await this.GET(`/accounts/${account_id}`, "DELETE");

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 204) {
            return ResponseType.SUCCESS;
        }

        return ResponseType.SERVER_FAILURE;
    }

    // END ACCOUNTS

    // BEGIN PURCHASES

    /*
     * Fetch all purchases from a given account.
     * account_id - number
     * Return [] || ResponseType || null
     */
    async get_purchases(account_id) {
        let response = await this.GET(`/accounts/${account_id}/purchases`);

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 404) {
            return null;
        }

        if (response.status != 200) {
            return ResponseType.SERVER_FAILURE;
        }

        return response.data;
    }

    /*
     * Fetch purchase by id.
     * purchase_id - number
     * Return {} || ResponseType || null
     */
    async get_purchase(purchase_id) {
        let response = await this.GET(`/purchases/${purchase_id}`);

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 404) {
            return null;
        }

        if (response.status != 200) {
            return ResponseType.SERVER_FAILURE;
        }

        return response.data;
    }

    /*
     * Create purchase for a given account.
     * account_id - number
     * purchase - Purchase object
     * Return ResponseType
     */
    async create_purchase(account_id, purchase) {
        let response = await this.POST(
            `/accounts/${account_id}/purchases`,
            JSON.stringify(purchase)
        );

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 201) {
            return ResponseType.SUCCESS;
        }

        return ResponseType.SERVER_FAILURE;
    }

    /*
     * Update purchase for a given id.
     * purchase_id - number
     * purchase - Purchase object
     * Return ResponseType || null
     */
    async update_purchase(purchase_id, purchase) {
        let response = await this.POST(
            `/purchases/${purchase_id}`,
            JSON.stringify(purchase),
            "PUT"
        );

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 404) {
            return null;
        }

        if (response.status == 202) {
            return ResponseType.SUCCESS;
        }

        return ResponseType.SERVER_FAILURE;
    }

    /*
     * Delete purchase for a given id.
     * purchase_id - number
     * Return ResponseType || null
     */
    async delete_purchase(purchase_id) {
        let response = await this.GET(`/purchases/${purchase_id}`);

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status == 404) {
            return null;
        }

        if (response.status == 204) {
            return ResponseType.SUCCESS;
        }

        return ResponseType.SERVER_FAILURE;
    }

    // END PURCHASES

    // START MERCHANTS

    /*
     * Fetch all merchants
     * category? - string
     * return [] | ResponseType
     */
    async get_merchants(category = "") {
        let response = await this.GET("/merchants");

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status != 200) {
            return ResponseType.SERVER_FAILURE;
        }

        let requested_merchants = [];

        for (let merchant of response.data) {
            if (!merchant || !merchant.category) {
                continue;
            }
            if (merchant.category.includes(category)) {
                requested_merchants.push(merchant);
            }
        }

        console.log(`Found: ${requested_merchants.length} merchants!`);

        return requested_merchants;
    }

    // END MERCHANTS

    // START DUMMY

    /*
     * Generate dummy checking, savings, and credit card accounts.
     * customer_id - string
     * Return [] | ResponseType
     */
    async dummy_accounts(customer_id) {
        try {
            const randomBalance = (min, max) => {
                let float = Math.random() * (max - min + 1) + min;
                return Math.round(float * Math.pow(10, 2)) / Math.pow(10, 2);
            };

            let checking = new Account(
                "Checking",
                "360 Checking",
                0.0,
                randomBalance(4500, 10000)
            );
            checking = await this.create_account(customer_id, checking);

            console.log(checking);

            let savings = new Account(
                "Savings",
                "360 Performance Savings",
                0.0,
                randomBalance(8500, 15000)
            );
            savings = await this.create_account(customer_id, savings);

            let credit_card = new Account(
                "Credit Card",
                "Savor One Rewards",
                randomBalance(25, 150),
                randomBalance(400, 780)
            );
            credit_card = await this.create_account(customer_id, credit_card);

            const randomDate = (start, days_prior) => {
                let end = new Date();
                end.setDate(end.getDate() - days_prior);
                var date = new Date(+start + Math.random() * (end - start));
                return date.toISOString().split("T")[0];
            };

            let food_merchants = await this.get_merchants("food");

            const random_merchant = () => {
                var index = Math.floor(Math.random() * food_merchants.length);
                return food_merchants[index];
            };

            const generatePurchases = async (account_id, n) => {
                for (let i = 0; i < n; i++) {
                    let date = randomDate(Date.now(), 14);
                    let cost = randomBalance(8, 35);
                    let merchant = random_merchant();
                    let p = new Purchase(
                        merchant["_id"],
                        "balance",
                        date,
                        cost,
                        "posted",
                        `$${cost} @ ${merchant}`
                    );
                    await this.create_purchase(account_id, p);
                }
            };

            await generatePurchases(checking["_id"], 50);
            await generatePurchases(credit_card["_id"], 50);
        } catch (e) {
            console.log(e);
        }
    }

    // END DUMMY
}

module.exports = { Nessie, Customer, Account, Purchase };
