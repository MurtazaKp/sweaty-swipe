"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import Lights from "../public/lights.png";
import Card from "./components/card";
import { cardData } from "./utils/data";
import { CardData } from "./types";
import getDataFromJsonServer from "./api/getData";
import Link from "next/link";

export default function Home() {
  const [cards, setCards] = useState<CardData[]>(cardData);
  const [rightSwipe, setRightSwipe] = useState(0);
  const [leftSwipe, setLeftSwipe] = useState(0);
  const [interested, setInterested] = useState<CardData[]>([]);
  const activeIndex = cards.length - 1;
  const [dataFromJson, setDataFromJson] = useState([]);
  const [show, setIsShow] = useState(false);

  const removeCard = (id: number, action: "right" | "left") => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    if (action === "right") {
      setRightSwipe((prev) => prev + 1);
      setInterested((prev) => [...prev, cards.find((card) => card.id === id)!]);
    } else {
      setLeftSwipe((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (cards.length === 0) {
      fetchData();
      setTimeout(() => {
        setIsShow(!show);
      }, 1000);
    } else {
    }
  }, [cards]);

  const fetchData = async () => {
    let data = await getDataFromJsonServer();
    setDataFromJson(data);
  };

  const stats = [
    { name: "Left", count: leftSwipe },
    { name: "Right", count: rightSwipe },
  ];
  console.log("OKKK", dataFromJson);
  return (
    <>
      <div
        className="relative flex lg:h-screen w-full items-center sm:justify-center 
       bg-bgBlack text-textGrey"
      >
        <AnimatePresence>
          {cards.length
            ? cards.map((card) => (
                <Card
                  key={card.id}
                  data={card}
                  active={card.id === activeIndex}
                  removeCard={removeCard}
                  dataFromJson={dataFromJson}
                />
              ))
            : show && (
                <div className="flex items-center w-full   lg:max-w-6xl flex-col justify-center gap-3">
                  <div>
                    <p className="text-4xl  ">Selected People</p>
                  </div>
                  <div className="flex justify-center p-4 flex-col sm:flex-row gap-5 w-full flex-wrap">
                    {dataFromJson &&
                      dataFromJson.map((data: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex h-40 w-full sm:basis-1/2 lg:basis-1/4 flex-col justify-center gap-2 rounded-lg bg-neutral-50 p-2 shadow"
                          >
                            <div className="flex gap-2">
                              <img
                                src={data.src.src}
                                className="h-24 rounded-lg w-24 shrink-0 rounded- bg-neutral-500"
                                alt=""
                              />
                              <div className="flex flex-col">
                                <span className="font-bold italic text-neutral-700">
                                  {data.name}
                                </span>
                                <p className="line-clamp-3 text-black w-9/12">
                                  {data.bio}
                                </p>
                              </div>
                            </div>
                            <a
                              href="https://socket-io-frontend-three.vercel.app/"
                              target="_blank"
                              className="rounded bg-indigo-500 p-2 font-bold text-neutral-50  hover:bg-indigo-700 "
                            >
                              {" "}
                              Chat Now
                            </a>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
        </AnimatePresence>
      </div>
    </>
  );
}
