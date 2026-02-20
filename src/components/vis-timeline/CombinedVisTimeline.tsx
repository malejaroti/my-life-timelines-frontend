import { useEffect, useRef } from 'react';
import { Timeline as VisTimeline} from "vis-timeline/standalone";
import type { DataItem as VisDataItem, DataGroup as VisDataGroup } from "vis-timeline/standalone";
import { DataSet as VisDataSet, DataView as VisDataView} from "vis-data";
import type { ITimelineItem } from '../../pages/TimelineItemsPage';

type VisTimelineItem = VisDataItem;

interface ITimelineWithItems {
    timelineTitle: string,
    timelineColor: string,
    items: ITimelineItem[]
}

type CombinedVisTimelineProps = {
    timelinesWithItems: ITimelineWithItems[]
    windowStart?: Date;
    windowEnd?: Date;
    imageVisibility?: boolean;
}

function CombinedVisTimeline({ timelinesWithItems, windowStart, windowEnd, imageVisibility }: CombinedVisTimelineProps) {

    const masterTimelineContainerRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<VisTimeline | null>(null);
    const itemsDSRef = useRef<VisDataSet<VisTimelineItem> | null>(null);
    const itemsViewRef = useRef<VisDataView<VisTimelineItem> | null>(null);
    const groupsDSRef = useRef<VisDataSet<VisDataGroup> | null>(null);
    const currentWindowRef = useRef<{ start: Date; end: Date } | null>(null);
    const imageItemsVisibility = imageVisibility ?? false; // Set to true to show images in items

    useEffect(() => {
            if (!masterTimelineContainerRef.current) return;
            if (!timelinesWithItems || timelinesWithItems.length === 0) return;

            // Destroy previous instance to avoid appending a new timeline on top of the old one
            if (timelineRef.current) {
                timelineRef.current.destroy();
                timelineRef.current = null;
            }

            console.log("Received timelinesWithItems in CombinedVisTimeline:", timelinesWithItems);
    
            // Create visTimelineItems - flatten all items from all timelines
            const visTimelineItems: VisTimelineItem[] = timelinesWithItems.flatMap((timeline, timelineIndex) =>
                timeline.items.map(item => {
                    const startDate = new Date(item.startDate);
                    let endDate: Date | undefined;
    
                    // If no endDate provided, EndDate is today.
                    if (!item.endDate) {
                        endDate = new Date();
                    }
                    // Handle one-day events: if endDate is same as startDate, make it a full day block
                    else if (item.startDate === item.endDate) {
                        endDate = new Date(startDate);
                        endDate.setDate(endDate.getDate() + 1); // Add one day to make it a block
                    } else {
                        endDate = new Date(item.endDate);
                    }
    
                    return {
                        ...item,
                        id: item._id, //use MongoDB itemId as id for VisItem
                        content: `<div>${item.title}</div>
                                ${imageItemsVisibility && item.images && item.images.length > 0 
                                ?`<img src="${item.images[0]}" style="width:32px; height:32px; border-radius: 4px; margin-top: 4px;">` 
                                : ''}`,
                        start: startDate,
                        end: endDate,
                        group: timelineIndex + 1,
                        type: endDate ? 'range' : 'box',
                        style: `--item-color: #e7e4d7; border: 0.5px solid #d4d4d4`,
                    };
                })
            );
            console.log("CombinedVisTimeline - visTimelineItems:", visTimelineItems);
            // Create groups for each timeline
            const groups: VisDataGroup[] = timelinesWithItems.map((timeline, index) => ({
                id: index + 1,
                content: timeline.timelineTitle,
            }));
    
    
            // Initialize DataSets and DataView (filtered by current window)
            itemsDSRef.current = new VisDataSet<VisTimelineItem>(visTimelineItems);
            groupsDSRef.current = new VisDataSet<VisDataGroup>(groups);
    

            currentWindowRef.current = { start: windowStart ?? new Date(), end: windowEnd ?? new Date() };
    
            itemsViewRef.current = new VisDataView(itemsDSRef.current, {
                filter: (item) => {
                    const win = currentWindowRef.current;
                    if (!win) return true;
                    const itemStart = (item.start as Date).getTime();
                    const itemEnd = item.end ? (item.end as Date).getTime() : itemStart; // box as point
                    // Render only items that intersect the visible window
                    return itemStart <= win.end.getTime() && itemEnd >= win.start.getTime();
                }
            });
    
            // Initialize vis-timeline with explicit start and end
            timelineRef.current = new VisTimeline(
                /* container */ masterTimelineContainerRef.current,
                /* items */     visTimelineItems,
                /* groups */    groups,
                /* options */   {
                    orientation: {
                        axis: "top",
                        item: "top"
                    },
                    groupHeightMode: "auto",
                    // height: "100%"
                    // stack: true,
                    // selectable: true,
                    // zoomKey: "ctrlKey",
                    start: windowStart!,
                    end: windowEnd!,
                    // // xss: { disabled: true },
                    // margin: { item: { horizontal: 10, vertical: 10 } }
                }
            );
        }, [timelinesWithItems])
    
    return (
        <div
            // className="master-timeline flex-1 bg-gray-100 rounded-lg"
            className="border-none outline-none focus:ring-0 focus:outline-none focus:border-none mx-5"
            ref={masterTimelineContainerRef}
            style={{ height: 'auto' }}
        >    
        </div>
    )
}

export default CombinedVisTimeline