export const icons = [
  {
    id: "1",
    type: "icon" as const,
    alt: "nice symbol for tshirt",
    url: "https://cdn2.iconfinder.com/data/icons/transparent-round-icons/512/home.png",
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "icon" as const,
    alt: "anmother nice symbol for tshirt",
    url: "https://image.similarpng.com/very-thumbnail/2021/01/Location-icon-design-on-transparent-background-PNG.png",
    position: { x: 0, y: 0 },
  },
];

export const plates = [
    {
      id: "1",
      type: "plate" as const,
      alt: "metal plate for tshirt",
      url: "https://previews.123rf.com/images/andreykuzmin/andreykuzmin1501/andreykuzmin150100029/35270564-brushed-steel-metal-plate-background-with-rivets.jpg",
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      type: "plate" as const,
      alt: "another nice symbol for tshirt",
      url: "https://t3.ftcdn.net/jpg/01/54/96/44/360_F_154964488_FDAQ8JAi4v3V129b3v5Qwy7mlMFbWS2c.jpg",
      position: { x: 0, y: 0 },
    },
  ];

  export type DraggableItem = (typeof icons[0] | typeof plates[0]);