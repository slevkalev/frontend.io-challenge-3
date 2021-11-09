

const calculator = {
	elements:{
		main: null,
		header: null,
		screen: null,
		keysContainer: null,
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
		
		const label2 = document.createElement("label")
		label2.setAttribute("for", "theme2")
		label2.textContent = "2"
		
		const label3 = document.createElement("label")
		label3.setAttribute("for", "theme3")
		label3.textContent = "3"

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
				case "del":
					btn.classList.add("key__blue")
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						if(this.register.reg2 == "" && this.register.flag == false){
							this.register.reg1 = this.register.reg1.slice(0,-1)
							this.elements.screen.innerText = this.register.reg1
						}
						if(this.register.reg2 !="" && this.register.flag == false){
							this.register.reg2 = this.register.reg2.slice(0,-1)
							this.elements.screen.innerText = this.register.reg2
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
								this.elements.screen.innerText = this.register.reg1
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
								this.elements.screen.innerText = this.register.reg1
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
								this.elements.screen.innerText = this.register.reg1
							}else if(this.register.reg1 != "" && this.register.op ==""){
								this.register.op = key
							}else if(this.register.reg1 !="" && this.register.op !=""){						
								this.register.reg1 = calculate(this.register.reg1, this.register.reg2, this.register.op).toString()
								this.elements.screen.innerText = this.register.reg1
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
								this.elements.screen.innerText = this.register.reg1
							}else if(this.register.reg1 != "" && this.register.op ==""){
								this.register.op = key
							}else if(this.register.reg1 !="" && this.register.op !=""){						
								this.register.reg1 = calculate(this.register.reg1, this.register.reg2, this.register.op).toString()
								this.elements.screen.innerText = this.register.reg1
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

				case ".":
					btn.textContent = key
					btn.addEventListener("click", ()=>{
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
						console.log(this.register)
					})
				break

				default:
					btn.textContent = key
					btn.addEventListener("click", ()=>{
						if(this.register.flag == false){
							if(this.register.reg1 =="" && this.register.op ==""){
								this.register.reg1 +=key
								this.elements.screen.innerText = this.register.reg1
							}else if(this.register.reg1 !="" && this.register.op ==""){
								this.register.reg1 += key
								this.elements.screen.innerText =this.register.reg1
							}else{
								this.register.reg2 += key
								this.elements.screen.innerText =this.register.reg2
							}
						}
						if(this.register.flag == true){
							this.register.reg1 = ""
							this.register.reg1 += key
							this.elements.screen.innerText = this.register.reg1
							this.register.flag = false
						}
						console.log(this.register)
					})
			}
			
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

