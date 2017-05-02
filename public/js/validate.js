//class declaration in JS
class Validation
{
	constructor(id, re, errorMsg)
	{
		this.id = id;
		this.re = re;
		this.errorMsg = errorMsg; //String to show the Error Message
		this.nodeMsg = null; //An HTML element to hold the node containing the error message
	}
	//in a class, functions don't need the keyword 'function' before the function name
	validate()
	{
		let input = this.id.value;
		let validResults = this.re.test(input);
		if(!validResults)
		{
			if(this.nodeMsg === null) //Add the error message on screen
			{
				this.id.style.backgroundColor = "red";
				//Use DOM to add a node to the HTML. This node is a 'p' element containing the error message
				this.nodeMsg = document.createElement("p"); 
				//p is HTML tag
				this.nodeMsg.textContent = this.errorMsg;
				let parent = document.getElementById("signup");
				parent.insertBefore(this.nodeMsg, this.id);
			}
		}
		else//Validation Passed
		{
			if(this.nodeMsg !== null) //We have some error message on the screen, we wipe it
			{
				let parent = document.getElementById("signup");
				parent.removeChild(this.nodeMsg);
				this.id.style.backgroundColor = "white";
			}
		}
		return validResults;
	}
}

function validateEmail()
{
	let id = document.getElementById("email");
	//below, \S means anthing that is not whitespace
	//+ means the letter must appear at least once
	let re = /\S+@\S+.\S/;
	let v = new Validation(id, re, "Invalid Email");
	//blur: when the element loses focus
	id.addEventListener("blur", function(){
		return v.validate();
		//closure: the inside function can use any variables defined in its parent function (v for example)
	});
}

function validatePwd()
{
	let id = document.getElementById("pwd");
	let re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z].{8,})/; //At least one upper, one lower, one digit, and at least 8 characters long
	let v = new Validation(id, re, "Invalid Password");
	
	id.addEventListener("blur", function(){
		return v.validate();
	});
}

function submitUser() {
	username = document.getElementById("email").value;
	pwd = document.getElementById("pwd").value;
	var user = {"username":username, "password":pwd};
	$.ajax({
		method:"post",
		url:"signupServer",
		data: user
	})
	.done(function(result){
		if (result)
			$("#result").html("User Submitted");
		else
			$("#result").html("Your email has already been taken.");
	})
}

/*
function getuserInfo() {
	var jqxhr = $.ajax("/getUsers")
	.done(function(docs) {
		var numUsers = 0;
		var str = "";
		for(doc of docs) {
			numUsers += doc.items.length;
		}
		document.getElementById("numUsers").innerHTML = "There are a total of " + numUsers + " signed up for our news letter.";
		document.getElementById("Users").innerHTML = str;
	})
	.fail(function() {
		alert("Try Again!");
	})
} 
*/

let arr = [];
function createUsers()
{
	//Error
	var jqxhr = $.ajax("/getUsers")
	.done(function(docs)
	{
		for(doc of docs)
			arr.push(doc);
		showUsers(); 
	})
	.fail(function()
	{
		alert("Try Again!");
	})
}

function showUsers() 
{
	for (var item of arr) {
		userDiv.innerHTML += 
		`<div class = "row">
			<div class = "col-md-3 text-center">
                <p>${item.username} 	<button class="btn btn-primary" onclick="">remove</button></p> 
            </div>
      
         </div>`;
	}
}

function remove(i)
{
	var users = localStorage.getItem("users");
}

