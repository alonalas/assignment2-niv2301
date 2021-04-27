var currentUser;
var userArray = [{userName: "k",
fullName: "Admin",
email: "k@p.k",
password: "k",
datepicker:01/01/1990}];
localStorage.setItem("k",JSON.stringify(userArray));

function register() {
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("log_btn").style.display = "none";
    document.getElementById("reg_btn").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("settings").style.display = "none";//chnge to none

}

function login() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("log_btn").style.display = "none";
    document.getElementById("reg_btn").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("settings").style.display = "none";//chnge to none
}
function logout() {
    currentUser="";
    $("#footer").css("position", "absolute");
    document.getElementById("current_user").innerHTML = "Hello";
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("log_btn").style.display = "block";
    document.getElementById("reg_btn").style.display = "block";
    document.getElementById("reg_tab").style.display = "block";
    document.getElementById("log_tab").style.display = "block";
    document.getElementById("logout").style.display = "none";
    document.getElementById("settings").style.display = "none";//chnge to none

}

function settingsWindow() {

    $("#footer").css("position", "relative");
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("log_btn").style.display = "none";
    document.getElementById("reg_btn").style.display = "none";
    document.getElementById("reg_tab").style.display = "none";
    document.getElementById("log_tab").style.display = "none";
    document.getElementById("logout").style.display = "block";
    document.getElementById("settings").style.display = "block";


}


function create_user() {
    let userNamee = document.getElementById("userName").value;
    let fullNamee = document.getElementById("fullName").value;
    let emaill = document.getElementById("email").value;
    let passwordd = document.getElementById("password").value;
    let date_pickerr = document.getElementById("datepicker").value;


    //check if username exists
    let check_user=localStorage.getItem(userNamee)
    if(check_user!=null){
        let user_string=JSON.parse(check_user)
        let name_user=user_string[0]["userName"]
        alert("Username: "+ name_user + " exists! try another one ")
        return;
    }
    if(date_picker==''){
        alert("PLease choose your birth date")
        return;
    }


    // var userInsert = [{userName: userName,
    // fullName: "Admin",
    // email: "k@p.k",
    // password: "k",
    // datepicker:01/01/1990}];
    // let user_detail = [{"userNmae: " + userName.value,"fullNmae: " + fullName,"email: " + email,"password: " + password,"datepicker: " + date_picker}]
    // localStorage.setItem(userName,user_detail);
    alert("Account was created!")
    //document.getElementById("current_user").innerHTML = "Hello, " + userName;
    login();
    
}

function authenticate() {
    let userName = document.getElementById("logUsername").value;
    let password = document.getElementById("logPassword").value;

    let check_user=localStorage.getItem(userName)
    if(check_user!=null){
        //let tt=check_user[3];
        let user_string=JSON.parse(check_user)
        let real_pass=user_string[0]["password"]
        if(password == real_pass){
            alert("You have been successfully logged in!")
            document.getElementById("current_user").innerHTML = "Hello " + userName;
            settingsWindow();
            return;
        }
        alert("Password incorrect. Please try again!")
        return;
    }
    alert("Username or password incorrect. Please try again!")
    return;

}

$(document).ready(function() {
    $("#signup").validate({
      errorClass: "error fail-alert",
      validClass: "valid success-alert",
      rules: {
        userName : {
          required: true,
          minlength: 3
        },
        fullName: {
          required: true,
          pattern:  /^[a-zA-Z]+( [a-zA-Z]+)+$/,
          minlength: 5
        },
        email: {
          required: true,
          pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        },
        password: {
          required: true,
          minlength: 6,
          pattern: /[A-Za-z0-9]*([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)/
        },
        birth: {
            required: true,
            //minlength: 4
        }
      },
      messages : {
        userName: {
            required: "Please enter an username",
          minlength: "Name should be at least 3 characters"
        },
        fullName: {
          required: "Please enter your first and last name",
          minlength: "Full name must be at least 4 letters"
        },
        email: {
          required: "Please enter your email",
          email: "The email should be in the format: abc@domain.x",
        },
        password: {
          required: "Please enter a password",
          minlength: "Password must be at least 6 letters"
        },
        birth: {
            required:"Please choose your birth date",
            //minlength:"Please choose your birth date"
        }
      },
      ///create a new user if all fields are correct
      submitHandler: function(form){
        create_user();
      }
    });
    $("#datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "-20:+0"
        });
});



function empty(){
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "none";
}
function about(){
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("about");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        if (modal.style.display = "none"){
            modal.style.display = "block";
    }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

    var modal = document.querySelector('.modal')

    window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        modal.style.display = 'none'
    }
    })
}