//variables

const keys = document.querySelectorAll('.key');
const operators=["+","-","x","/"]
const screen = document.querySelector('.screen')
let reg1 = ""
let reg2 = ""
let op = ""


//Event Listeners

keys.forEach(key=>{
	key.addEventListener('click', register)
})



//functions

//calculate results in a number based on 1st registered number (reg1) 2nd registered number (reg2) and 
function calculate(reg1, reg2, op){
	if(op=="+"){
		return Number(reg1) + Number(reg2)
	}
	if(op=="-"){
		return Number(reg2) - Number(reg1)
	}
	if(op=="x"){
		return Number(reg1) * Number(reg2)
	}
	if(op=="/"){
		return Number(reg2) / Number(reg1)
	}
}

function display(reg){
	screen.innerText=reg
}


// there are 2 number registers and an operator register to control the screen output
// reg1 is the active register for each number keystroke
// the DEL key only acts only on the active register
// reg2 is set when the active register(reg1) is not empty and an operator keystroke has occurred.

function register(e){
	const value = e.target.querySelector('p').innerText
		if(value == "RESET"){
			reg1="" // clear register 1
			reg2="" // clear register 2
			op=""  // clear operator
			display(reg1) // clear display
		}else if(value=="DEL"){
			if(reg1==""){
				display(reg2)
			}else{
				reg1 = reg1.slice(0,-1)
				display(reg1)	
			}
		}else if(value=="="){
			if(reg1 && reg2 && op){
			reg2 = calculate(reg1, reg2, op)
			reg1 = ""
			op = ""
			display(reg2)
			}else if(reg2 && !reg1 && !op){
				display(reg2)
			}
		}else if(operators.includes(value)){
			if(reg2 && reg1){
				reg2 = calculate(reg1, reg2, op)
				display(reg2)
				op=value
				reg1=""
			}else if(reg2 && !reg1){
				op=value
			}else{
				reg2 = reg1
				op= value
				reg1=""
			}
		}else{
			reg1+=value
			console.log(reg1)
			display(reg1)
		}
		
}

