function func() { 
		var filtered = [{'id':1, 'type': 'external'}, {'id':2}, {'id':3, type: 'internal'}].filter((item)=>{
        return item.type ==='external';	
        }); 
		document.write(JSON.stringify(filtered)); 
}  
func();
