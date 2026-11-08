"use client";
import {useState} from "react";
import Game from "./ComePlayersMatchGame";
export default function Page(){const [best,setBest]=useState(0);return <><a href="/">All games</a><Game best={best} onScore={score=>setBest(previous=>Math.max(previous,score))} /></>;}
