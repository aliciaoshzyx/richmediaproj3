// Initialize Firebase
var config = {
    apiKey: "AIzaSyBOf-2qnc9htrCajBfZGm4_QTpbzf6I3DE",
    authDomain: "rmproject3.firebaseapp.com",
    databaseURL: "https://rmproject3.firebaseio.com",
    projectId: "rmproject3",
    storageBucket: "",
    messagingSenderId: "886497343959"
  };
  firebase.initializeApp(config);


const app = new Vue({
	el: '#app',
	data: {
        limit: "/5",
        breed: "malamute",
        result: [
            /*{
                status = "success",
                message = [
                    "https://dog.ceo/api/breed/malamute/images/random"
                ]
            }
            */
        ]
	},
    created(){
        this.search()
    },
	methods:{
	search(){
		//if (! this.term.trim()) return;
		let url = "https://dog.ceo/api/breed/" + this.breed + "/images/random" + this.limit;
		//url += this.limit;
		fetch(url)
		.then(response => {
			if(!response.ok){
				throw Error(`ERROR: ${response.statusText}`);
			}
			return response.json();
		})
		.then(json => {	
			console.log(json);
            
            this.result = json;
            firebase.database().ref('searches').push(this.breed);
		})
	   } // end search
	} // end methods
    
});