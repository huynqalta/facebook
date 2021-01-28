class Auth {
  token: string = "";
  userName: string = "";
  password: string = "";
  privateLogin: boolean = false;
  controlLogin: boolean = false;
  name: string = "";
  constructor(auth?) {
    // Object.keys(category).forEach(key => {
    //     if (this[ key ]) {
    //         this[ key ] = category[ key ]
    //     }
    // })
  }
}

export default Auth;
