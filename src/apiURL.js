// write logic that will set the api url to localhost:3000
// if that variable is there

let apiUrl = '';

if(Object.keys(process.env).findIndex(key=>key=='REACT_APP_LOCAL_VERSION')){
	apiUrl = 'http://localhost:8000'
} else {
	apiUrl = 'http://chidog.herokuapp.com/'
}

export default apiUrl