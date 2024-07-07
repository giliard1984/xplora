import React from "react";
import { theme, /* Grid, */ Col, Row, Rate, Button } from "antd";
// import { EyeOutlined } from '@ant-design/icons';
import HolidayInnExpress from "../assets/images/hotels/holiday-inn-express.jpg";

// const { useBreakpoint } = Grid;

interface Props {
  data: any
}

const HotelCard: React.FC<Props> = ({ data }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // const screens = useBreakpoint();
  // console.log(screens);
  // const cheapestRoom = data.prices.prices.at(-1);

  return (
    <Row
      gutter={[0, 16]}
      // justify={"space-between"}
      // align={"middle"}
      style={{
        padding: 24,
        minHeight: 110,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        marginBottom: 10
      }}
    >
      <Col span={6}>
        <img src={HolidayInnExpress} alt="React Image" style={{ borderRadius: 8, height: "100%", width: "90%"  }} />
      </Col>
      <Col span={18}>
        <Row>
          <Col span={15}>
            <Row>
              <Col span={24}><Rate allowHalf defaultValue={data?.rating} /></Col>
              <Col span={24} style={{ fontSize: 20 }}>{data.name}</Col>
              <Col span={24} style={{ color: "#818589" }}>{data.address}</Col>
            </Row>
          </Col>
          <Col span={9}>
            <Row justify={"space-between"} style={{ textAlign: "right" }}>
              <Col span={24} style={{ fontSize: 20 }}>£136.00</Col>
              <Col span={24}><small>(€122.00)</small></Col>
              <Col span={24}><small>Breakfast included</small></Col>
              {/* <Col span={24}>
                <Button type="primary" icon={<EyeOutlined />} size="large" iconPosition="end">
                <Button type="primary" size="large" iconPosition="end">
                  Hotel details
                </Button>
              </Col> */}
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
                  <span style={{ display: "inline-block", backgroundColor: "#E5E4E2", /* border: "1px solid #C0C0C0", */ borderRadius: 6, margin: 2, padding: "3px 6px" }}>{feature.name}</span>
                )
              }
            </div>
          </Col>
          <Col span={6} style={{ backgroundColor: "#fafafa", border: "1px dashed #f2f2f2", minHeight: 110, /* padding: 15, */ textAlign: "center" }}>
            <div style={{ fontSize: 11, marginBottom: 8, padding: "10px 15px 5px 15px", backgroundColor: "#f2f2f2" }}>Let's find out what this hotel has to offer?</div>
            <div style={{ padding: "5px 15px 5px 15px" }}>
              <Button type="primary" size="large" iconPosition="end" block>
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
