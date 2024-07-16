import React from "react";
import { useNavigate } from "react-router-dom";
import { theme, /* Grid, */ Col, Row, Rate, Button, Image } from "antd";

import styles from "../assets/styles/shared.module.scss";

// const { useBreakpoint } = Grid;

interface Props {
  data: any
}

const HotelCard: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = (data: any) => {
    navigate(`/hotel/${data._id}/${data.name.toLowerCase().replaceAll(" ","-")}`, { state: data });
  };

  // const screens = useBreakpoint();
  // console.log(screens);
  const cheapestRoomPrice = Math.min.apply(Math, data.prices.map((item: any) => item.prices.at(-1)?.price));

  const EURO_FX = 1.18;

  return (
    <Row
      gutter={[0, 16]}
      className={styles.hotelCard}
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG
      }}
    >
      <Col span={6}>
        <Image
          src={`/images/hotels/${data?.image}`}
          alt="React Image"
          // className={styles.hotelCardImage}
          style={{ borderRadius: 8, height: "100%", width: "90%"  }}
        />
      </Col>
      <Col span={18}>
        <Row>
          <Col span={15}>
            <Row>
              <Col span={24}><Rate allowHalf defaultValue={data?.rating} /></Col>
              <Col span={24} className={styles.hotelName}>{data.name}</Col>
              <Col span={24} className={styles.hotelAddress}>{data.address}</Col>
            </Row>
          </Col>
          <Col span={9}>
            <Row justify={"space-between"} style={{ textAlign: "right" }}>
              <Col span={24} style={{ fontSize: 20 }}>£{cheapestRoomPrice.toFixed(2)}</Col>
              <Col span={24}><small>(€{(cheapestRoomPrice * EURO_FX).toFixed(2)})</small></Col>
              <Col span={24}><small>Breakfast included</small></Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: 5 }} justify={"space-between"} align={"middle"}>
          <Col span={7} style={{ backgroundColor: "#fcfcfc", minHeight: 110, padding: 15 }}>
            <b>Service times</b>
            <div style={{ marginTop: 10 }}><b>Earliest check-in:</b> {data.serviceTimes.checkIn}</div>
            <div style={{ marginTop: 3 }}><b>Latest check-out:</b> {data.serviceTimes.checkOut}</div>
          </Col>
          <Col span={10} style={{ backgroundColor: "#fcfcfc", minHeight: 110, padding: 15/*, marginLeft: 5 */ }}>
            <b>Features</b>
            <div style={{ marginTop: 10, fontSize: 13 }}>
              {
                data.layout.features?.map((feature: any) =>
                  <span
                    key={`hotel-card-feature-${feature._id}`}
                    style={{ display: "inline-block", backgroundColor: "#E5E4E2", borderRadius: 6, margin: 2, padding: "3px 6px" }}
                  >{feature.name}</span>
                )
              }
            </div>
          </Col>
          <Col span={6} style={{ backgroundColor: "#fafafa", border: "1px dashed #f2f2f2", minHeight: 110, textAlign: "center" }}>
            <div style={{ fontSize: 11, marginBottom: 8, padding: "10px 15px 5px 15px", backgroundColor: "#f2f2f2" }}>Let's find out what this hotel has to offer?</div>
            <div style={{ padding: "5px 15px 5px 15px" }}>
              <Button
                type="primary"
                size="large"
                iconPosition="end"
                block
                onClick={() => handleClick(data)}
              >
                Details
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HotelCard;
