import { Request, Response } from "express";
import { GeneralParams, User } from "../models/User";

const getRandomNumbers = (min: number, max: number) => {
  const minN = Math.ceil(min);
  const maxN = Math.floor(max);

  return Math.floor(Math.random() * (maxN - minN + 1)) + minN;
};

const MIN_BPM = 60;
const MAX_BPM = 170;

const dateMap = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

export const userHealthParams = async (req: Request, res: Response) => {
  const today = new Date().getDay();

  const users = await User.find();

  for (const user of users) {
    const params = user.medicalInfo.generalParams ?? [];
    const firstGenN = getRandomNumbers(MIN_BPM, MAX_BPM);
    const secondGenN = getRandomNumbers(MIN_BPM, MAX_BPM);

    const minBpm = Math.min(firstGenN, secondGenN);
    const maxBpm = Math.max(firstGenN, secondGenN);
    const avgBpm = (firstGenN + secondGenN) / 2;
    const day = dateMap[today];
    const temperature = Number((Math.random() * 0.7 + 36.3).toFixed(1));
    const maxBloodP = getRandomNumbers(110, 130);
    const minBloodP = getRandomNumbers(70, 85);
    const healthParams: GeneralParams = {
      minBpm,
      maxBpm,
      temperature,
      day,
      avgBpm,
      bloodPressure: {
        max: maxBloodP,
        min: minBloodP,
      },
    };
    params.length = 7;

    params[today] = healthParams;

    await User.findByIdAndUpdate(user._id, {
      $set: {
        "medicalInfo.generalParams": params,
      },
    });
  }
  console.log('CronJob triggered at', new Date().toDateString())
  res.status(200).json({ message: "Health parameters updated" });
};
