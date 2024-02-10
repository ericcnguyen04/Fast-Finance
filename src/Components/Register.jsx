import '../CSS/Form.css'

export default function Register () {
    return (
        <div>
            <div className='login'>
            <div class="container">
                <div class="card">
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <h1 className='swag'>Register</h1>
                        <input class="input" type="name" placeholder="Name"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="email" placeholder="Email"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="password" placeholder="Password"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="address" placeholder="Address"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="city" placeholder="City"/>
                        <span class="icon is-small is-left">

                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="state" placeholder="State"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="zipcode" placeholder="Zipcode"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control">
                        <button class="button is-success">
                        Register
                        </button>
                    </p>
                    </div>
                    <a href='/login'>Already have an account?</a>
                </div>
            </div>
            </div>
        </div>
    )
}