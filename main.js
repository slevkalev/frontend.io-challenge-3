const keys = document.querySelectorAll('.key');

const operators=["+","-","x","/","RESET", "=","DEL"]


keys.forEach(key=>{
	key.addEventListener('click', register)
})

const screen = document.querySelector('.screen')
let reg = ""


function calculate(string){

}


function register(e){
	const value = e.target.querySelector('p').innerText
		if(value == "RESET"){
			reg=""
			screen.innerText=""
		}else if(value=="DEL"){
			reg = reg.slice(0, -1)
			screen.innerText=reg
		} else if(value=="="){
			calculate(reg)
		}else{
			reg+=value
			screen.innerText=reg
		}
		
}
