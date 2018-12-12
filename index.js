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
// $(document).ready(function() {
//     $('.specialSelect').select2();
// });
function jsonLoaded(obj){
    console.log("obj stringified = " + JSON.stringify(obj.petfinder.pets.pet));
    this.shelter = obj.petfinder.pets.pet; debugger;
}; 


var app = new Vue({
	el: '#app', 
	data: {
        limit: "/5",
        location: "80020",
        sex: "M",
        age:"Young",
        searchBreed: {first:"beagle", second : "Beagle"},
        breeds: [
            {first:"affenpinscher", second : "Affenpinscher"},
            {first:"airedale", second : "Airedale Terrier"},
            {first:"basenji", second : "Basenji"}, 
            {first:"beagle", second : "Beagle"}, 
            {first:"borzoi", second : "Borzoi"},
            {first:"boxer", second : "Boxer"}, 
            {first:"bullterrier", second : "Bull Terrier"}, 
            {first:"cairn", second : "Cairn"}, 
            {first:"cattledog", second : "Cattle Dog"}, 
            {first:"chihuahua", second : "Chihuahua"},
            {first:"chow", second : "Chow Chow"},  
            {first:"cockapoo", second : "Cockapoo"}, 
            {first:"collie", second : "Collie"},
            {first:"coonhound", second : "Coonhound"},
            {first:"corgi", second : "Corgi"},
            {first:"dachshund", second : "Dachshund"},
            {first:"dalmation", second : "Dalmation"},
            {first:"greyhound", second : "Greyhound"},
            {first:"hound", second : "Hound"},
            {first:"husky", second : "Husky"},
            {first:"labrador", second : "Labrador Retriever"},
            {first:"maltese", second : "Maltese"},
            {first:"mastiff", second : "Mastiff"},
            {first:"pomeranian", second : "Pomeranian"},
            {first:"poodle", second : "Poodle"},
            {first:"pug", second : "Pug"},
            {first:"rottweiler", second : "Rottweiler"},
            {first:"setter", second : "Setter"},
            {first:"sheepdog", second : "Sheep Dog"},
            {first:"spaniel", second : "Spaniel"},
            {first:"terrier", second : "Terrier"}                  
        ],
        result: [
           
        ],
        shelter: [

        ]
	},
    //created(){
    //    this.search()
    //},
  
	methods:{
	search(){
		//if (! this.term.trim()) return;
		console.log(this.searchBreed.first);
		let url = "https://dog.ceo/api/breed/" + this.searchBreed.first + "/images/random" + this.limit;
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
            firebase.database().ref('searches').push(this.searchBreed.first);
		})
       } ,// end search
    getData(){
        let url = "https://api.petfinder.com/pet.find?key=68c80bc6414ec08cb86f3f8fc5195a0e&count=1&breed=" 
        + this.searchBreed.second + "&sex=" + this.sex + "&location=" + this.location +  
        "&age=" + this.age + "&format=json";
		console.log("loading " + url);
		
		// use jQuery
	    $.ajax({
		  dataType: "jsonp",
		  url: url,
		  data: null,
		  success: function jsonLoaded(obj){
            console.log("obj stringified = " + JSON.stringify(obj.petfinder.pets.pet));
            this.shelter = obj.petfinder.pets.pet;
        }.bind(app)
		});

	
    },
    
	
	} // end methods
    
});

/**********************
Web Storage
**********************/
const zipField = document.querySelector("#loc");
const prefix = "boi-"; 
const zipKey = prefix + "zip";

// grab the stored data, will return `null` if the user has never been to this page
const storedZip = localStorage.getItem(zipKey);

// if we find a previously set name value, display it
if (storedZip){
	zipField.value = storedZip;
}else{
	zipField.value = "14623"; // a default value if `nameField` is not found
}

/* This stuff happens later when the user does something */
// when the user changes their favorites, update localStorage
zipField.onchange = e=>{ localStorage.setItem(zipKey, e.target.value); };

