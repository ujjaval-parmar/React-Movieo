// console.log(process.env)


export const apiGanerator = async(api_url, method)=>{
    const fetchApi = await fetch(`https://api.themoviedb.org/3/${api_url}`,{
        method: method || 'GET',
        "Access-Control-Allow-Origin": "*",
        headers: {
            'Authorization': 'Bearer '+ 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2ZkNjU4MWMzZWQ5NWU4NzJiMGYxMGRhYzIzMDk2NCIsIm5iZiI6MTcyMDY2NDY3MC44Njk4MTYsInN1YiI6IjY1YTAzM2MxNWNhNzA0MDEyZWE5NmYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rBUPfvC4ynjya1GWFF1-QMZANeeqR5De8hMpe1hxqTQ',
            'Content-Type': 'application/json',
        }
    });

    return fetchApi;


}

