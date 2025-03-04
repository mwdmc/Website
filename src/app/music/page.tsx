"use client";
// import { cn } from "@/lib/utils";
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import {Callout} from "fumadocs-ui/components/callout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Scroll, ScrollText } from "lucide-react";

async function fetchData(guildId: string, botId?: string) {
    if (botId) {
        const data = await (await fetch('/api/frogmusic/guild?guildId=' + guildId + "&botId=" + botId)).json();
        return data;
    }
    const data = await (await fetch('/api/frogmusic/guild?guildId=' + guildId)).json();
    // console.log(data);
    return data;
}

async function fetchLyrics(guildId: string, botId?: string) {
    if (botId) {
        const data = await (await fetch('/api/frogmusic/guild?guildId=' + guildId + "&lyrics=true&async=true&botId=" + botId)).json();
        return data;
    }
    const data = await (await fetch('/api/frogmusic/guild?guildId=' + guildId + "&lyrics=true&async=true")).json();
    // console.log(data);
    return data;
}

function format(str: number) {
    // hours min sec
    if (!str) return 'NAN';
    if (str == 0) return 'NAN';
    str = Math.floor(str / 1000);
    const hours = Math.floor(str / 3600);
    const minutes = Math.floor((str % 3600) / 60);
    const seconds = str % 60;
    if (hours) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function parseToSec(str: number) {
    str = Math.round(str / 1000);
    // str = str / 60;
    return str;
}

function parseShow(timeS: number, timeE: number, current: number) {
    // timeS Start, timeE End, current Current
    if (timeS < parseToSec(current) && timeE > parseToSec(current)) {
        return true;
    }
    return false;
}

export default function Page() {
    const params = useSearchParams();

    var guildId = params.get('guildId');
    const discordGuildId = params.get('guild_id');
    if (discordGuildId) {
        guildId = discordGuildId;
    }
    var botId = params.get('botId') || undefined;

    const [image, setImage] = useState('/assets/150.png');
    const [title, setTitle] = useState('沒有正在播放的歌曲');
    const [author, setAuthor] = useState('N/A');
    const [percentage, setPercentage] = useState(0);
    const [paused, setPaused] = useState(false);
    const [length, setLength] = useState(0);
    const [current, setCurrent] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [lyrics, setLyrics] = useState<string | null>(null); // plaintext lyrics
    const [asyncLyrics, setAsyncLyrics] = useState<{content: any, timeS: number, timeE: number}[]>([]); // synced lyrics
    const [autoScroll, setAutoScroll] = useState(true); // synced lyrics auto scroll

    const view = useRef<HTMLDivElement>(null);

    var oldPosition = 0;

    const animations = {
        show: { width: 'auto', opacity: 1 },
        hide: { width: '0px', opacity: 0 }
    }

    const [intervalStarted, setIntervalStarted] = useState(false);

    useEffect(() => {
        if (view.current && autoScroll) {
            const element = view.current.getElementsByClassName("current");
            if (element) {
                if (element.length > 0) {
                    element[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        }

        const fetchDataAsync = async () => {
            const data = await fetchData(guildId as string, botId);

            if (data.data.current) {
                setImage(data.data.current?.info.artworkUrl);
                setTitle(data.data.current?.info.title);
                setAuthor(data.data.current?.info.author);
                setPercentage((data.position/1000) / data.data.current?.info.duration);
                setPaused(data.paused);
                setLength(data.data.current.info.duration);
                if (oldPosition != data.position) {
                    setCurrent(Number(data.position));
                }
                oldPosition = data.position;
                setPaused(false);
            }

            if (!data.playing) {
                setError('No song playing');
                setImage('/assets/150.png');
                setTitle('沒有正在播放的歌曲');
                setAuthor('N/A');
                setPercentage(0);
                setLength(0);
                setCurrent(0);
                setPaused(true);
            }
        };
        const fetchLyricsAsync = async () => {
            if (error == 'No song playing') return;
            const data = await fetchLyrics(guildId as string, botId);
            if (data.error) {
                setError(data.error);
            } else {
                setError(null);
            }
            if (data.plainText) {
                setLyrics(data.plainText);
                setAsyncLyrics([]);
            }
            if (data.length > 0) {
                // create a new array of JSX elements
                setLyrics(null);
                setAsyncLyrics(data.map((line: any) => {
                    return {
                        content: line.content as any,
                        timeS: line.startsAt,
                        timeE: line.endsAt
                    }
                }));
            } else {
                setError('No synced lyrics found');
            }
        }

        if (!intervalStarted) {
            setIntervalStarted(true);
            fetchDataAsync();
            fetchLyricsAsync();
            setInterval(() => {
                fetchDataAsync();
            }, 5000)
            setInterval(() => {
                fetchLyricsAsync();
            }, 5000)
            setInterval(() => {
                if (paused) return; 
                setCurrent(prevAddon => prevAddon + 1000);
            }, 1000)
        }
        // setCurrent(current + addon);
    }, [guildId, current, percentage, length, asyncLyrics, lyrics, error, view, paused, autoScroll]);

    // const data = await (await axios.get('http://localhost:3001/api/frogmusic/guild?guildId=' + guildId)).data

    // console.log(data)

    return (
        <div>
            <div className="fixed blur-sm -z-10 w-screen h-screen bg-cover bg-[url('/assets/banner.png')]"></div>
            <div className="h-[calc(100vh-6rem)] overflow-y-auto">
                <div className="container mt-8">
                { error == 'No song playing' && (
                    <div className="container">
                        <Callout type="error" className="prose">沒有正在播放的歌曲 {"😢"}</Callout>
                    </div>
                )}
                { error == 'No lyrics found' && (
                    <div className="container">
                        <Callout type="error" className="prose">無法獲取歌詞 {"😢"}</Callout>
                    </div>
                )}
                { error == 'No synced lyrics found' && (
                    <div className="container">
                        <Callout type="error" className="prose">無法獲取同步歌詞 {"😎"}</Callout>
                        <Callout type="warn" className="prose">如果歌詞有誤，歡迎投稿至 <a href="#">這裡</a> (尚未開放投稿)</Callout>
                        {lyrics && (
                            <div className="prose mb-2">
                                {lyrics.split('\n').map((line, index) => <p key={index}>{line}</p>)}
                            </div>
                        )}
                    </div>
                )}
                </div>
                { error == null && (
                    (asyncLyrics.length > 0)  && (
                        <div className="container mb-2" ref={view}>
                            <Callout type="info" className="prose">已獲取同步歌詞，因資料庫音樂同步歌詞有限，不少歌詞會有誤</Callout>
                            <Callout type="warn" className="prose">如果同步歌詞有誤，歡迎投稿至 <a href="#">這裡</a> (尚未開放投稿)</Callout>
                            {
                                asyncLyrics.map((content, index) => {
                                    const show = parseShow(content.timeS, content.timeE, current); 
                                    return (
                                        <motion.p key={index} 
                                            className={cn(
                                                "p-4 text-lg",
                                                "vi-"+index,
                                                show ? "current": "none"
                                            )}
                                            initial={{ opacity: 0.7 }}
                                            animate={{ opacity: show ? 1 : 0.5, y: show ? 0 : 10 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {/* <h2>{Number(content.content[0]?.startsAt).toFixed(2)} 👍 {content.content[0]?.content}</h2> */}
                                            { isNaN(Number(content.content[0]?.startsAt)) ? null : <>[{Number(content.content[0]?.startsAt).toFixed(2)}]</> } {content.content[0]?.content}
                                        </motion.p>
                                    )
                                })
                            }
                        </div>
                    )
                )}
            </div>


            <div className="fixed bottom-0 p-4 shadow-lg border-t border-white w-full flex justify-between items-center bg-black/70 h-[6rem]">
                <div className="flex items-center">
                    <img src={image} className="w-16 h-16 rounded-sm"/>
                    <div className="flex flex-col ml-4">
                        <p className="text-white text-lg">{title}</p>
                        <p className="text-gray-400 text-sm">{author}</p>
                    </div>
                </div>
                <div>
                    <p className="text-white text-sm text-center">{format(paused ? 0 : current)} / {format(length)}</p>
                    <p>多元世界團隊 ❤️ 2025</p>
                </div>
            </div>

            <motion.button
                className={cn(
                    buttonVariants({
                        color: 'outline',
                        // size: 'sm',
                        }),
                    "justify-start fixed bottom-20 -left-4 p-2 m-8 z-100 rounded-xl bg-secondary/50 text-fd-secondary-foreground/80 shadow-lg backdrop-blur-lg text-nowrap font-semibold"
                )}
                onClick={(e) => {
                    e.preventDefault();
                    setAutoScroll(!autoScroll);
                }}
                initial="hide"
                whileHover="show"
                transition={{ duration: 0.5 }}
            >
                <ScrollText /><motion.span variants={animations}>&nbsp;{autoScroll ? " 關閉自動捲動" : " 開啟自動捲動"}</motion.span>
            </motion.button>
        </div>
    )
}