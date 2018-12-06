// write logic that will set the api url to localhost:3000
// if that variable is there

let apiUrl;

if(Object.keys(process.env).findIndex(key => key=='REACT_APP_LOCAL_VERSION') == -1){
	apiUrl = 'http://chidogs.herokuapp.com'
} else {
	apiUrl = 'http://localhost:8000'
}

export default apiUrl;