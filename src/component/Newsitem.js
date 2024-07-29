import React, { Component } from 'react';

export default class Newsitem extends Component {
  render() {
    let { title, description, imgurl, newsurl, author, date, source } = this.props;
    return (
      <div>
        <div className="card shadow card-hover" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src={!imgurl ? "https://tse4.mm.bing.net/th?id=OIP.uKIFFxOB2CzXpyL9570wJAHaEL&pid=Api&P=0&h=220" : imgurl}
            alt=""
          />
          <div className="card-body">
            <span className="badge badge-pill badge-dark my-2">{source}</span>
            <h5 className="card-title card-text">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              By <b>{!author ? "Unknown Author" : author}</b> on <b>{!date ? "unknown date" : new Date(date).toGMTString()}</b>
            </p>
            <a href={newsurl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark btn-change">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}
