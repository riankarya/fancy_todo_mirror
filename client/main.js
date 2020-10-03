const baseUrl = "http://localhost:3000"

$(document).ready(function () {
  checkLogin()
})

function register(event) {
  // $('#submit-register').removeClass('is-loading is-disabled')
  event.preventDefault()
  let email = $('#register-email').val()
  let password = $('#register-password').val()
  console.log($('#register').serializeArray());
  $('#submit-register').addClass('is-loading is-disabled')
  $.ajax({
    url: baseUrl + '/users/register',
    method: 'post',
    data: { email, password }
  })
    .done(data => {
      setTimeout(_ => {
        checkLogin()
      }, 500)
    })
    .fail(err => {
      setTimeout(_ => {
        $('#submit-register').addClass('animate__animated animate__headShake')
      }, 500)
      console.log(err.responseJSON.errors);
    })
    .always(_ => {
      setTimeout(_ => {
        $('#submit-register').removeClass('is-loading is-disabled')
      }, 500)
      setTimeout(_ => {
        $('#submit-login').removeClass('animate__animated animate__headShake')
        $('#submit-register').removeClass('animate__animated animate__headShake')
      }, 1000)
    })
}

function login(event) {
  // $('#submit-login').removeClass('is-loading is-disabled')
  event.preventDefault()
  let email = $('#login-email').val()
  let password = $('#login-password').val()
  $('#submit-login').addClass('is-loading is-disabled')
  $.ajax({
    url: baseUrl + '/users/login',
    method: 'post',
    data: { email, password }
  })
    .done(data => {
      localStorage.setItem('token', data.token)
      setTimeout(_ => {
        checkLogin()
      }, 500)
    })
    .fail(err => {
      setTimeout(_ => {
        $('#submit-login').addClass('animate__animated animate__headShake')
      }, 500)
      console.log(err.responseJSON.errors);
    })
    .always(_ => {
      setTimeout(_ => {
        $('#submit-login').removeClass('is-loading is-disabled')
      }, 500)
      setTimeout(_ => {
        $('#submit-login').removeClass('animate__animated animate__headShake')
        $('#submit-register').removeClass('animate__animated animate__headShake')
      }, 1000)
    })
}

function checkLogin() {
  // $('#submit-login').removeClass('animate__animated animate__headShake')
  // $('#submit-register').removeClass('animate__animated animate__headShake')
  if (localStorage.token) {
    getWeather()
    $('#home-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#addtodo-page').hide()
    $('#editalltodo-page').hide()
    getToDos()
  } else {
    $('#home-page').hide()
    $('#login-page').show()
    $('#register-page').hide()
    $('#addtodo-page').hide()
    $('#editalltodo-page').hide()
  }
}

function goToRegister() {
  checkLogin()
  $('#login-page').hide()
  $('#register-page').show()
}

function logout() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  localStorage.clear()
  checkLogin()
}

function getToDos() {
  $.ajax({
    url: baseUrl + '/todos',
    method: 'get',
    headers: { token: localStorage.token }
  })
    .done(data => {
      $('.todo-container').empty()
      data.data.forEach(elem => {
        if (elem.status == "To Do") {
          $('.belum').append(`    
            <li class='list-todo'>
              <details>
                <summary>${elem.title}</summary>   
                <div class="card card-todo-list">
                  <div class="card-content">
                    <div class="content">
                      ${elem.description}
                      <br>
                      <time datetime="2016-1-1">${elem.dueDate}</time>
                      <br>
                      <b>${elem.status}</b>
                    </div>
                  </div>
                  <footer class="card-footer">
                  <button class="button is-success is-outlined is-small" onclick='showEditAllToDoForm(${elem.id})'>Edit</button>
                  <button class="button is-primary is-outlined is-small" onclick='statusToOnProgress(${elem.id})'>On Progress</button>
                  <button class="button is-danger is-outlined is-small" onclick='deleteToDo(${elem.id})'>Delete</button>
                  </footer>
                </div>
              </details>  
            </li>  
          `)
        } else if (elem.status == "On Progress") {
          $('.lagi').append(`    
            <li class='list-todo'>
              <details>
                <summary>${elem.title}</summary>   
                <div class="card card-todo-list">
                  <div class="card-content">
                    <div class="content">
                      ${elem.description}
                      <br>
                      <time datetime="2016-1-1">${elem.dueDate}</time>
                      <br>
                      <b>${elem.status}</b>
                    </div>
                  </div>
                  <footer class="card-footer">
                    <button class="button is-success is-outlined is-small" onclick='showEditAllToDoForm(${elem.id})'>Edit</button>
                    <button class="button is-info is-outlined is-small" onclick='statusToToDo(${elem.id})'>Undone</button>
                    <button class="button is-primary is-outlined is-small" onclick='statusToDone(${elem.id})'>Done</button>
                    <button class="button is-danger is-outlined is-small" onclick='deleteToDo(${elem.id})'>Delete</button>
                  </footer>
                </div>
              </details>  
            </li>  
          `)
        } else {
          $('.udah').append(`    
            <li class='list-todo'>
              <details>
                <summary>${elem.title}</summary>   
                <div class="card card-todo-list">
                  <div class="card-content">
                    <div class="content">
                      ${elem.description}
                      <br>
                      <time datetime="2016-1-1">${elem.dueDate}</time>
                      <br>
                      <b>${elem.status}</b>
                    </div>
                  </div>
                  <footer class="card-footer">
                    <button class="button is-success is-outlined is-small" onclick='showEditAllToDoForm(${elem.id})'>Edit</button>
                    <button class="button is-primary is-outlined is-small" onclick='statusToOnProgress(${elem.id})'>On Progress</button>
                    <button class="button is-danger is-outlined is-small" onclick='deleteToDo(${elem.id})'>Delete</button>
                  </footer>
                </div>
              </details>  
            </li>  
          `)
        }
      })
    })
    .fail(err => {
      console.log(err, 'errortodo');
    })
}

