import React, { useState } from 'react'
import styles from './tehilim.module.css';
import ExpandedCard from '../DailyContentFolder/ExpandedCard';
import Loading from '../LoadingFolder/Loading';
import numberToGematria from '../../lib/clientHelpers/gematriaFunc';

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
    const [data, setData] = useState<Content[]>([{ chapter: 1, text: 'שיר למעלות' }, { chapter: 2, text: 'מזמור לאסף' }]);
    const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

    const handleChooseItem = (item: Content) => {
        let newItem: ContentItem = {
            title: 'תהילים יומי',
            text: item.text,
            location: `פרק ${numberToGematria(item.chapter)}' `
        }
        setSelectedItem(newItem);
    }

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
                {data.length === 0 ? (
                    <Loading />
                ) : (
                    data.map((item, index) =>
                        <div className={styles.chapterDiv} onClick={() => { handleChooseItem(item) }}>
                            פרק {numberToGematria(item.chapter)}'
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Tehilim