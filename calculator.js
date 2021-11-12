const calculator = {
	elements:{
		main: null,
		header: null,
		screen: null,
		keysContainer: null,
		// list of keys on the keypad
		keys: [
			"1", "2", "3", "del", 
			"4", "5", "6", "+", 
			"7", "8", "9", "-", 
			".", "0", "/", "x", 
			"reset","="
		]
	},

	eventHandlers:{
		oninput:null
	},
	// calculator registers used for storing keyed input
	// op is to set the operator of the formula
	// flag is set after = sign has been keyed in.
	// after =sign reg1 is set to the screen value and reg2 and op are cleared
	register:{
		reg1:"",
		reg2:"", 
		op:"",
		flag:false //flag for after = sign has been hit 
	},

	init(){
		//create main element
		this.elements.main = document.createElement("div")
		this.elements.main.classList.add("calculator")
		document.body.appendChild(this.elements.main)

		// create calc header with theme toggle
		this.elements.header = document.createElement("div")
		this.elements.header.classList.add("calc-head")
		const headTitle = document.createElement("h1")
		headTitle.classList.add("calc-title")
		headTitle.textContent ="calc"

		const themeSet = document.createElement("span")
		themeSet.classList.add("theme-set")
		const themeP = document.createElement("p")
		themeP.textContent = "theme"
		themeSet.appendChild(themeP)

		const choices = document.createElement("span")
		choices.classList.add("choices")
		const label1 = document.createElement("label")
		label1.setAttribute("for", "theme1")
		label1.textContent = "1"
		label1.addEventListener("click", ()=>{
			if(theme1.checked){
				theme2.checked=true
				document.body.classList.add("theme2")
				theme3.checked=false;
				document.body.classList.remove("theme3")
			}else{
				theme2.checked=false
				theme3.checked=false
				document.body.classList.remove("theme2")
				document.body.classList.remove("theme3")
			}
		})
		
		const label2 = document.createElement("label")
		label2.setAttribute("for", "theme2")
		label2.textContent = "2"
		label2.addEventListener("click", ()=>{
			if(theme2.checked){
				theme1.checked=true
				document.body.classList.remove("theme2")
				theme3.checked=false;
				document.body.classList.remove("theme3")
			}else{
				theme1.checked=false
				document.body.classList.add("theme2")
				theme3.checked=false
				document.body.classList.remove("theme3")
			}
		})
		
		const label3 = document.createElement("label")
		label3.setAttribute("for", "theme3")
		label3.textContent = "3"
		label3.addEventListener("click", ()=>{
			if(theme3.checked){
				theme2.checked=true
				document.body.classList.add("theme2")
				theme1.checked=false;
			}else{
				theme2.checked=false
				document.body.classList.remove("theme2")
				theme1.checked=false
				document.body.classList.add("theme3")
			}
		})

		choices.appendChild(label1)
		choices.appendChild(label2)
		choices.appendChild(label3)
		themeSet.appendChild(choices)

		const toggles = document.createElement("span")
		toggles.classList.add("toggles")
		const check1 = document.createElement("input")
		check1.setAttribute("type", "checkbox")
		check1.setAttribute("id", "theme1")
		check1.setAttribute("checked", "true")
		check1.setAttribute("name", "theme")
		check1.setAttribute("value", 'theme1')

		const tog1 = document.createElement("span")
		tog1.classList.add("checkmark")
		tog1.setAttribute("id","checkmark1")

		const check2 = document.createElement("input")
		check2.setAttribute("type", "checkbox")
		check2.setAttribute("id", "theme2")
		check2.setAttribute("name", "theme")
		check2.setAttribute("value", 'theme2')
	
		const tog2 = document.createElement("span")
		tog2.classList.add("checkmark")
		tog2.setAttribute("id","checkmark2")

		const check3 = document.createElement("input")
		check3.setAttribute("type", "checkbox")
		check3.setAttribute("id", "theme3")
		check3.setAttribute("name", "theme")
		check3.setAttribute("value", 'theme3')
		
		const tog3 = document.createElement("span")
		tog3.classList.add("checkmark")
		tog3.setAttribute("id","checkmark3")

		toggles.appendChild(check1)
		toggles.appendChild(tog1)
		toggles.appendChild(check2)
		toggles.appendChild(tog2)
		toggles.appendChild(check3)
		toggles.appendChild(tog3)
		themeSet.appendChild(toggles)


		//create the screen
		this.elements.screen = document.createElement("textarea")
		this.elements.screen.classList.add("screen")
		this.elements.screen.setAttribute("placeholder", "0")

		//create the key board container
		this.elements.keysContainer = document.createElement("div")
		this.elements.keysContainer.classList.add("keys-container")

		this.elements.header.appendChild(headTitle)
		this.elements.header.appendChild(themeSet)
		this.elements.keysContainer.appendChild(this._createKeys())

		this.elements.main.appendChild(this.elements.header)
		this.elements.main.appendChild(this.elements.screen)
		this.elements.main.appendChild(this.elements.keysContainer)
	},

	_createKeys(){
		const fragment = document.createDocumentFragment()

		this.elements.keys.forEach(key=>{
			const btn = document.createElement("button")
			btn.setAttribute("type", "button")
			btn.classList.add("key")

			// basic calculator functions
			function calculate(reg1, reg2, op){
				const arg1 = (reg1.charAt(reg1.length-1) ==".")? reg1.slice(0,-1):reg1
				const arg2 = (reg2.charAt(reg2.length-1) ==".")? reg2.slice(0,-1):reg2
				
				if(op=="+"){
					return Number(arg1) + Number(arg2)
				}
				if(op=="-"){
					return Number(arg1) - Number(arg2)
				}
				if(op=="x"){
					return Number(arg1) * Number(arg2)
				}
				if(op=="/"){
					return Number(arg1) / Number(arg2)
				}
			}

			switch(key){
				// del key deletes last character of a keyed input.
				// del does not delete characters after = sign calulations
				case "del":
					btn.classList.add("key__blue")
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						if(this.register.reg2 == "" && this.register.flag == false){
							this.register.reg1 = this.register.reg1.slice(0,-1)
							this.elements.screen.innerText = Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
						}
						if(this.register.reg2 !="" && this.register.flag == false){
							this.register.reg2 = this.register.reg2.slice(0,-1)
							this.elements.screen.innerText = Number(this.register.reg2).toLocaleString("en-US",{maximumFractionDigits:7});
						}
					})
				break

				case "reset":
					btn.classList.add("key__large", "key__blue")
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						this.register.reg1 = ""
						this.register.reg2 = ""
						this.register.op = ""
						this.elements.screen.innerText=""
					
					})
				break

				case "+":
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						if(this.register.flag == false){
							if(this.register.reg1 == ""){
								this.register.reg1 ="0"
								this.register.op = key
							}
							if(this.register.reg1 != "" && this.register.op ==""){
								this.register.op = key
							}
							if(this.register.reg1 != "" && this.register.op != ""){
								this.register.reg1 = calculate(this.register.reg1, this.register.reg2, this.register.op).toString()
								this.elements.screen.innerText = Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
								this.register.reg2 = ""
								this.register.op =key
							}
						}else{
							this.register.op = key
							this.register.flag = false
						}
					
					})
				break

				case "-":
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						if(this.register.flag == false){
							if(this.register.reg1 == ""){
								this.register.reg1 ="0"
								this.register.op = key
							}
							if(this.register.reg1 != "" && this.register.op ==""){
								this.register.op = key
							}
							if(this.register.reg1 != "" && this.register.op != ""){
								this.register.reg1 = calculate(this.register.reg1, this.register.reg2, this.register.op).toString()
								this.elements.screen.innerText = Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
								this.register.reg2 = ""
								this.register.op =key
							}
						}else{
							this.register.op = key
							this.register.flag = false
						}
					
					})
				break

				case "x":
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						if(this.register.flag == false){
							if(this.register.reg1 == ""){
								this.register.reg1 = "0"
								this.register.op = key
								this.elements.screen.innerText = Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
							}else if(this.register.reg1 != "" && this.register.op ==""){
								this.register.op = key
							}else if(this.register.reg1 !="" && this.register.op !=""){						
								this.register.reg1 = calculate(this.register.reg1, this.register.reg2, this.register.op).toString()
								this.elements.screen.innerText = Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
								this.register.reg2 = ""
								this.register.op = key
							}
						}else{
							this.register.op = key
							this.register.flag = false
						}
					})
				break

				case "/":
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						if(this.register.flag == false){
							if(this.register.reg1 == ""){
								this.register.reg1 = "0"
								this.register.op = key
								this.elements.screen.innerText = Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
							}else if(this.register.reg1 != "" && this.register.op ==""){
								this.register.op = key
							}else if(this.register.reg1 !="" && this.register.op !=""){						
								this.register.reg1 = calculate(this.register.reg1, this.register.reg2, this.register.op).toString()
								this.elements.screen.innerText = Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
								this.register.reg2 = ""
								this.register.op = key
							}
						}else{
							this.register.op = key
							this.register.flag = false
						}
					
					})
				break

				case "=":
					btn.classList.add("key__large", "key__red")
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						if(this.register.reg1 && this.register.reg2 && this.register.op){
							this.register.reg1 = calculate(this.register.reg1, this.register.reg2, this.register.op).toString()
							this.elements.screen.innerText = this.register.reg1
							this.register.reg2 = ""
							this.register.op = ""
							this.register.flag=true
						}
					
					})
				break
				//  . has been formatted to display one zero in front of the number
				case ".":
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						if(this.register.flag == false){
							if(this.register.reg1 == ""){
							this.register.reg1 = "0" + key
							this.elements.screen.innerText = this.register.reg1
							}
							if(this.register.reg1 !="" && this.register.op =="" && this.register.reg1.includes(".")!=true){
								this.register.reg1 += key
								this.elements.screen.innerText = this.register.reg1
							}
							if(this.register.reg1 && this.register.op !=""){
								if(this.register.reg2 == ""){
									this.register.reg2 += "0" + key
									this.elements.screen.innerText = this.register.reg2
								}
								if(this.register.reg2 !="" && this.register.reg1.includes(".")!=true){
								this.register.reg2 += key
								this.elements.screen.innerText = this.register.reg2
								}
							}
						}
						if(this.register.flag == true){
							this.register.reg1 = ""
							this.register.reg1 += "0" + key
							this.elements.screen.innerText = this.register.reg1
							this.register.flag = false
						}
					})
				break

				default:
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						// flag is false if no calculation has been executed
						// the next keyed value will add to the reg1 or reg2 depending on criteria
						if(this.register.flag == false){
							if(this.register.reg1 =="" && this.register.op ==""){
								this.register.reg1 +=key
								this.elements.screen.innerText = Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
							}else if(this.register.reg1 !="" && this.register.op ==""){
								this.register.reg1 += key
								this.elements.screen.innerText =Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
							}else{
								this.register.reg2 += key
								this.elements.screen.innerText =Number(this.register.reg2).toLocaleString("en-US",{maximumFractionDigits:7});
							}
						}
						// flag is true when there has been a calculation executed (= has been keyed)
						// the current value of reg1 is the result of the calculation
						// if the next keyed value is an operator (+ - x /) the next number will store in reg2
						// if the next keyed value is a number the calculated value in reg1 is replaced with the new keyed value
						if(this.register.flag == true){
							this.register.reg1 = ""
							this.register.reg1 += key
							this.elements.screen.innerText = Number(this.register.reg1).toLocaleString("en-US",{maximumFractionDigits:7});
							this.register.flag = false
						}
					})
			}
			//add keys to the DOM
			this.elements.keysContainer.appendChild(btn)
		})

		return fragment
	},

	_triggerEvent(handlerName){
		console.log("Event Triggered"+" "+ handlerName)
	}

}




window.addEventListener("DOMContentLoaded", function(){
	calculator.init()

})



