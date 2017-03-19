const BASE_URL = 'http://localhost:3000';

function sendFetch (path, method, body){
  return fetch(`${BASE_URL}${path}`,{
    credentials: 'include',
    method: `${method}`,
    mode: 'cors',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(r=>r.json());
}

class Handlers {

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
        },
        user: {
          token: this.state.user.token
        }
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
      this.setState({ path: json.path, user: json.user})
    })
    .catch(console.error)
  }

  goToSignIn (event) {
    event.preventDefault();
    this.setState({ path: '/sessions/new', errors: {} });
  }

}

module.exports = Handlers;
