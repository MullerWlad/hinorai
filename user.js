export class User {
    #login;
    #password;
    #name;
    #status;
    #key;
    #data = {};
    constructor (login, password, name, status, key, data) {
        this.#login = login
        this.#password = password
        this.#name = name
        this.#status = status
        this.#key = key
        this.#data = data
    }
    get login() { return this.#login }
    get password() { return this.#password }
    get name() { return this.#name }
    get status() { return this.#status }
    get key() { return this.#key }
    get data() { return this.#data }
}