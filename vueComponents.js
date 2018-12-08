Vue.component('dogProfile',{
	props: ['year','name'],
	template: `<footer class="muted" style="text-align:center">
		   &copy; {{ year }} {{ name }}
		   </footer>`
});