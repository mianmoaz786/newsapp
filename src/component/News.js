import React, { Component } from 'react';
import Newsitem from './Newsitem';
import SkeletonNewsItem from './SkeletonNewsItem';
import { withRouter } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import InfiniteScroll from 'react-infinite-scroll-component';

class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            hasMore: true, // To track if there are more results to load
            showEndMessage: false // Flag to show end message
        };
        this.loadingBarRef = React.createRef();
    }

    static defaultProps = {
        country: 'us',
        category: 'general',
        pageSize: 8
    }

    async componentDidMount() {
        this.fetchNews();
        this.updateDocumentTitle();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.category !== prevProps.match.params.category) {
            this.setState({ page: 1, articles: [], showEndMessage: false }, () => {
                this.fetchNews();
                this.updateDocumentTitle();
            });
        }
    }

    updateDocumentTitle = () => {
        const category = this.props.match.params.category || this.props.category;
        const formattedCategory = `${category.charAt(0).toUpperCase() + category.slice(1)}`;
        document.title = `${formattedCategory} - NewsTime`;
        return formattedCategory;
    }

    fetchNews = async () => {
        this.loadingBarRef.current.continuousStart();
        this.setState({ loading: true, showEndMessage: false });

        const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

        const fetchAndSetNews = async () => {
            const category = this.props.match.params.category || this.props.category;
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${category}&apiKey=d0c0c98e6bbe4afd907c1594fce2ec5e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();

            // Check if there are more articles to load
            const moreArticlesAvailable = parsedData.articles.length > 0 && (this.state.page * this.props.pageSize) < parsedData.totalResults;

            this.setState(prevState => ({
                articles: [...prevState.articles, ...parsedData.articles],
                totalResults: parsedData.totalResults || 0,
                loading: false,
                hasMore: moreArticlesAvailable,
                page: prevState.page + 1,
                showEndMessage: !moreArticlesAvailable // Show end message if no more articles
            }));
            this.loadingBarRef.current.complete();
        };

        await simulateNetworkDelay();
        await fetchAndSetNews();
    };

    render() {
        const category = this.updateDocumentTitle();
        const { loading, articles, hasMore, showEndMessage } = this.state;

        return (
            <div className="container my-3">
                <LoadingBar color="#FFFF" ref={this.loadingBarRef} />
                <h2 className="text-center animated-heading" data-text={`NewsTime - Top ${category} Headlines`}>
                    NewsTime - Top {category} Headlines
                </h2>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={this.fetchNews} // Load more news
                    hasMore={hasMore} // Check if more news is available
                    loader={
                        loading && (
                            <div className="row my-5">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                                    <div className="col-md-4 my-3" key={index}>
                                        <SkeletonNewsItem />
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    endMessage={
                        showEndMessage && !loading && (
                            <p className="end-message text-center">No more articles available</p>
                        )
                    }
                >
                    <div className="row my-5">
                        {articles.length > 0 ? (
                            articles.map((element) => {
                                const title = element.title
                                    ? element.title.length > 44
                                        ? element.title.slice(0, 44) + "..."
                                        : element.title
                                    : "No title available";
                                const description = element.description
                                    ? element.description.length > 88
                                        ? element.description.slice(0, 88) + "..."
                                        : element.description
                                    : "No description available";

                                return (
                                    <div className="col-md-4 my-3" key={element.url}>
                                        <Newsitem
                                            title={title}
                                            description={description}
                                            imgurl={element.urlToImage}
                                            newsurl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            !loading && (
                                <div className="text-center">
                                    <span>No articles available</span>
                                </div>
                            )
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(News);
