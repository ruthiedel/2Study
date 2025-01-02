"use client"

import React, { useState, useEffect } from 'react';
import styles from './tehilim.module.css';
import ExpandedCard from '../DailyContentFolder/ExpandedCard';
import Loading from '../LoadingFolder/Loading';
import numberToGematria from '../../lib/clientHelpers/gematriaFunc';
import { getTehilimForToday } from "../../services/tehilimService";

interface ContentItem {
    title: string;
    text: string | string[] | string[][];
    location: string;
}

interface Content {
    chapter: number,
    text: string,
}

function Tehilim() {
    const [data, setData] = useState<Content[]>([]);
    const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTehilim = async () => {
            try {
                const tehilim = await getTehilimForToday();
                const formattedData = tehilim.map((item, index) => ({
                    chapter: item.chapter,
                    text: item.text,
                }));
                setData(formattedData);
            } catch (error) {
                console.error("Error fetching Tehilim:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTehilim();
    }, []);

    const handleChooseItem = (item: Content) => {
        let newItem: ContentItem = {
            title: 'תהילים יומי',
            text: item.text,
            location: `פרק ${numberToGematria(item.chapter)}' `
        }
        setSelectedItem(newItem);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>תהילים יומי</h1>

            {selectedItem && (
                <ExpandedCard
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}

            <div className={styles.chapterContainer}>
                {isLoading ? (
                    <Loading />
                ) : (
                    data.length === 0 ? (
                        <p>לא נמצאו פרקים להיום.</p>
                    ) : (
                        data.map((item, index) => (
                            <div
                                key={index}
                                className={styles.chapterDiv}
                                onClick={() => { handleChooseItem(item); }}
                            >
                                פרק {numberToGematria(item.chapter)}'
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
}

export default Tehilim;