function addToDo(event) {
  event.preventDefault()
  let title = $('#add-title').val()
  let dueDate = $('#add-dueDate').val()
  let description = $('#add-description').val()
  let status = $('#add-status').val()
  console.log(status, 'DARI ADD TODOSSSSSSSSSSSSSSSSSSSSSSSSSS');
  $.ajax({
    url: baseUrl + '/todos',
    method: 'post',
    headers: { token: localStorage.token },
    data: {
      title,
      dueDate,
      description,
      status
    }
  })
    .done(data => {
      checkLogin()
      console.log(data, 'data dari addtodo');
    })
    .fail(err => {
      console.log(err, 'error dari addtodo');
    })
}

function showAddToDoForm() {
  checkLogin()
  $('#home-page').hide()
  $('#addtodo-page').show()
}

function showEditAllToDoForm(data) {
  $.ajax({
    url: baseUrl + `/todos/${data}`,
    method: 'get',
    headers: { token: localStorage.token }
  })
    .done(({ data }) => {
      checkLogin()
      $('#home-page').hide()
      $('#editalltodo-page').show()
      $('#edit-title').val(data.title)
      $('#edit-dueDate').val(data.dueDate)
      $('#edit-description').val(data.description)
      $('#id-editalltodo-page').val(data.id)
    })
    .fail(err => {
      checkLogin()
      console.log(err);
    })
}

function editAllToDo(event) {
  event.preventDefault()
  let title = $('#edit-title').val()
  let dueDate = $('#edit-dueDate').val()
  let description = $('#edit-description').val()
  let id = $('#id-editalltodo-page').val()
  console.log(id);
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: 'put',
    headers: { token: localStorage.token },
    data: {
      title,
      dueDate,
      description
    }
  })
    .done(data => {
      checkLogin()
      console.log(data, 'data dari edittodo');
    })
    .fail(err => {
      console.log(err, 'error dari edittodo');
    })
}

function deleteToDo(id) {
  console.log('asupdelete', id);
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: 'delete',
    headers: { token: localStorage.token }
  })
    .done(_ => {
      checkLogin()
    })
    .fail(err => {
      console.log(err);
    })
}

function statusToToDo(id) {
  console.log('asupeditstatus', id)
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: 'patch',
    headers: { token: localStorage.token },
    data: { status: 'To Do' }
  })
    .done(_ => {
      checkLogin()
    })
    .fail(err => {
      console.log(err);
    })
}
function statusToOnProgress(id) {
  console.log('asupeditstatus', id)
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: 'patch',
    headers: { token: localStorage.token },
    data: { status: 'On Progress' }
  })
    .done(_ => {
      checkLogin()
    })
    .fail(err => {
      console.log(err);
    })
}
function statusToDone(id) {
  console.log('asupeditstatus', id)
  $.ajax({
    url: baseUrl + `/todos/${id}`,
    method: 'patch',
    headers: { token: localStorage.token },
    data: { status: 'Done' }
  })
    .done(_ => {
      checkLogin()
    })
    .fail(err => {
      console.log(err);
    })
}

function onSignIn(googleUser) {
  var tokenGoogle = googleUser.getAuthResponse().id_token;
  console.log(tokenGoogle);
  $.ajax({
    url: baseUrl + '/users/googleLogin',
    method: 'post',
    data: {
      tokenGoogle
    }
  })
    .done(res => {
      localStorage.setItem('token', res.token)
      checkLogin()
      console.log(res);
    })
    .fail(err => {
      console.log(err);
    })
}

function getWeather(){

  $.ajax({
      method: 'get',
      url:  `https://api.weatherbit.io/v2.0/current?lat=-6.914864&lon=107.608238&key=b8083e7c11894146b71be354946eddd8`
  })
  .done( weather => {
      console.log(weather.data[0])
      let data = weather.data[0]
      $(`#weather`).html(`
      
      
      <img src="https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png" alt="">
      <div id=weather-content>
          <h4>${data.weather.description}</h4>
          <p>${data.city_name} ${data.country_code}<p>
          <p>${data.timezone}</p>
          <p>temperature : ${data.temp}°C</p>
      </div>
      `)
  })
  .fail( err => {
      console.log(err)
  })
}