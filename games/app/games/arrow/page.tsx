"use client";
import Game from "./ComePlayersArcade";
export default function Page(){return <Game onClose={() => { window.location.href = "/"; }} />;}
