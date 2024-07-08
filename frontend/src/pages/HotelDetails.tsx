import React, { useState, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { theme, Col, Row, Rate, Button, Image, DatePicker, Select } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { /* useQuery, */ useMutation } from '@apollo/client';
// import { motion } from "framer-motion";

// GraphQL - Queries, mutations and/or subscriptions
import { FETCH_HOTEL_BY_ID } from "../graphql/queries";
import { ADD_BOOKING } from "../graphql/mutations";

const { RangePicker } = DatePicker;

const HotelDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the userId param from the URL.
  let { id } = useParams();

  const [hotelData, setHotelData] = useState(location?.state);
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([dayjs(), dayjs().add(1, "day")]);
  const [addBooking, { data, loading, error }] = useMutation(ADD_BOOKING);

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
        .then((result) => setHotelData(result.data.fetchHotelById));
    }
  }, [id]);

  const cheapestRoomPrice = Math.min.apply(Math, hotelData?.prices?.map((item: any) => item.prices.at(-1)?.price));

  const EURO_FX = 1.18;

  const updateSelectedDates = (dates: any) => {
    setSelectedDates([dates[0], dates[1]]);
  };

  // function that aggregates the quantity of rooms by its types, based on the hotel's layout
  const QtyRoomsByType = useCallback((): Record<string, number>[] => {
    const groupedTypes: any[] = [];
    hotelData?.layout?.rooms?.forEach((room: any) => {
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

  const handleBooking = (data: any): void => {
    const input = {
      hotel: data.hotel,
      roomType: data.roomType._id,
      costs: [
        {
          category: "room",
          price: data.prices.at(-1).price
        }
      ],
      when: {
        from: String(selectedDates[0].format("YYYYMMDD")),
        to: String(selectedDates[1].format("YYYYMMDD"))
      }
    }

    console.log(input);
    addBooking({ variables: { input: input } });
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
            <Col span={24}><Rate allowHalf defaultValue={hotelData?.rating} /></Col>
            <Col span={24} style={{ fontSize: 30 }}>{hotelData?.name}</Col>
            <Col span={24} style={{ color: "#818589" }}>{hotelData?.address}</Col>
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
            src={`/images/hotels/${hotelData?.image}`}
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
                defaultValue={selectedDates}
                format={"ddd, DD MMM"}
                onChange={(dates: any) => updateSelectedDates(dates)}
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
                disabled
                // onClick={() => handleClick(data)}
              >
                Update offers
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      { hotelData?.prices.map((price: any, index: number) =>
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
              <div>Breakfast included</div>
              <div>Cancellation not free of charge</div>
              <div>Credit card required</div>
              <br />
              {loading && <div>Booking in process... Please wait for it to complete.</div>}
              {!loading && !error &&
                <Button
                  type="primary"
                  size="large"
                  iconPosition="end"
                  block
                  onClick={() => handleBooking(price)}
                >
                  Book now
                </Button>
              }
              {error && <div>{`Something went wrong! ${error.message}`}</div>}
            </Col>
          </Row>
        </motion.div>
      )}
    </>
  );
};

export default HotelDetails;
