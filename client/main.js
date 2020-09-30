$(document).ready(function() {
    console.log('mulai');
    $("#register-container").hide()
    $("#todo-container").hide()
    $("#go-to-register").click(function() {
        $("#register-container").show()
        $("#login-container").hide()
    })
    $("#go-to-login").click(function() {
        $("#register-container").hide()
        $("#login-container").show()
    })
    $("#submit-register").click(function(event) {
        event.preventDefault()
        $.ajax({
            method: 'post',
            url: 'http://localhost:3000/users/register',
            data: {
                email: $("#register-email").val(),
                password: $("#register-password").val()
            }
        })
        .done(data => {
            console.log('done', data);
        })
        .fail(err => {
            console.log('fail', err);
        })
    })
    $("#submit-login").click(function(event) {
        event.preventDefault()
        $.ajax({
            method: 'post',
            url: 'http://localhost:3000/users/login',
            data: {
                email: $("#login-email").val(),
                password: $("#login-password").val()
            }
        })
        .done(data => {
            localStorage.setItem('token', data.token)
            $('#login-container').hide()
            $('#todo-container').show()
            getToDos()
            console.log('done', data);
        })
        .fail(err => {
            console.log('fail', err);
        })
    })

})

function getToDos() {
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/todos',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(data => {
        console.log(data);
        data.data.forEach(elem => {
            $('#todo-container').append(`<li>${elem.title}</li>`)
        })
    })
    .fail(err => {
        console.log(err);
    })
}