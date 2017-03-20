const BASE_URL = 'http://localhost:3000';

// sendFetch('/drill-groups','GET',{},{ token: this.state.user.token })
// sendFetch('/drill-groups','POST',{some: data, other: stuff},{ token: this.state.user.token })
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


  addNewDrill (event) {
    event.preventDefault();
    // console.dir(event.target);
    const {target} = event;
    const description = target.querySelector('#new-drill-description').value;
    const points = target.querySelector('#drill-points').value;
    // const solution = target.querySelector('#new-drill-solution').value;
    const drillGroupId = target.id;
    console.log(description,points,drillGroupId);


    sendFetch(
      `/drill-groups/${drillGroupId}/drills`,
      'POST',
      {
        exercise:`${description}`,
        points: `${points}`
        // solutions: [{body: `${solution}`}]
      },
      {token: this.state.user.token}
    )
    .then((json)=>{
      console.log(json)
    })
    .catch(console.error)
  }

  onDrillGroupView (event) {
    event.preventDefault();
    // console.dir(event.target);
    const {target} = event;
    const drillGroupId = target.parentNode.parentNode.parentNode.parentNode.id;

    sendFetch(
      `/drill-groups/${drillGroupId}`,
      'GET',
      {},
      {token: this.state.user.token}
    )
    .then((json)=>{
      console.log(json)
      this.setState(Object.assign({},
                  this.state,
                  {
                    path: `/admin/drill_group/${json.id}`,
                    drillGroup: json
                  }))
    })
    .catch(console.error)
  }

  handleLeaderBoard(event){
    event.preventDefault();
    sendFetch('/usersboard','GET',{},{token: this.state.user.token})
      .then(users=>{
        this.setState(Object.assign(
          {},
          this.state,
          {
            path: '/leaderboard',
            users: users
          }
        ))
      })
  }


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
          name: `${name}`,
          description:`${description}`,
          level: `${level}`
        },{
          token: this.state.user.token
        })
    .then((json)=>{
      this.setState(Object.assign({},this.state,{ path: `/admin/drill_group/${json.id}`, drillGroup: json }));
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
      this.setState({ path: json.path || '/sessions/new', user: json.user || {}, errors: json.errors || ['Could not verify your credentials']})
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

  startDrill (event){
    event.preventDefault();
    const {currentTarget, target} = event;
    const drillId = currentTarget.parentNode.id;
    sendFetch(`/drill-groups/1`, 'GET', {}, {token:this.state.user.token})
    .then((json)=>{
      // this.setState({path: json.path, })
    })
  }

  deleteDrillGroup (event) {
    event.preventDefault();
    const {target} = event;
    const drillgroupDiv = target.parentNode.parentNode.parentNode.parentNode
    const drillGroupId = drillgroupDiv.id
    sendFetch(`/drill-groups/${drillGroupId}`, 'DELETE', {}, {token:this.state.user.token})
    .then((json)=>{
      console.log(this.state.drillGroups)
      this.setState(Object.assign({}, this.state.drillGroups, this.state.errors, this.state.user))
    })
    drillgroupDiv.style.visibility='hidden';

  }

  goToAdminDrills (event) {
    event.preventDefault();
    sendFetch('/drill-groups','GET',{},{token: this.state.user.token})
    .then(json=>{
      console.log(json);
      this.setState(Object.assign({},this.state,{ path: `/admin/drill_board`, drillGroups: json }));
    })
  }

  goToSignIn (event) {
    event.preventDefault();
    this.setState(Object.assign({},{ path: '/sessions/new', user: this.state.user, errors: [] }));
  }

  goToSignUp (event) {
    event.preventDefault();
    this.setState({ path: '/users/new', user: this.state.user, errors: [] });
  }

  goToProfile (event) {
    event.preventDefault();
    this.setState(Object.assign({},{ path: `/users/${this.state.user.id}`, user: this.state.user, errors: [] }));
  }

  goToForgotPassword (event) {
    event.preventDefault();
    this.setState(Object.assign({},{ path: `/reset_password/new`, user: this.state.user, errors: [] }));
  }


  goToAdminCreateDrillGroup (event) {
    event.preventDefault();
    this.setState(Object.assign({},this.state,{ path: `/admin/drill_board/new` }));
  }

  logout (event) {
    event.preventDefault();
    this.setState(Object.assign({},{ path: '/', user: {}, errors: [] }));
  }

}

module.exports = Handlers;
