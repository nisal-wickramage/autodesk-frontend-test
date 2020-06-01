function UserService()
{
    this.users = [new User("bob", "bob"), new User("sam", "sam"), new User("john", "john")];

    this.ValidateUsername = function(username)
    {
        var isValidUsername = this.users.find((user)=> 
        { 
            return user.Username === username;
        });
        if(isValidUsername)
        {
            return new ValidationResult([]);
        }
        else
        {
            return new ValidationResult([
                new ErrorMessage("username", "The username is not recognized.")
            ]);
        }
    }
    
    this.ValidatePassword = function(username, password)
    {
        var isValidPassword = this.users.find((user)=> 
        { 
            return user.Username === username && user.Password === password;
        });

        if(isValidUsername)
        {
            return new ValidationResult([]);
        }
        else
        {
            return new ValidationResult([
                new ErrorMessage("password", "The password is not recognized.")
            ]);
        }
    }

    this.ValidateUserDetails = function(
        firstname, 
        lastname, 
        username, 
        confirmUsername, 
        password, 
        confirmPassword)
    {
        errorMessages = [];

        if(firstname)
        {
            errorMessages.push(new ErrorMessage("firstname", "Please enter your firstname"));
        }
        if(lastname)
        {
            errorMessages.push(new ErrorMessage("lastname", "Please enter your lastname"));
        }
        if(username)
        {
            errorMessages.push(new ErrorMessage("username", "Please enter your username"));
        }
        if(confirmUsername)
        {
            errorMessages.push(new ErrorMessage("confirmUsername", "Please re-enter your username"));
        }
        else if(username === confirmUsername)
        {
            errorMessages.push(new ErrorMessage("confirmUsername", "Please enter the same username"));
        }
        if(password)
        {
            errorMessages.push(new ErrorMessage("password", "Please enter your password"));
        }
        if(confirmPassword)
        {
            errorMessages.push(new ErrorMessage("confirmPassword", "Please re-enter your password"));
        }
        else if(password === confirmPassword)
        {
            errorMessages.push(new ErrorMessage("confirmPassword", "Please enter the same password"));
        }
    }

    this.AddUser = function(username, password)
    {
        this.users.push(new User(username, password))
    }


}

function User(username, password)
{
    this.Username = username;
    this.Password = password;
}

function ValidationResult(errorMessages)
{
    this.ErrorMessages = errorMessages
}

function ErrorMessage(inputFieldName, message)
{
    this.InputFieldName = inputFieldName;
    this.Message = message;
}