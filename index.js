let getData = (id) =>{
	$.ajax({
		type: 'GET',
		dataType: 'json',
		async: true,
		url:`http://www.omdbapi.com/?i=tt${id}&apikey=cd8ee319`,

		success: (response) => {
				if(response.Response == "True"){
					console.log(response)
					let img = "";
					if(response.Poster == "N/A"){
						img=`index.png`;
					}else{
						img = response.Poster;
					}

					let card = `<div class="card col-5 col-sm-3 col-xl-2 cardContainer" style="width: 18rem;">
							  <img class="card-img-top image" src="${img}" alt="Card image cap">
					            <a href="https://www.imdb.com/title/${response.imdbID}/">
							  <div class="card-body cardBody">
							    <h5 class="card-title">${response.Title}</h5>
							    <p class="card-text">
							    	Production:${response.Production}<br>
							    	Genre:${response.Genre}<br>
							    	Released:${response.Released}<br>
							    	Rating:${response.imdbRating}/10<br>
							    </p>
							  </div></a>
							</div>`
							$(".row").prepend(card);
				}else{
					alert("No movie by this id")
				}
		},
		error: (err) => {
			console.log(err)
			alert("Sometihng wrong occured")
		} 
	})

}// Getting Data from omdb using imdb Id


$(document).ready(() =>{

	$('#search').click(() =>{
        var value = Number($('input[name=radio-1]:checked').val()); 
        if(value === 1){
        	$(".title").show("5000");
        	$(".imdb").hide("5000");
        }else if(value == 2){
        	$(".title").hide("5000");
        	$(".imdb").show("5000");
        }else{
        	alert("select from the radio button, \n what to use while finding movie data")
        }
    });

    $("#search1").click(() =>{
    	if($("#imdbId").val() != undefined || $("#imdbId").val() != "" || !isNaN(Number($("#imdbId").val()))){
    		let id = $("#imdbId").val();
    		getData(id)
    	}else{
    		alert('enter valid id')
    	}
    })//get data using Imdb Id

    $("#search2").click(() =>{

    	if($("#title").val() != undefined || $("#title").val() != ""){
    		let title = $("#title").val();
    		if($("#year").val() == ""){
    			getDataByTitle(title,"")
    		}else if(!isNaN(Number($("#year").val()))&& Number($("#year").val())<2019 && Number($("#year").val())>1900){
    			let year = $("#year").val();
    			getDataByTitle(title, year)
    		}else{
    			alert("Enter valid year(* Between 1900 to 2018)")
    		}
    	}else{
    		alert('enter valid Title')
    	}
    })// Get Data using title and year.

})

