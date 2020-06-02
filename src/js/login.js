function User(username, password) {
    this.Username = username;
    this.Password = password;
}

function ValidationResult(errorMessages) {
    this.ErrorMessages = errorMessages
}

function ErrorMessage(inputFieldName, message) {
    this.InputFieldName = inputFieldName;
    this.Message = message;
}

function UserService() {
    this.currentUser = "";
    this.users = [new User("bob", "bob"), new User("sam", "sam"), new User("john", "john")];

    this.ValidateUsername = function (username) {
        var isValidUsername = this.users.find((user) => {
            return user.Username === username;
        });
        if (isValidUsername) {
            return new ValidationResult([]);
        }
        else {
            return new ValidationResult([
                new ErrorMessage("username", "The username is not recognized.")
            ]);
        }
    }

    this.ValidatePassword = function (username, password) {
        var isValidPassword = this.users.find((user) => {
            return user.Username === username && user.Password === password;
        });

        if (isValidPassword) {
            return new ValidationResult([]);
        }
        else {
            return new ValidationResult([
                new ErrorMessage("password", "The password is not recognized.")
            ]);
        }
    }

    this.ValidateUserDetails = function (
        firstname,
        lastname,
        username,
        confirmUsername,
        password,
        confirmPassword) {
        var errorMessages = [];

        if (!firstname) {
            errorMessages.push(new ErrorMessage("signupfirstname", "Please enter your firstname"));
        }
        if (!lastname) {
            errorMessages.push(new ErrorMessage("signuplastname", "Please enter your lastname"));
        }
        if (!username) {
            errorMessages.push(new ErrorMessage("signupusername", "Please enter your username"));
        }
        if (!confirmUsername) {
            errorMessages.push(new ErrorMessage("signupretypeusername", "Please re-enter your username"));
        }
        else if (username !== confirmUsername) {
            errorMessages.push(new ErrorMessage("signupretypeusername", "Please enter the same username"));
        }
        if (!password) {
            errorMessages.push(new ErrorMessage("signuppassword", "Please enter your password"));
        }
        if (!confirmPassword) {
            errorMessages.push(new ErrorMessage("signupretypepassword", "Please re-enter your password"));
        }
        else if (password !== confirmPassword) {
            errorMessages.push(new ErrorMessage("signupretypepassword", "Please enter the same password"));
        }
        return new ValidationResult(errorMessages);
    }

    this.AddUser = function (username, password) {
        this.users.push(new User(username, password))
    }
}

var userService = new UserService();

function gotoPrevScreen() {
    $('.carousel').carousel('prev');
    $('.carousel').carousel('pause');
}

function gotoNextScreen() {
    $('.carousel').carousel('next');
    $('.carousel').carousel('pause');
}

function elementById(id) {
    return document.getElementById(id);
}

function elementsByClass(classname) {
    return document.getElementsByClassName(classname);
}

function hideErrorMessage(element)
{
    element.classList.remove("is-invalid");
}

function showErrorMessage(element)
{
    element.classList.add("is-invalid");            
}


function validateUsername()
{
    var usernameElement = elementById("username");
    hideErrorMessage(usernameElement);            
    var username = usernameElement.value;

    var validationResult = userService.ValidateUsername(username);

    if(validationResult.ErrorMessages.length > 0)
    {
        var userNameErrorElement = usernameElement.nextElementSibling;
        userNameErrorElement.innerText = validationResult.ErrorMessages[0].Message;
        showErrorMessage(usernameElement);  
    }
    else
    {
        var button = elementById("nextButton");
        button.innerText = "Verifying"; 
        button.disabled = true; 
        userService.currentUser = username;
        setTimeout(() => {  
            var button = elementById("nextButton");
            button.disabled = false; 
            button.innerText = "Next"; 
            elementById("passwordpageUsername").innerText = username;
            elementById("username").value = "";
            gotoNextScreen();
        }, 2000);
    }
}

function validatePassword()
{
    var passwordElement = elementById("password");
    hideErrorMessage(passwordElement);            
    var password = passwordElement.value;

    var validationResult = userService.ValidatePassword(userService.currentUser, password);

    if(validationResult.ErrorMessages.length > 0)
    {
        var passwordErrorElement = passwordElement.nextElementSibling;
        passwordErrorElement.innerText = validationResult.ErrorMessages[0].Message;
        showErrorMessage(passwordElement);  
    }
    else
    {
        var button = elementById("signinButton");
        button.innerText = "Verifying"; 
        button.disabled = true; 
        elementById("profileUsername").innerHTML = userService.currentUser;
        setTimeout(() => {  
            var button = elementById("signinButton");
            button.disabled = false; 
            button.innerText = "Sign in"; 
            elementById("password").value = "";
            gotoNextScreen();
        }, 2000);
    }
}

function validateUserDetails()
{
    var firstnameElement = elementById("signupfirstname");
    var lastnameElement = elementById("signuplastname");
    var usernameElement = elementById("signupusername");
    var retypeusernameElement = elementById("signupretypeusername");
    var passwordElement = elementById("signuppassword");
    var retypepasswordElement = elementById("signupretypepassword");

    hideErrorMessage(firstnameElement);
    hideErrorMessage(lastnameElement);
    hideErrorMessage(usernameElement);
    hideErrorMessage(retypeusernameElement);
    hideErrorMessage(passwordElement);
    hideErrorMessage(retypepasswordElement);

    var validationResult = userService.ValidateUserDetails(
        firstnameElement.value,
        lastnameElement.value,
        usernameElement.value,
        retypeusernameElement.value,
        passwordElement.value,
        retypepasswordElement.value
    );

    if(validationResult.ErrorMessages.length > 0)
    {
        validationResult.ErrorMessages.forEach(message => {
            var element = elementById(message.InputFieldName);
            showErrorMessage(element);
            element.nextElementSibling.innerHTML = message.Message;
        });
    }
    else
    {
        userService.AddUser(usernameElement.value, passwordElement.value);

        firstnameElement.value = "";
        lastnameElement.value = "";
        usernameElement.value = "";
        retypeusernameElement.value = "";
        passwordElement.value = "";
        retypepasswordElement.value = "";

        gotoNextScreen();
        $('#toast').toast('show');
    }
}
//event binding
elementById("nextButton").addEventListener("click", validateUsername, false);
elementById("signinButton").addEventListener("click", validatePassword, false);
elementById("createaccountButton").addEventListener("click", validateUserDetails, false);