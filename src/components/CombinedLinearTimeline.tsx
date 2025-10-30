import React from 'react'
import type { ITimelineItem } from '../pages/TimelineItemsPage';
import TimelineItemCard from './TimelineItemCard';
import formatDate from '../utils/formatDate';

type CombinedLinearTimelineProps = {
  items: ITimelineItem[];
};

function CombinedLinearTimeline({ items }: CombinedLinearTimelineProps) {
  return (
    // <div className=" max-w-full flex overflow-x-scroll justify-left gap-10 mt-5 lg:flex-row sm:flex-col max-h-[600px] rounded-md border-1 border-slate-200 p-2 ">
    // {items.map((timelineItem) => (
    //     <TimelineItemCard
    //     timelineItem={timelineItem}
    //     ></TimelineItemCard>
    // ))}
    // </div>
    <div className=" max-w-full flex overflow-x-scroll justify-evenly mt-5 lg:flex-row sm:flex-col max-h-[600px] rounded-md border-1 border-slate-200 p-2 ">
        {items.reverse().map((timelineItem) => (
            <div key={timelineItem._id}>
                <p className='text-[10px]'>{formatDate(timelineItem.endDate?timelineItem.endDate: timelineItem.startDate)}</p>
                <p className='text-[12px] max-w-[100px]'>{timelineItem.title}</p>     
                {typeof timelineItem.timeline !== "string" && (
                    <span className='inline-block bg-blue-100 text-blue-800 text-[10px] px-2 py-1 rounded-full max-w-[100px] truncate'>{timelineItem.timeline.title}</span>
                )}
            </div>
        ))}
    </div>


  )
}

export default CombinedLinearTimeline