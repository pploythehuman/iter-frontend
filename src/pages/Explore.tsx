import React, { useState, useEffect } from 'react';
import { Pagination, Tabs, Input, Select, Card } from 'antd';
import '../pages/styles/explore.scss';
import Navbar from '../components/Navbar';
import PlaceCard from '../components/PlaceCard';
import { IPlace, getPlaces } from '../services/place';

const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

interface ExploreProps {
  // data: IAgenda[];
  onSort?: Function;
  onSearch?: Function;
  onDelete?: Function;
}

const Explore: React.FC<ExploreProps> = ({
  onSort = () => {},
  onSearch = () => {},
  onDelete = () => {}
}) => {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [currentTab, setCurrentTab] = useState('1');
  const [currentPage, setCurrentPage] = useState(1);

  console.log("places", places[0]);
  const renderTabContent = (tab: string) => {
    return places.map((place: any) => (
      <PlaceCard key={place.id} {...place} />
    ));
  };

  const onTabChange = (tab: string) => {
    setCurrentTab(tab);
    setCurrentPage(1);
  };

  const onPaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage])

  const fetchData = async () => {
    const result = await getPlaces(currentPage);
    const updatedPlaces = result.results.map((place: any) => ({
      ...place,
      fullAddress: `${place.location.address} ${place.location.sub_district} ${place.location.district} ${place.location.province} ${place.location.postcode}`,
      description: `${place.introduction}, ${place.detail}`,
      images: [...place.web_picture_urls, ...place.mobile_picture_urls],
    }));
    setPlaces(updatedPlaces);
  }

  return (
    <>
      <Navbar />
      {/* <h2 className="explore-title">Explore</h2> */}
      <div className="explore-container">
        <div className="explore-filter">
          <Search
            className="explore-search"
            placeholder="Search..."
            onSearch={value => onSearch(value)}
          />
          {/* <Select 
            className="explore-select"
            defaultValue="Sort by"
            onChange={value => onSort(value)}
          >
            <Option value="date">Date</Option>
            <Option value="rating">Rating</Option>
          </Select> */}
        </div>
        <Tabs 
          defaultActiveKey="1" 
          onChange={onTabChange} 
          className="explore-tabs"
        >
          <TabPane tab="All" key="1">
            {renderTabContent('All')}
            {currentTab === '1' && (
              <Pagination
                className="explore-pagination"
                current={currentPage}
                total={50}
                onChange={onPaginationChange}
              />
            )}
          </TabPane>
          {/* <TabPane tab="Activities" key="2">
            {renderTabContent('Activities')}
          </TabPane>
          <TabPane tab="Restaurants" key="3">
            {renderTabContent('Restaurants')}
          </TabPane>
          <TabPane tab="Accommodations" key="4">
            {renderTabContent('Accommodations')}
          </TabPane> */}
        </Tabs>
      </div>
    </>
  );
};

export default Explore;