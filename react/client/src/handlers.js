const BASE_URL = 'http://localhost:3000';

function sendFetch (path, method, body, user = {}){
  let req = {
    headers: {
      'user': JSON.stringify(user)
    }
  }
  if (method.toLowerCase() != 'get'){
    Object.assign(req, {
      credentials: 'include',
      method: `${method}`,
      mode: 'cors',
      body: JSON.stringify(body)
    });
    Object.assign(req.headers,{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }
  return fetch(`${BASE_URL}${path}`,req)
  .then(r=>{
    if(r.status === 400 || r.status === 401) {
      return {};
    }
    return r.json();
  })
}

class Handlers {

  updateDrillGroup (event) {
    event.preventDefault();
    const {target} = event;
    const name = target.querySelector('#drill-group-name').value;
    const description = target.querySelector('#drill-group-description').value;
    let level = ""; target.querySelectorAll('input[name="level"]')
      .forEach(radio=>{
        if (radio.checked){
          level = radio.value;
        }
      });

    sendFetch('/drill-groups/:id',
              'PUT',{
                drillGroup: {
                name: `${name}`,
                description:`${description}`,
                level: `${level}`
                }
              },
          {
            token: this.state.user.token
          })
    .then((json)=>{
      console.log("here",json)
    })
    .catch(console.error)
  }

  createNewDrillGroup (event) {
    event.preventDefault();
    const {target} = event;
    const name = target.querySelector('#drill-group-name').value;
    const description = target.querySelector('#drill-group-description').value;
    let level = ""; target.querySelectorAll('input[name="level"]')
      .forEach(radio=>{
        if (radio.checked){
          level = radio.value;
        }
      });

    sendFetch('/drill-groups','POST',{
        drillGroup: {
          name: `${name}`,
          description:`${description}`,
          level: `${level}`
        }
      },{
          token: this.state.user.token
        })
    .then((json)=>{
      console.log("here",json)
    })
    .catch(console.error)
  }

  signIn  (event) {
    event.preventDefault();
    const {target} = event;
    const email = target.querySelector('#formHorizontalEmail').value;
    const password = target.querySelector('#formHorizontalPassword').value;
    sendFetch('/sessions','POST',{username: `${email}`,password:`${password}`})
    .then((json)=>{
      this.setState({ path: json.path || '/sessions/new', user: json.user, errors: json.errors || ['Could not verify your credentials']})
    })
    .then(console.log(this.state))
    .catch(console.error)
  }

  signUp  (event) {
    event.preventDefault();
    const {target} = event;
    const firstName = target.querySelector('#formHorizontalFirstName').value;
    const lastName = target.querySelector('#formHorizontalLastName').value;
    const email = target.querySelector('#formHorizontalEmail').value;
    const password = target.querySelector('#formHorizontalPassword').value;
    const passwordConfirmation = target.querySelector('#formHorizontalPasswordConfirmation').value;
    sendFetch('/users','POST',{
      first_name: `${firstName}`,
      last_name: `${lastName}`,
      email: `${email}`,
      password:`${password}`,
      passwordConfirmation:`${passwordConfirmation}`
    })
    .then((json)=>{
      console.log(json);
      this.setState({ path: json.path, user: json.user, errors: json.errors })
    })
    .catch(console.error)
  }

  goToSignIn (event) {
    event.preventDefault();
    this.setState({ path: '/sessions/new', errors: [] });
  }

  goToSignUp (event) {
    event.preventDefault();
    this.setState({ path: '/users/new', errors: [] });
  }

  goToForgotPassword (event) {
    event.preventDefault();
    this.setState({ path: '/reset_password/new', errors: [] });
  }

}

module.exports = Handlers;
