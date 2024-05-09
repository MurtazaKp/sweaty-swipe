import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SwipeButton from "./swipeButtons";
import postDataToJsonServer from "../api/postData";

const Card = ({ data, active, removeCard, dataFromJson }: any) => {
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0); // new state for vertical exit position
  const x = useMotionValue(0);
  const y = useMotionValue(0); // new motion value for vertical drag
  const input = [-200, 0, 200];
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.y < -20) {
      setExitY(-400);
      removeCard(data.id, "superlike");
      return;
    }
    if (info.offset.x > 20) {
      setExitX(400);
      removeCard(data.id, "like");
    }
    if (info.offset.x < -20) {
      setExitX(-400);
      removeCard(data.id, "nope");
    }
  };

  console.log(
    "dataFromJson.id",
    dataFromJson,
    "=======",
    "json data keyyyy",
    data.id
  );

  return (
    <>
      <SwipeButton exit={setExitX} removeCard={removeCard} id={data.id} />
      {active ? (
        <motion.div
          drag={true}
          className="card absolute z-30 flex h-[438px] w-[300px] items-center justify-center self-center text-3xl font-bold "
          onDragEnd={onDragEnd}
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{
            scale: 1.05,
            opacity: 1,
          }}
          style={{ x, rotate, opacity, y }} // add y style prop
          transition={{ type: "tween", duration: 0.3, ease: "easeIn" }}
          whileDrag={{ cursor: "grabbing" }}
          exit={{ x: exitX, y: exitY }} // add y exit animation
        >
          <div className=" m-auto w-[calc(100%-20px)] rounded-[20px] border-2 border-[#9F9F9F80] pb-3">
            <div className="">
              <div className="relative h-[269px] w-full overflow-hidden rounded-b-xl">
                <Image
                  src={data.src}
                  fill
                  alt=""
                  className="rounded-xl"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="mt-6 flex items-center justify-between px-4 font-sans text-2xl font-medium text-textGrey">
                <p>{data.name}</p>
                <p>{data.age}</p>
              </div>
              <p className="mt-3 px-4 font-sans text-lg font-medium text-textGrey">
                {data.bio}
              </p>
              <div className="mt-3 flex gap-2 flex-wrap px-4 text-base font-normal">
                {data.genre.map((item: any, idx: any) => (
                  <p key={idx} className="rounded-[7px] bg-[#00423E] px-4 py-1">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default Card;
