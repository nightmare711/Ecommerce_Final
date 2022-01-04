/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/helpers';

class Homepage extends React.PureComponent {
  render() {
    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='https://res.cloudinary.com/danhpq17/image/upload/v1641310429/banner2_h60jq7.jpg' className='mb-3' />
              <img src='https://res.cloudinary.com/danhpq17/image/upload/v1641311476/banner6_twv7u4.jpg' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-3 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between'>
              <img src='https://res.cloudinary.com/danhpq17/image/upload/v1641311586/banner8_u0tqee.jpg' className='mb-3' />
              <img src='https://res.cloudinary.com/danhpq17/image/upload/v1641311477/banner7_uuuqsx.jpg' />
            </div>
          </Col>
        </Row>
        <div className='News'>
            <h1 className='logo'>Lastest News</h1>
            <div className='list-news'>
                <a href='/blog/1' className='news-box'>
                  <img src='https://images.pexels.com/photos/1447418/pexels-photo-1447418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'></img>
                  <h2>A few things to note</h2>
                  <div>In this series of articles, ProX will guide you to play Bitcoin for beginners, as well as how to play Bitcoin from A to Z in the most detail</div>
                </a>
                <a href='/blog/2' className='news-box'>
                <img src='https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'></img>
                <h2>Bitcoin Overview</h2>
                <div>In this article, we will learn briefly about Bitcoin and to have a solid knowledge base about Bitcoin</div>
              </a>
              <a href='/blog/1' className='news-box'>
                <img src='https://images.pexels.com/photos/8358115/pexels-photo-8358115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'></img>
                <h2>9 Ways to Invest Bitcoin</h2>
                <div>Ok, after understanding what Bitcoin is, its time for you to ask the question "I want to play Bitcoin, how should I start?"</div>
              </a>
            </div>             
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, actions)(Homepage);
