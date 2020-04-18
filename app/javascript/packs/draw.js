// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.
document.data  = {...document.getElementById('animation-data').dataset}
Object.keys(document.data).map(function(key, index) {
  console.log(key)
  document.data[key] = JSON.parse(document.data[key])
});
console.log(window.data)
import '../src'
