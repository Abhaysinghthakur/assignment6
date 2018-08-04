let getDataByTitle = (title,year) =>{
	$.ajax({
		type: 'GET',
		dataType: 'json',
		async: true,
		url:`http://www.omdbapi.com/?s=${title}&y=${year}&apikey=cd8ee319`,

		success: (response) => {
				if(response.Response == "True"){
					console.log(response)

					for( i of response.Search){
						let img = "";
						if(i.Poster == "N/A"){
							img=`index.png`;
						}else{
							img = i.Poster;
						}

						let card = `
					            <div class="card col-3 cardContainer" style="width: 18rem;">
					            <a href="${img}" class="image">
							  <img class="card-img-top image" src="${img}" alt="Card image cap">
							  </a>
					            <a href="https://www.imdb.com/title/${i.imdbID}/">
							  <div class="card-body cardBody">
							    <h5 class="card-title">${i.Title}</h5>
							    <p class="card-text">
							    	Type:${i.Type}<br>
							    	Year:${i.Year}<br>
							    	imdbID:${i.imdbID}<br>
							    </p>
							  </div></a>
							</div>`
							$(".row").prepend(card);
					}
					
				}else{
					alert("No movie by this Title and year")
				}
		},
		error: (err) => {
			console.log(err)
			alert("Enter Vaild Data")
		} 
	})

}// Getting Data from omdb using Title and year