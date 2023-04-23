import React, { useState } from "react";
import Hero from "./Hero";
import News from "../../components/ZNews";
import Collectables from "../../components/ZCollectables";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "../../components/ZControl/Control.module.sass";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";

//replace with database pull
import {
  heroItems,
  collectibleItems,
  forsaleItems,
} from "../../mocks/homedata";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Data = [
  {
    tab: "1",
    title: "Africa",
    components: [
      <Hero items={heroItems} />,
      <Collectables
        classSection="section"
        title="Travel Collectables"
        bids={collectibleItems}
      />,
      <News classSection="section" title="Trending" bids={forsaleItems} />,
    ],
  },
  {
    tab: "2",
    title: "Americas",
    components: [
      <Hero items={heroItems} />,
      <Collectables
        classSection="section"
        title="Travel Collectables"
        bids={collectibleItems}
      />,
      <News classSection="section" title="Trending" bids={forsaleItems} />,
    ],
  },
  {
    tab: "3",
    title: "Antarctica",
    components: [
      <Hero items={heroItems} />,
      <Collectables
        classSection="section"
        title="Travel Collectables"
        bids={collectibleItems}
      />,
      <News classSection="section" title="Trending" bids={forsaleItems} />,
    ],
  },
  {
    tab: "4",
    title: "Asia",
    components: [
      <Hero items={heroItems} />,
      <Collectables
        classSection="section"
        title="Travel Collectables"
        bids={collectibleItems}
      />,
      <News classSection="section" title="Trending" bids={forsaleItems} />,
    ],
  },
  {
    tab: "5",
    title: "Europe",
    components: [
      <Hero items={heroItems} />,
      <Collectables
        classSection="section"
        title="Travel Collectables"
        bids={collectibleItems}
      />,
      <News classSection="section" title="Trending" bids={forsaleItems} />,
    ],
  },
  {
    tab: "6",
    title: "Oceania",
    components: [
      <Hero items={heroItems} />,
      <Collectables
        classSection="section"
        title="Travel Collectables"
        bids={collectibleItems}
      />,
      <News classSection="section" title="Trending" bids={forsaleItems} />,
    ],
  },
  {
    tab: "7",
    title: "Events",
    components: [
      <Hero items={heroItems} />,
      <Collectables
        classSection="section"
        title="Travel Collectables"
        bids={collectibleItems}
      />,
      <News classSection="section" title="Trending" bids={forsaleItems} />,
    ],
  },
  {
    tab: "8",
    title: "PixExplorer",
    components: [
      <Hero items={heroItems} />,
      <Collectables
        classSection="section"
        title="Travel Collectables"
        bids={collectibleItems}
      />,
      <News classSection="section" title="Trending" bids={forsaleItems} />,
    ],
  },
  {
    tab: "9",
    title: "Events",
    components: [
      <Hero items={heroItems} />,
      <Collectables
        classSection="section"
        title="Travel Collectables"
        bids={collectibleItems}
      />,
      <News classSection="section" title="Trending" bids={forsaleItems} />,
    ],
  },
];

const Home = () => {
  const { search: query } = useLocation();
  const history = useHistory();
  const searchQuery = new URLSearchParams(query).get("index") || "";
  const [activeTab, setActiveTab] = useState("1");
  console.log("searchQuery", searchQuery);
  const toggle = (tab) => {
    history.push(`/?index=${tab}`);
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <>
      <div className={cn(styles.control)}>
        <div className={cn("container", styles.container)}>
          <Nav tabs style={{ margin: "0 auto" }}>
            {Data.map((x, index) => (
              <NavItem>
                <NavLink
                  className={cn({ active: activeTab === x.tab })}
                  onClick={() => {
                    toggle(x.tab);
                  }}
                >
                  <p
                    className={cn(
                      styles.link,
                      activeTab === x.tab ? styles.custom : " "
                    )}
                  >
                    {x.title}
                  </p>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </div>

      <TabContent activeTab={activeTab}>
        {Data.map((x, index) => (
          <TabPane tabId={x.tab}>
            {x.components.map((i) => (
              <>{i}</>
            ))}
          </TabPane>
        ))}
      </TabContent>
    </>
  );
};

export default Home;
