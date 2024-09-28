import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectArticle } from '../../Actions/User';
import { updateSearchTerm, fetchSearchResults, setSearchResults } from '../../Actions/User';
import Article from '../Article/Article';
import './News.css';
import { Button, Typography } from "@mui/material";



const News = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();


    const {searchResults} = useSelector((state) => state.news);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateSearchTerm(searchTerm));
      dispatch(fetchSearchResults(searchTerm));
    };
  
    const savedResults = localStorage.getItem('searchResults');
    console.log("Search results is ",searchResults);

  if (savedResults != "undefined") {
    dispatch(setSearchResults(JSON.parse(savedResults)));
  }

  
    useEffect(() => {
      console.log("searchResults in News ",searchResults)
    },[searchResults])
  
    const handleArticleClick = (article) => dispatch(selectArticle(article));
    
    return (
        <div className='news'>
            <form className="newsSearchForm" onSubmit={handleSubmit}>
            <Typography variant="h3" style={{ padding: "2vmax" }}>
                "What do you want to read about today?"
            </Typography>
            
                <input
                type="text"
                value={searchTerm}
                placeholder="Search for news..."
                required
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit">Search</Button>
            <div className="newsSearchResults">
            {searchResults && searchResults.map((article) => (
                <Link onClick={() => handleArticleClick(article)} to={`${article.url}`}>
                    <Article
                    article={article}/>
                </Link>
            ))}
            </div>
            </form>
        </div>
    );
}

export default News;