import React, { useState, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { theme, Col, Row, Rate, Button, Image, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { motion } from "framer-motion";
// import { useQuery } from '@apollo/client';
// import { motion } from "framer-motion";

// GraphQL - Queries, mutations and/or subscriptions
import { FETCH_HOTEL_BY_ID } from "../graphql/queries";

// Components
// import HotelDetails from "../components/HotelCard";

// interface Props {
//   data: any
// }

const { RangePicker } = DatePicker;

const HotelDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  // Get the userId param from the URL.
  let { id } = useParams();

  // console.log(location.state);
  const [data, setData] = useState(location?.state);
  // const [searchParams/* , setSearchParams */] = useParams();
  // const { loading, error, data } = useQuery(FETCH_HOTEL_BY_ID);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const client = useApolloClient();

  // the purpose of this section is to fetch the hotel information, when acessing the link directly
  React.useEffect(() => {
    if (!location?.state && id) {
      client
        .query({
          query: FETCH_HOTEL_BY_ID,
          variables: {
            fetchHotelByIdId: id
          }
        })
        .then((result) => setData(result.data.fetchHotelById));
    }
  }, [id]);

  const cheapestRoomPrice = Math.min.apply(Math, data?.prices?.map((item: any) => item.prices.at(-1)?.price));

  const EURO_FX = 1.18;

  // function that aggregates the quantity of rooms by its types, based on the hotel's layout
  const QtyRoomsByType = useCallback((): Record<string, number>[] => {
    const groupedTypes: any[] = [];
    data?.layout?.rooms?.forEach((room: any) => {
      const name = room?.roomType?.name?.toLowerCase().replaceAll(" ", "");
      const roomTypeId = room?.roomType?._id;

      let isTypeInArray = groupedTypes.find((type: any) => type.id === roomTypeId);

      if (isTypeInArray) {
        isTypeInArray.total = isTypeInArray.total + 1;
      } else {
        groupedTypes.push({ id: roomTypeId, type: name, total: 1 });
      }
    });

    return groupedTypes;
  }, []);

  const qtyRoomsByType = QtyRoomsByType();

  const RoomsAvailable: React.FC = ({ data }: any): React.JSX.Element => {
    if (!data) return <></>;

    let message = "There are no rooms available for this category";

    if (data?.total === 1) {
      message = `There is ${data?.total} available room`;
    } else if (data?.total > 1) {
      message = `There are ${data?.total} available rooms`;
    }

    return <div>{message}</div>;
  };

  return (
    <>
      <p onClick={() => !location?.state ? navigate("/") : navigate(-1)} style={{ cursor: "pointer" }}>Back to search results</p>
      <Row
        gutter={[0, 16]}
        align={"bottom"}
        style={{
          padding: 24,
          minHeight: 110,
          background: colorBgContainer,
          marginBottom: 10
        }}
      >
        <Col xs={24} sm={16}>
          <Row>
            <Col span={24}><Rate allowHalf defaultValue={data?.rating} /></Col>
            <Col span={24} style={{ fontSize: 30 }}>{data?.name}</Col>
            <Col span={24} style={{ color: "#818589" }}>{data?.address}</Col>
          </Row>
        </Col>
        <Col xs={24} sm={8}>
          <Row justify={"space-between"} style={{ textAlign: "right" }}>
            <Col span={24}>
              <span style={{ fontSize: 28, fontWeight: "bold" }}>£{cheapestRoomPrice.toFixed(2)}</span><small> / night</small>
            </Col>
            <Col span={24}>
              <span style={{ fontSize: 16, fontWeight: "bold" }}>£{cheapestRoomPrice.toFixed(2)} total</span><small> - 1 room, 1 night</small>
            </Col>
            <Col span={24}><small>€{(cheapestRoomPrice * EURO_FX).toFixed(2)} total - 1 room, 1 night</small></Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[22, 16]}>
        <Col span={14}>
          <Image
            src={`/images/hotels/${data?.image}`}
            alt="React Image"
            style={{ borderRadius: 0, height: "auto", width: "47dvw", objectFit: "contain" }}
          />
        </Col>
        <Col span={10}>
          <Row>
            <Col span={24}>
              <Image
                src={`/images/hotels/room1.jpg`}
                alt="React Image"
                style={{ borderRadius: 0, height: "100%", width: "100%"  }}
              />
            </Col>
            <Col span={24}>
              <Image
                src={`/images/hotels/room2.jpg`}
                alt="React Image"
                style={{ borderRadius: 0, height: "100%", width: "100%"  }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[0, 16]} style={{ marginTop: 30 }}>
        <Col span={24} style={{ fontSize: 22 }}>
          Offers & Prices
        </Col>
        <Col span={24} style={{ backgroundColor: "#f2f2f2", minWidth: "100%", padding: 24 }}>
          <div style={{ marginBottom: 5 }}>Your itinerary</div>
          <Row justify={"start"} gutter={[5, 5]}>
            <Col xs={24} sm={5}>
              <RangePicker
                size="large"
                // minDate={dayjs().format("YYY-MM-DD")}
                defaultValue={[dayjs(), dayjs().add(1, "day")]}
                format={"ddd, DD MMM"}
              />
            </Col>
            <Col xs={24} sm={5}>
              <Select
                showSearch
                style={{ minWidth: 200, width: "100%" }}
                placeholder="Search to Select"
                optionFilterProp="label"
                size="large"
                defaultValue={1}
                // filterSort={(optionA, optionB) =>
                //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                // }
                options={[
                  {
                    value: 1,
                    label: '1 Adult, 1 Room',
                  },
                  {
                    value: 2,
                    label: '2 Adults, 2 Single Rooms',
                  },
                  {
                    value: 3,
                    label: '1 Adult, 1 Double Room',
                  },
                  {
                    value: 4,
                    label: '2 Adults, 1 Double Room',
                  }
                ]}
              />
            </Col>
            <Col xs={24} sm={4}>
              <Button
                type="primary"
                size="large"
                iconPosition="end"
                block
                // onClick={() => handleClick(data)}
              >
                Update offers
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      { data?.prices.map((price: any, index: number) =>
        <motion.div
          initial={{
            x: 0,
            y: -100,
            opacity: 0 
          }}
          animate={{
            x: 0,
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: index * 0.1,
            duration: 0.2,
            ease: "easeIn"
          }}
        >
          <Row gutter={[0, 16]} style={{ marginTop: 30, backgroundColor: "#f2f2f2", border: "1px solid #f2f2f2" }}>
            <Col span={24} style={{ borderBottom: "1px dashed #cccccc", padding: 10 }}>
              {price?.roomType?.name}, 1 Adult
            </Col>
            <Col span={6} style={{ backgroundColor: "#f2f2f2", padding: 10 }}>
              <Image
                src={`/images/hotels/${price?.roomType?.name.includes("Superior") ? "room1" : "room2"}.jpg`}
                alt="React Image"
                style={{ borderRadius: 0, height: "100%", width: "100%"  }}
              />
            </Col>
            <Col span={11} style={{ backgroundColor: "#f2f2f2", padding: 10 }}>
              <div style={{ fontWeight: "bold" }}>Description</div>
              <div>{price?.roomType?.description}</div>
              <br />
              <div style={{ fontWeight: "bold" }}>Rooms available</div>
              <RoomsAvailable data={qtyRoomsByType?.find((type: any) => type.id === price?.roomType?._id)} />
            </Col>
            <Col span={7} style={{ backgroundColor: "#f2f2f2", padding: 10 }}>
              <div style={{ fontWeight: "bold" }}>Conditions</div>
            </Col>
          </Row>
        </motion.div>
      )}
    </>
  );
};

export default HotelDetails;
