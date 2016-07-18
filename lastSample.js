//_________________@Copyright protected prajils Code---------------------------


var MovieContainer = React.createClass({
  render : function(){
    return(
      <div className = "MovieContainer">
      <SearchBar/>
      </div>
    );
  }
});

var SearchBar = React.createClass({
      getInitialState: function() {
        return {data: []};
      },
      submit : function(event){

      var self
      event.preventDefault()
      self = this

      console.log(this.state.Title);
      var input ={
        Title: this.state.Title
      }

      $.ajax({
      type: 'POST',
      url: '',
      data:input,
      success : function(data){
      this.setState({data: data});
      }.bind(this)
    });
},
getData : function(){
  $.ajax({
    url: '',
    dataType: 'json',
    cache: false,
    type: 'GET',
    success: function(data) {
      this.setState({data: data});
      }.bind(this)
  });
},
  componentDidMount: function() {
    this.getData();
    setInterval(this.getData, 2000);
    },

  MovieTitleChange: function(event) {
    this.setState({Title: event.target.value});
    //console.log(this.state);
  },

render : function(){

    return (

      <div>
      <div className = "well">
      <div className = "container">
      <form onSubmit = {this.submit}>
       <div className="form-group">
         <input type="text" onChange={this.MovieTitleChange} val={this.state.Title} name ="Title" placeholder="Enter movie url" className="form-control"/>
       </div>
       <div className="form-group">
       <div className="col-sm-offset-4 col-sm-10">
         <button type="submit" id="save" className="btn btn-success">Search and Save</button>
       </div>
       </div>
       </form>
       </div>
       </div>
       <MovieList data = {this.state.data} />
       </div>
    );

  }

});

var MovieList = React.createClass({

    render : function(){
       return (

         <div>
         {
           this.props.data.map(function(result){
           return(
             <div className = "row">
             <div className = "jumbotron">
             <div className="col-md-4">
             <img src={result.Poster} alt={result.Title} id="img" />
             </div>
             <div className = "col-md-8">
             <input type = "text" className="form-control" value={result.Title} /><br/>
             <input type = "text" className="form-control" value ={result.Year}/>
             <button type="submit" id ="view" className="btn btn-primary" >View on IMDB</button>
             </div>
             </div>
             </div>
           );
         }
       )}
         </div>

       );
     }


});

ReactDOM.render(
<MovieContainer />,
document.getElementById('content')

);
