const { default: axios } = require("axios");

const ResponseType = {
    SUCCESS: 0,
    EXCEPTION: 1,
    SERVER_FAILURE: 2,
};

class AlphaVantage {
    constructor(api_key) {
        this.API_KEY = api_key;
        this.BASE_URL = "http://alphavantage.co";
        this.APPEND_API = `&apikey=${this.API_KEY}`;
        this.session = axios.create({
            headers: {
                Accept: "application/json",
                "Accept-Language": "en-US,en;q=0.9",
                "Content-Type": "application/json",
            },
            validateStatus: (status) => true,
        });
    }

    /*
     * Method to send GET request to the API
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
            }

            return response;
        } catch (e) {
            console.log(e);
            return ResponseType.EXCEPTION;
        }
    }

    /*
     * Method to get the current price and 24hr change of a given stock.
     * symbol - string
     * Return {} || ResponseType
     */
    async quote(symbol) {
        let response = await this.GET(
            `/quote?function=GLOBAL_QUOTE&symbol=${symbol}`
        );

        if (response == ResponseType.EXCEPTION) {
            return ResponseType.EXCEPTION;
        }

        if (response.status != 200) {
            return ResponseType.SERVER_FAILURE;
        }

        return {
            price: response.data["05. price"],
            change: response.data["09. change"],
            percent_change: response.data["10. change percent"],
        };
    }
}
