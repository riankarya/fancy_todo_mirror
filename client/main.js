const baseUrl = "http://localhost:3000"

$(document).ready(function() {
    checkLogin()
})

function register(event) {
    event.preventDefault()
    let email = $('#register-email').val()
    let password = $('#register-password').val()
    console.log($('#register').serializeArray());
    $.ajax({
        url: baseUrl + '/users/register',
        method: 'post',
        data: { email, password }
    })
    .done(data => {
        console.log(data);
        checkLogin()
    })
    .fail(err => {
        console.log(err.responseJSON.errors);
    })
}

function login(event) {
    $('#submit-login').removeClass('animate__animated animate__headShake')
    event.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-password').val()
    $.ajax({
        url: baseUrl + '/users/login',
        method: 'post',
        data: { email, password }
    })
    .done(data => {
        console.log(data);
        localStorage.setItem('token', data.token)
        checkLogin()
    })
    .fail(err => {
        $('#submit-login').addClass('animate__animated animate__headShake')
        console.log(err.responseJSON.errors);
    })
}

function checkLogin() {
    if(localStorage.token) {
        $('#home-page').show()
        $('#login-page').hide()
        $('#register-page').hide()
        $('#addtodo-page').hide()
        getToDos()
    } else {
        $('#home-page').hide()
        $('#login-page').show()
        $('#register-page').hide()
        $('#addtodo-page').hide()
    }
}

function goToRegister() {
    checkLogin()
    $('#login-page').hide()
    $('#register-page').show()
}

function logout() {
    localStorage.clear()
    checkLogin()
}

function getToDos() {
    $.ajax({
        url: baseUrl + '/todos',
        method: 'get',
        headers: {token: localStorage.token}
    })
    .done(data => {
        $('#todo-container').empty()
        data.data.forEach(elem => {
            $('#todo-container').append(`
                <li>
                <h2>${elem.title}</h2><h2>${elem.status}</h2>
                </li>
            `)
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
    $.ajax({
        url: baseUrl + '/todos',
        method: 'post',
        headers: {token: localStorage.token},
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