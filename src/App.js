
import React, {useState , useEffect} from 'react';
import './App.css';
import {movies$} from './Movies'
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai";

const Header = (props) =>{
  return(
    
    <div className="header">
       <div className="nav">
      <h1 className="Card-h1">MovieClub</h1>
      
      </div>
   
      <div className="menu">
     <div className="menu-title">
     </div>
     <div className="menu-cont">
      {props.moviez.map((category) => (
            <label className="container" value={category} onChange={props.handleCheck}   key={category}>
              <input   type="checkbox" />
              <span className="checkmark"></span>
              {category}</label>

      ))}
     </div>
     </div>
    </div>
  )
}





const Cards = (props) =>{
  return(
    
    <div  className="cards-container">
     {props.moviez.map((movie) => (
     <li className="cards" key={movie.id}>
     <h2  >{movie.title}</h2>
     <h3 >{movie.category}</h3>
   
      <div className="Card-ratioText">
       <h4 >J'aime</h4>
       <h4>Je n'aime pas</h4>
     </div>
      <div className="Card-ratio">
     
      <div className="Card-likeBar" style={{width:`${(movie.likes * 100)/(movie.likes + movie.dislikes)}%`}}></div>
      </div>
   
      <div className="Card-likes">
      < AiOutlineLike size={25}/>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider" />
      </label>
      <AiOutlineDislike size={25}/>
        </div>

        <button onClick={()=>props.handleRemove(movie.id)}  
        className="Card-delete">Suprimer</button>
        </li>
        ))}
    </div>
    
  );
};






const Footer = (props) =>{
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(props.totalPosts/ props.postPerPage); i++){
   pageNumbers.push(i);
  }

  console.log(pageNumbers)

  return(
    <div  className="footer">
    

      
      <ul className="footer-number">
      <h4 style={{margin:0, padding:0, fontWeight:"normal", marginRight:5, fontSize:14}}>Précédent</h4>

        {pageNumbers.map(number => (
          <li key={number} onClick={()=> props.paginate(number)} className="footer-nextB" >
           
              {number}
        
          </li>
        ))}
              <h4 style={{margin:0, padding:0, fontWeight:"normal", marginLeft:5, fontSize:14}}>Suivant</h4>

        </ul>

       
      
      
    </div>

  )
}






const  App = () => {

  const[moviez, setMoviez] = useState([]);

  const [checked, setChecked] = useState([]);

  const [filt, setFilt] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);



  
  useEffect(() => {
    movies$.then(function(result){
              setMoviez(result)})}, []);





   const handleRemove = (id) => {
    const newMoviez = moviez.filter((movie) => movie.id !== id);
    const newFilt = filt.filter((movie) => movie.id !== id);

    setMoviez(newMoviez);
    setFilt(newFilt)
 
  }



  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.parentElement.innerText];       
    } else {
      updatedList.splice(checked.indexOf(event.target.parentElement.innerText), 1);

    }

    setChecked(updatedList);

     const klick = updatedList.map(items => {
      return moviez.filter(movie => movie.category === items)})

     const read = [].concat(klick[0], klick[1], klick[2], klick[3]);

     
const filtered = read.filter(obj => {
 
  return obj !== undefined ;
});
      setFilt( filtered)
      
        console.log(updatedList)

  };


  const paginate = (pageNumber)  =>  setCurrentPage(pageNumber);









  const categoriesArray = moviez.map((moviez)=>moviez.category)
  const uniqueCategories = categoriesArray.filter((category, id) => {
    return categoriesArray.indexOf(category) === id;
});


const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPosts = moviez.slice(indexOfFirstPost, indexOfLastPost);
const currentPostsFilt = filt.slice(indexOfFirstPost, indexOfLastPost);



  return (<div>
    <Header moviez={uniqueCategories}  handleCheck={handleCheck}/>

    <Cards 
      handleRemove={handleRemove}
      moviez={filt.length > 0 ? currentPostsFilt : currentPosts}/>

<div  className="footer-page">
      <h4 style={{margin:0, padding:0, marginBottom:10, fontWeight:"normal", fontSize:14}}>Résultats par page</h4>
     <button  onClick={()=>setPostPerPage(4)} className="footer-pageB"  >4</button>
     <button  onClick={()=>setPostPerPage(8)} className="footer-pageB" >8</button>
     <button  onClick={()=>setPostPerPage(12)} className="footer-pageB">12</button>
      </div>

    <Footer  postPerPage={postPerPage} paginate={paginate} currentPage={currentPage}   totalPosts={filt.length > 0 ? filt.length : moviez.length}/>

</div>

  );
}

export default App;